import test from 'node:test';
import assert from 'node:assert/strict';
import {lessons,questions} from '../content.js';
import {grade,progress,mergeEvents,safeText} from '../model.js';
test('all questions have unique IDs, valid answers and buildable sentences',()=>{
  assert.equal(new Set(questions.map(q=>q.id)).size,15);
  for(const q of questions){assert.ok(grade(q.id,q.answer));if(q.type==='build')assert.deepEqual(q.words.slice().sort(),q.answer.split(' ').sort());else assert.ok(q.options.includes(q.answer));}
  assert.equal(lessons.length,3);
});
test('selections do not count as mastery, retries count only once',()=>{
  const e=[{question_id:'h1',kind:'select',answer:'Γεια σου!'},{question_id:'h2',kind:'submit',answer:'wrong'}];
  assert.deepEqual(progress(e),{done:0,total:15});
  e.push({question_id:'h1',kind:'submit',answer:'Γεια σου!'});e.push({...e[2]});
  assert.deepEqual(progress(e,'hello'),{done:1,total:5});
  e.push({question_id:'h1',kind:'submit',answer:'wrong'});assert.equal(progress(e).done,1);
});
test('merge is idempotent across retried uploads and preserves new events',()=>{
  const a={id:'a',created_at:'2026-01-01'},b={id:'b',created_at:'2026-01-02'};
  assert.deepEqual(mergeEvents([b,a],[a]),[a,b]);
});
test('user supplied markup is escaped',()=>assert.equal(safeText('<img onerror="x">'),'&lt;img onerror=&quot;x&quot;&gt;'));
