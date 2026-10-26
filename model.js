import { questions } from './content.js';
export function grade(questionId, answer) { const q=questions.find(q=>q.id===questionId); return !!q && q.answer === answer; }
export function progress(events, lessonId) {
  const qs = questions.filter(q=>!lessonId || q.lesson_id===lessonId);
  const mastered = new Set(events.filter(e=>e.kind==='submit' && grade(e.question_id,e.answer)).map(e=>e.question_id));
  return {done:qs.filter(q=>mastered.has(q.id)).length,total:qs.length};
}
export function mergeEvents(a,b) { return [...new Map([...a,...b].map(e=>[e.id,e])).values()].sort((x,y)=>x.created_at.localeCompare(y.created_at)); }
export function safeText(s) { return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
