import {lessons,questions} from './content.js';
import {grade,progress,mergeEvents,safeText as esc} from './model.js';
import {Backend} from './backend.js';
const $=s=>document.querySelector(s);
let backend;
try { backend=new Backend(window.APP_CONFIG||{}); } catch(e) { $('#notice').textContent=e.message; backend=new Backend({}); }
let profile=null, events=[], pending=[], screen='learn', lessonIndex=0, questionIndex=0, answer='', checked=false, tokens=[], storageOK=true, syncing=false;
let teacherEvents=[], learners=[], learnerId='', dashboardBusy=false;
const sessionKey=()=> 'greek-a1-v1:'+ (profile?.id||'local');
function loadLocal() { try { const s=JSON.parse(localStorage.getItem(sessionKey())||'{}'); events=Array.isArray(s.events)?s.events:[]; pending=Array.isArray(s.pending)?s.pending:[]; } catch {events=[];pending=[];storageOK=false;} }
function saveLocal() { try {localStorage.setItem(sessionKey(),JSON.stringify({events,pending}));}catch {storageOK=false; message('Browser storage is unavailable or full. Keep this tab open and connect to save answers.');} }
function message(s) { $('#notice').textContent=s; }
function status() { if(!storageOK) return 'Browser saving unavailable'; if(!profile) return 'Local practice · saved on this browser only'; if(profile.role==='teacher') return 'Teacher account · private access'; return pending.length?`${pending.length} changes waiting to sync`:'Connected · answers saved'; }
function updateAccount() { $('#account-nav').textContent=profile ? profile.display_name : 'Sign in'; }
function resetQuestion() {answer='';checked=false;tokens=[];}
function record(kind) {
  if(profile?.role==='teacher') return;
  const q=lessons[lessonIndex].questions[questionIndex];
  const e={id:crypto.randomUUID(),user_id:profile?.id||null,lesson_id:lessons[lessonIndex].id,question_id:q.id,kind,answer,created_at:new Date().toISOString()};
  events.push(e); if(profile?.role==='learner') pending.push(e); saveLocal(); void sync();
}
async function sync() {
  if(syncing||!profile||profile.role!=='learner') return;
  syncing=true; const owner=profile.id;
  try {
    const batch=pending.slice(); await backend.send(batch);
    if(profile?.id!==owner)return;
    const sent=new Set(batch.map(e=>e.id));pending=pending.filter(e=>!sent.has(e.id));saveLocal();
    const remote=await backend.events(owner);
    if(profile?.id!==owner)return;
    const before=progress(events).done; events=mergeEvents(events,remote);saveLocal(); if(screen==='learn' && progress(events).done!==before)renderPractice();
    message(status()); if($('#save-status'))$('#save-status').textContent=status();
  } catch(e) {message('Not synced: '+e.message+' Your answers remain on this browser. Use Sync now after reconnecting.');}
  finally {syncing=false;}
}
function setScreen(s) {
  screen=s; $('#learn-nav').classList.toggle('active',s==='learn');$('#teacher-nav').classList.toggle('active',s==='teacher');
  render();
}
function render() { if(screen==='teacher') renderTeacher(); else renderLearn(); }
function renderLearn() {
  const l=lessons[lessonIndex], p=progress(events), lp=progress(events,l.id), q=l.questions[questionIndex];
  $('#main').innerHTML=`<section class="hero"><div><p class="eyebrow">YOUR EVERYDAY GREEK JOURNEY</p><h1>Λίγο κάθε μέρα.<br><em>A little, every day.</em></h1><p>You can read Greek. Now let’s make it a conversation.</p><div class="hero-tags"><span>A1 · First conversations</span><span>3 small lessons</span></div></div><div class="journey"><div class="sun" aria-hidden="true">☀</div><strong>${p.done}<span> / ${p.total}</span></strong><p>phrases & answers mastered</p><progress max="${p.total}" value="${p.done}" aria-label="Overall progress"></progress><small>Practice at your pace, Polina.</small></div></section>
  <div class="workspace"><aside><p class="eyebrow">YOUR LESSONS</p>${lessons.map((x,i)=>{const z=progress(events,x.id);return `<button class="lesson-tab ${i===lessonIndex?'selected':''}" data-lesson="${i}" ${i===lessonIndex?'aria-current="step"':''}><span class="number">${x.icon}</span><span><strong>${esc(x.title)}</strong><small>${x.time} · ${z.done}/${z.total} mastered</small></span><span aria-hidden="true">${z.done===z.total?'✓':'↗'}</span></button>`;}).join('')}<div class="save-card"><span class="dot"></span><strong id="save-status">${esc(status())}</strong><p>${profile?.role==='learner'?'Evan can see your selected answers, sentence changes and attempts.':'Sign in to share answers with Evan and continue across devices. Local practice stays separate.'}</p><button id="sync" class="text-button">${profile?'Sync now':'Connect my account'}</button></div></aside>
  <article class="lesson"><div class="lesson-heading"><div><p class="eyebrow">LESSON ${l.icon} · ${l.time}</p><h2>${esc(l.title)}</h2><p>${esc(l.goal)}</p></div><span class="pill">${lp.done===lp.total?'Completed ✓':'Let’s begin'}</span></div>
  <section aria-labelledby="phrase-title"><h3 id="phrase-title">01 / Read it. Say it.</h3><p class="muted">Tap Listen for a Greek device voice, if available.</p><div class="phrase-grid">${l.phrases.map(([g,e],i)=>`<div class="phrase"><strong lang="el">${esc(g)}</strong><span>${esc(e)}</span><button class="listen" data-speak="${i}" aria-label="Listen: ${esc(g)}">◖ Listen</button></div>`).join('')}</div><div class="tip"><strong>A small language note</strong><p>${esc(l.note)}</p></div></section>
  <section><h3>02 / A real little conversation</h3><div class="dialogue">${l.dialogue.map(([name,g,e])=>`<div><span>${esc(name)}</span><p lang="el">${esc(g)}</p><small>${esc(e)}</small></div>`).join('')}</div></section>
  <section id="practice"><div class="practice-top"><h3>03 / Your turn</h3><span>Question ${questionIndex+1} of ${l.questions.length}</span></div><div class="question-dots" aria-label="Choose question">${l.questions.map((x,i)=>`<button data-question="${i}" class="${questionIndex===i?'current':''}" aria-label="Question ${i+1}" ${questionIndex===i?'aria-current="step"':''}>${i+1}</button>`).join('')}</div><h4 id="question-title">${esc(q.prompt)}</h4>
  ${q.type==='build'?`<p class="muted">Tap words in order. Tap a chosen word to remove it.</p><div class="sentence" aria-label="Your sentence">${tokens.length?tokens.map((t,i)=>`<button data-remove="${i}" ${checked?'disabled':''} lang="el">${esc(q.words[t])} <span aria-hidden="true">×</span></button>`).join(''):'<span>Your sentence goes here…</span>'}</div><div class="word-bank">${q.words.map((w,i)=>`<button data-word="${i}" ${tokens.includes(i)||checked?'disabled':''} lang="el">${esc(w)}</button>`).join('')}</div>`:`<div class="options" role="group" aria-labelledby="question-title">${q.options.map((o,i)=>`<button data-option="${i}" aria-pressed="${answer===o}" class="option ${answer===o?'chosen':''}" ${checked?'disabled':''}><span>${'ABC'[i]}</span>${esc(o)}</button>`).join('')}</div>`}
  <div id="feedback" tabindex="-1" role="status" class="feedback ${checked?(grade(q.id,answer)?'good':'retry'):''}">${checked?`<strong>${grade(q.id,answer)?'Μπράβο! You’ve got it.':'A small step closer.'}</strong><p>${esc(q.explain)}</p>${!grade(q.id,answer)?`<p>Answer: <strong>${esc(q.answer)}</strong></p>`:''}`:''}</div>
  <div class="actions"><button id="check" class="primary" ${!answer||checked||profile?.role==='teacher'?'disabled':''}>Check answer</button>${checked?'<button id="retry" class="secondary">Try again</button>':''}<button id="next" class="secondary">${questionIndex===l.questions.length-1?'Finish lesson':'Next question'} →</button></div>${profile?.role==='teacher'?'<p class="muted">Teacher preview: sign in as a learner to save attempts.</p>':''}</section></article></div>`;
  $('[id="sync"]').onclick=()=>profile?sync():account();
  document.querySelectorAll('[data-lesson]').forEach(b=>b.onclick=()=>{lessonIndex=+b.dataset.lesson;questionIndex=0;resetQuestion();render();});
  document.querySelectorAll('[data-question]').forEach(b=>b.onclick=()=>{questionIndex=+b.dataset.question;resetQuestion();renderPractice();});
  document.querySelectorAll('[data-speak]').forEach(b=>b.onclick=()=>speak(l.phrases[+b.dataset.speak][0]));
  document.querySelectorAll('[data-option]').forEach(b=>b.onclick=()=>{answer=q.options[+b.dataset.option];record('select');renderPractice();});
  document.querySelectorAll('[data-word]').forEach(b=>b.onclick=()=>{tokens.push(+b.dataset.word);answer=tokens.map(i=>q.words[i]).join(' ');record('select');renderPractice();});
  document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{tokens.splice(+b.dataset.remove,1);answer=tokens.map(i=>q.words[i]).join(' ');record('select');renderPractice();});
  $('#check').onclick=()=>{checked=true;record('submit');renderPractice();$('#feedback').focus();};
  if($('#retry'))$('#retry').onclick=()=>{resetQuestion();renderPractice();};
  $('#next').onclick=()=>{if(questionIndex<l.questions.length-1){questionIndex++;resetQuestion();renderPractice();}else{const z=progress(events,l.id);message(z.done===z.total?'Μπράβο! Lesson mastered. Come back for a little review.':`${z.done}/${z.total} mastered. Revisit any question to finish this lesson.`);if(lessonIndex<lessons.length-1){lessonIndex++;questionIndex=0;resetQuestion();render();window.scrollTo(0,0);}else{render();}}};
}
function renderPractice(){
  const y=window.scrollY, active=document.activeElement;
  const attr=['data-option','data-word','data-remove','data-question'].find(a=>active?.hasAttribute(a));
  const selector=attr?`[${attr}="${active.getAttribute(attr)}"]`:active?.id?'#'+active.id:null;
  renderLearn();
  const next=selector?$(selector):null;
  if(next&&!next.disabled)next.focus({preventScroll:true});
  else if(attr==='data-word'||attr==='data-remove')$('.word-bank button:not(:disabled)')?.focus({preventScroll:true});
  window.scrollTo(0,y);
}
function speak(text) { const voices=window.speechSynthesis?.getVoices()||[];const voice=voices.find(v=>v.lang.toLowerCase().startsWith('el'));if(!voice){message('A Greek voice isn’t available on this device. You can read the phrase aloud or add a Greek voice in device accessibility settings.');return;} speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='el-GR';u.voice=voice;u.rate=.85;speechSynthesis.speak(u); }
function account() {
  $('#account-title').textContent=profile?'Your account':'Connect your progress';
  $('#account-body').innerHTML=profile?`<p>Signed in as <strong>${esc(profile.display_name)}</strong> (${esc(profile.role)}).</p><p>${esc(status())}</p><button id="logout" class="primary">Sign out</button><button id="clear-local" class="secondary">Clear this account’s local copy</button><p class="muted">Clearing the local copy discards unsynced changes. Cloud answers remain until Evan deletes them.</p>`:backend.enabled?`<p>Use the account Evan created for you. Your selections and submitted answers will be shared with Evan after sign-in.</p><form id="login"><label>Email<input type="email" name="email" autocomplete="username" required></label><label>Password<input type="password" name="password" autocomplete="current-password" required minlength="8"></label><button class="primary" type="submit">Sign in</button><p id="login-error" role="alert"></p></form><p class="muted">Need access or a password reset? Contact Evan. Local practice is not uploaded when you sign in.</p>`:`<p>You’re in local practice. Your progress is stored on this browser only and Evan cannot see it remotely yet.</p><p>To connect, Evan needs to follow the included README, create the Supabase accounts and fill in config.js.</p><button id="clear-local" class="secondary">Clear local practice</button>`;
  if($('#login'))$('#login').onsubmit=async e=>{e.preventDefault();const form=e.currentTarget;const btn=form.querySelector('button');btn.disabled=true;try{await backend.login(form.email.value,form.password.value);const p=await backend.profile();profile=p;loadLocal();updateAccount();$('#account-dialog').close();message(status()); if($('#save-status'))$('#save-status').textContent=status();render();await sync();}catch(err){backend.saveSession(null);$('#login-error').textContent=err.message;}finally{btn.disabled=false;}};
  if($('#logout'))$('#logout').onclick=async()=>{if(pending.length&&!confirm('Some answers are not synced. Sign out now? They will remain on this device for this account.'))return;try{await backend.logout();}catch{message('Signed out on this device. The server could not be reached.');}profile=null;events=[];pending=[];teacherEvents=[];learners=[];learnerId='';loadLocal();updateAccount();$('#account-dialog').close();setScreen('learn');};
  if($('#clear-local'))$('#clear-local').onclick=()=>{if(!confirm('Clear local answers and any unsynced changes for this account?'))return;events=[];pending=[];saveLocal();$('#account-dialog').close();render();message('Local copy cleared. Synced answers can return on the next sync.');};
  $('#account-dialog').showModal();
}
async function refreshDashboard() {
  if(dashboardBusy||profile?.role!=='teacher')return;dashboardBusy=true;const owner=profile.id;
  try { const list=await backend.learners();if(profile?.id!==owner)return;learners=list;if(!learners.some(l=>l.id===learnerId))learnerId=learners[0]?.id||'';const rows=learnerId?await backend.events(learnerId):[];if(profile?.id!==owner)return;teacherEvents=rows;message('Dashboard updated at '+new Date().toLocaleTimeString());renderTeacher(); }catch(e){message('Dashboard could not refresh: '+e.message);}finally{dashboardBusy=false;}
}
function renderTeacher(){
  if(profile?.role!=='teacher'){$('#main').innerHTML=`<section class="gate"><p class="eyebrow">EVAN’S TEACHING SPACE</p><h1>Every small step,<br>seen from afar.</h1><p>Sign in with your assigned teacher account to see linked learners’ answers.</p><button id="teacher-login" class="primary">${profile?'Manage account':'Teacher sign-in'}</button><p class="muted">Access is enforced by the database. A teacher link alone never grants access.</p></section>`;$('#teacher-login').onclick=account;return;}
  const p=progress(teacherEvents),submitted=teacherEvents.filter(e=>e.kind==='submit'),correct=submitted.filter(e=>grade(e.question_id,e.answer));
  $('#main').innerHTML=`<section class="dashboard"><p class="eyebrow">TEACHER DASHBOARD</p><h1>A window into her progress.</h1><p>Selections include changes before “Check answer”. Attempts are submitted answers. Refreshes every 30 seconds while this tab is visible.</p><div class="toolbar"><label>Learner<select id="learner">${learners.map(l=>`<option value="${esc(l.id)}" ${l.id===learnerId?'selected':''}>${esc(l.display_name)}</option>`).join('')}</select></label><button id="refresh" class="primary">Refresh now</button><button id="export" class="secondary" ${!teacherEvents.length?'disabled':''}>Export answers (JSON)</button></div><div class="stats"><div><strong>${p.done}/${p.total}</strong><span>Mastered</span></div><div><strong>${submitted.length}</strong><span>Submitted attempts</span></div><div><strong>${submitted.length?Math.round(correct.length/submitted.length*100)+'%':'—'}</strong><span>Attempt accuracy</span></div></div><h2>Answer history</h2><label>Show <select id="filter"><option value="all">All activity</option><option value="submit">Submitted attempts</option><option value="select">Selections & sentence changes</option></select></label><div id="history"></div></section>`;
  $('#refresh').onclick=refreshDashboard;$('#learner').onchange=()=>{learnerId=$('#learner').value;teacherEvents=[];void refreshDashboard();};$('#filter').onchange=renderHistory;
  $('#export').onclick=()=>{const blob=new Blob([JSON.stringify(teacherEvents,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='greek-answers.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};renderHistory();
}
function renderHistory(){const kind=$('#filter').value;const rows=teacherEvents.filter(e=>kind==='all'||e.kind===kind).slice().reverse();$('#history').innerHTML=rows.length?`<p class="muted">Showing latest ${Math.min(200,rows.length)} of ${rows.length} entries. Export includes all loaded activity. Times use your device timezone.</p><div class="table-wrap"><table><thead><tr><th>When</th><th>Question</th><th>Selected answer</th><th>Activity</th></tr></thead><tbody>${rows.slice(0,200).map(e=>{const q=questions.find(q=>q.id===e.question_id);return `<tr><td>${esc(new Date(e.created_at).toLocaleString())}</td><td>${esc(q?.prompt||e.question_id)}</td><td>${esc(e.answer||'(empty sentence)')}</td><td>${e.kind==='submit'?(grade(e.question_id,e.answer)?'✓ Correct attempt':'↻ Review attempt'):'Selection'}</td></tr>`;}).join('')}</tbody></table></div>`:'<div class="empty">No activity yet. Check that a learner is linked, then ask Polina to sign in and try a question.</div>';}
$('#learn-nav').onclick=()=>setScreen('learn');$('#teacher-nav').onclick=()=>{setScreen('teacher');void refreshDashboard();};$('#account-nav').onclick=account;$('#close-dialog').onclick=()=>$('#account-dialog').close();
$('.brand').onclick=()=>setScreen('learn');
$('#privacy').onclick=()=>{$('#account-title').textContent='Privacy & saving';$('#account-body').innerHTML='<p>Local practice stores your answers only in this browser. It is not shared and does not move between devices.</p><p>When you sign in as a learner, your answer selections, sentence changes, submitted attempts and timestamps are saved to your Supabase account. Your assigned teacher can read them. No microphone recording, location tracking or advertising analytics are used.</p><p>Only activity inside these exercises is recorded. Unsent changes wait on this device until a sync succeeds. Keep this page open to retry; background sync is not guaranteed. Close the tab or sign out on shared devices. Ask Evan to export or delete cloud answers.</p><p>Optional Listen uses your device’s speech service. Availability and processing depend on your browser and operating system.</p>';$('#account-dialog').showModal();};
window.addEventListener('online',()=>void sync());
setInterval(()=>{if(!document.hidden){if(screen==='teacher')void refreshDashboard();else void sync();}},30000);
loadLocal();render();
if(backend.session){try{profile=await backend.profile();loadLocal();updateAccount();render();await sync();}catch(e){backend.saveSession(null);message('Please sign in again. '+e.message);}}
if(location.hash==='#teacher'){setScreen('teacher');void refreshDashboard();}

