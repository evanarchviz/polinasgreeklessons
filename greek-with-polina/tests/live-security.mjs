// Optional deployment checks. Runs only on an explicitly configured test project.
// Creates one benign test event. Uses regular users, never an admin/service key.
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
const env=process.env;
for(const n of ['TEST_SUPABASE_URL','TEST_PUBLISHABLE_KEY','TEST_LEARNER_EMAIL','TEST_LEARNER_PASSWORD','TEST_TEACHER_EMAIL','TEST_TEACHER_PASSWORD','TEST_OUTSIDER_EMAIL','TEST_OUTSIDER_PASSWORD'])assert.ok(env[n],`Set ${n} in your local environment; do not commit credentials.`);
const base=env.TEST_SUPABASE_URL.replace(/\/$/,'');
assert.match(base,/^https:\/\/[a-z0-9-]+\.supabase\.co$/);
assert.ok(env.TEST_PUBLISHABLE_KEY.startsWith('sb_publishable_'),'Use a publishable key.');
async function call(path,token,method='GET',body,extra={}){
  const r=await fetch(base+path,{method,headers:{apikey:env.TEST_PUBLISHABLE_KEY,'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{}),...extra},...(body?{body:JSON.stringify(body)}:{})});
  return {ok:r.ok,status:r.status,data:await r.json().catch(()=>null)};
}
async function login(who){const r=await call('/auth/v1/token?grant_type=password',null,'POST',{email:env[`TEST_${who}_EMAIL`],password:env[`TEST_${who}_PASSWORD`]});assert.ok(r.ok,`${who} login failed`);return r.data;}
const learner=await login('LEARNER'),teacher=await login('TEACHER'),outsider=await login('OUTSIDER');
assert.notEqual(learner.user.id,teacher.user.id);assert.notEqual(outsider.user.id,learner.user.id);assert.notEqual(outsider.user.id,teacher.user.id);
const id=randomUUID(), event={id,user_id:learner.user.id,lesson_id:'hello',question_id:'h1',kind:'select',answer:'Γεια σου!',created_at:new Date().toISOString()};
const path='/rest/v1/events?id=eq.'+id;
try {
  assert.equal((await call('/rest/v1/events',null)).ok,false,'Anonymous table reads must be denied');
  assert.ok((await call('/rest/v1/events',learner.access_token,'POST',event)).ok,'Learner must insert own event');
  assert.ok((await call('/rest/v1/events?on_conflict=id',learner.access_token,'POST',event,{Prefer:'resolution=ignore-duplicates,return=minimal'})).ok,'Duplicate retry must succeed');
  for(const s of [learner,teacher]){const r=await call(path,s.access_token);assert.ok(r.ok);assert.equal(r.data.length,1,'Owner and assigned teacher must see one event');}
  const outside=await call(path,outsider.access_token);assert.ok(outside.ok);assert.equal(outside.data.length,0,'Unlinked account must see no event');
  const hidden=await call('/rest/v1/profiles?id=eq.'+learner.user.id,outsider.access_token);assert.ok(hidden.ok);assert.equal(hidden.data.length,0,'Unlinked account must not see profile');
  assert.equal((await call('/rest/v1/events',outsider.access_token,'POST',{...event,id:randomUUID()})).ok,false,'Cannot write someone else’s event');
  assert.equal((await call('/rest/v1/events',teacher.access_token,'POST',{...event,id:randomUUID(),user_id:teacher.user.id})).ok,false,'Teacher cannot insert own learner event');
  assert.equal((await call('/rest/v1/profiles?id=eq.'+learner.user.id,learner.access_token,'PATCH',{role:'teacher'})).ok,false,'Learner cannot promote own role');
  assert.equal((await call('/rest/v1/teacher_learners',outsider.access_token,'POST',{teacher_id:outsider.user.id,learner_id:learner.user.id})).ok,false,'Cannot assign teacher access');
  for(const s of [learner,teacher]){
    assert.equal((await call(path,s.access_token,'PATCH',{answer:'changed'})).ok,false,'Clients cannot update events');
    assert.equal((await call(path,s.access_token,'DELETE')).ok,false,'Clients cannot delete events');
  }
  console.log('Live access checks passed. One harmless selection remains in the test learner history; remove via administrator if desired.');
} finally {await Promise.allSettled([learner,teacher,outsider].map(s=>call('/auth/v1/logout',s.access_token,'POST')));}
