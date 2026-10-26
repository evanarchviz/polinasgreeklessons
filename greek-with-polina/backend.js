// Small dependency-free client for Supabase Auth + PostgREST.
// Auth tokens stay in sessionStorage (this tab); answers use account-scoped localStorage.
export class Backend {
  constructor(config) {
    this.url=(config.supabaseUrl||'').replace(/\/$/,''); this.key=config.supabasePublishableKey||'';
    this.enabled=!!(this.url && this.key); this.session=null;
    if(this.key.startsWith('eyJ')) {
      let role; try {role=JSON.parse(atob(this.key.split('.')[1].replace(/-/g,'+').replace(/_/g,'/'))).role;}catch{}
      if(role!=='anon')throw new Error('Only a publishable key or legacy anon key is allowed. Never use a privileged key in the browser.');
    }
    if(this.enabled && (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(this.url) || (!this.key.startsWith('sb_publishable_') && !this.key.startsWith('eyJ')))) throw new Error('Check the public Supabase URL and publishable key in config.js.');
    try { this.session=JSON.parse(sessionStorage.getItem('greek-session:'+this.url)||'null'); } catch { /* unavailable storage: sign in again */ }
  }
  saveSession(s) { this.session=s; try { if(s) sessionStorage.setItem('greek-session:'+this.url,JSON.stringify(s)); else sessionStorage.removeItem('greek-session:'+this.url); } catch {} }
  async raw(path, options={}) {
    const response=await fetch(this.url+path,{...options,headers:{apikey:this.key,'Content-Type':'application/json',...options.headers},signal:AbortSignal.timeout(15000)});
    const data=await response.json().catch(()=>null);
    if(!response.ok) throw new Error(data?.msg||data?.message||data?.error_description||'Connection failed. Please retry.');
    return data;
  }
  async login(email,password) {
    const s=await this.raw('/auth/v1/token?grant_type=password',{method:'POST',body:JSON.stringify({email,password})});
    s.expires_at=Math.floor(Date.now()/1000)+s.expires_in; this.saveSession(s); return s;
  }
  async token() {
    if(!this.session) throw new Error('Please sign in.');
    if(this.session.expires_at < Date.now()/1000+60) {
      if(!this.refreshing) this.refreshing=this.raw('/auth/v1/token?grant_type=refresh_token',{method:'POST',body:JSON.stringify({refresh_token:this.session.refresh_token})}).then(s=>{s.expires_at=Math.floor(Date.now()/1000)+s.expires_in;this.saveSession(s);}).finally(()=>{this.refreshing=null;});
      await this.refreshing;
    }
    return this.session.access_token;
  }
  async request(path,options={}) { const token=await this.token(); return this.raw('/rest/v1/'+path,{...options,headers:{...options.headers,Authorization:'Bearer '+token}}); }
  async profile() { const rows=await this.request('profiles?select=id,display_name,role&id=eq.'+this.session.user.id); if(!rows.length) throw new Error('Your account has not been assigned a learning role. Ask Evan to finish setup.'); return rows[0]; }
  async send(events) { if(!events.length) return; await this.request('events?on_conflict=id',{method:'POST',headers:{Prefer:'resolution=ignore-duplicates,return=minimal'},body:JSON.stringify(events)}); }
  async events(userId) {
    let all=[];
    for(let offset=0;;offset+=500) {
      const rows=await this.request('events?select=*&user_id=eq.'+encodeURIComponent(userId)+'&order=created_at.asc,id.asc&limit=500&offset='+offset);
      all.push(...rows); if(rows.length<500) return all;
    }
  }
  async learners() { return this.request('profiles?role=eq.learner&select=id,display_name&order=display_name.asc'); }
  async logout() { try { await this.raw('/auth/v1/logout',{method:'POST',headers:{Authorization:'Bearer '+await this.token()}}); } finally {this.saveSession(null);} }
}
