import test from 'node:test';
import assert from 'node:assert/strict';
import {Backend} from '../backend.js';
globalThis.sessionStorage={getItem:()=>null,setItem:()=>{},removeItem:()=>{}};
const config={supabaseUrl:'https://example.supabase.co',supabasePublishableKey:'sb_publishable_test'};
test('empty configuration enables local mode and invalid host is rejected',()=>{
  assert.equal(new Backend({}).enabled,false);assert.throws(()=>new Backend({...config,supabaseUrl:'https://evil.example'}));
  const token='eyJhbGciOiJIUzI1NiJ9.'+btoa(JSON.stringify({role:'service_role'}))+'.fake';
  assert.throws(()=>new Backend({...config,supabasePublishableKey:token}),/privileged/);
});
test('password sign-in, bearer authorization and duplicate-safe upload',async()=>{
  const calls=[];
  globalThis.fetch=async(url,o)=>{calls.push([url,o]);return new Response(JSON.stringify(url.includes('/token')?{access_token:'access',refresh_token:'refresh',expires_in:3600,user:{id:'u'}}:[]));};
  const b=new Backend(config);await b.login('example@example.com','not-a-real-password');await b.send([{id:'id'}]);
  assert.ok(calls[0][0].endsWith('grant_type=password'));assert.equal(calls[1][1].headers.Authorization,'Bearer access');assert.equal(calls[1][1].headers.Prefer,'resolution=ignore-duplicates,return=minimal');
});
test('concurrent requests share refresh and errors do not silently succeed',async()=>{
  const b=new Backend(config);b.session={access_token:'old',refresh_token:'r',expires_at:0};let refreshes=0;
  globalThis.fetch=async(url)=>{if(url.includes('refresh_token')){refreshes++;return new Response(JSON.stringify({access_token:'new',refresh_token:'r2',expires_in:3600}));}return new Response(JSON.stringify({message:'Denied'}),{status:403});};
  assert.deepEqual(await Promise.all([b.token(),b.token()]),['new','new']);assert.equal(refreshes,1);
  await assert.rejects(b.events('u'),/Denied/);
});
test('history fetches every page beyond API row limit',async()=>{
  const b=new Backend(config);b.session={access_token:'x',expires_at:Date.now()/1000+1000};let count=0;
  globalThis.fetch=async()=>new Response(JSON.stringify(++count===1?Array.from({length:500},(_,i)=>({id:i})):[{id:500}]));
  assert.equal((await b.events('u')).length,501);assert.equal(count,2);
});
