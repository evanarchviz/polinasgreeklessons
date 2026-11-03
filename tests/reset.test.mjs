import test from 'node:test';import assert from 'node:assert/strict';import {Backend} from '../backend.js';
globalThis.sessionStorage={getItem:()=>null};
test('teacher reset uses authenticated RPC and current generation filters learner history',async()=>{
 const b=new Backend({supabaseUrl:'https://example.supabase.co',supabasePublishableKey:'sb_publishable_test'});b.session={access_token:'access',expires_at:Date.now()/1000+1000};let calls=[];
 globalThis.fetch=async(url,o)=>{calls.push({url,o});return new Response(JSON.stringify(url.includes('rpc/')?2:[]));};
 assert.equal(await b.resetProgress('learner-id'),2);await b.events('learner-id',2);
 assert.ok(calls[0].url.endsWith('/rpc/reset_learner_progress'));assert.deepEqual(JSON.parse(calls[0].o.body),{target_learner:'learner-id'});assert.equal(calls[0].o.headers.Authorization,'Bearer access');assert.ok(calls[1].url.includes('generation=eq.2'));
});
