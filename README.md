# Μικρά βήματα — Greek with Polina

A deployable, buildless Greek A1 starter app for Polina and her teacher Evan. Designed for current iPhone Safari and Mac Safari/Chrome. Polina already knows the alphabet: the course starts with everyday conversation. English explanations, Greek examples, three 10–15 minute lessons and 15 exercises. This is a starter unit, not a complete A1 syllabus.

## What you get

- Responsive lessons: introductions, greetings and feelings, ordering at a café.
- Multiple-choice quizzes, tap-to-build sentences, explanations and unlimited retries.
- Local browser progress, plus account-based cloud history across devices when connected.
- Evan’s private dashboard: selections, sentence edits, submitted attempts, mastery, accuracy, filtering, and JSON export. Polls every 30 seconds while visible; this is not a live screen viewer.
- Optional device Greek speech synthesis. No recording or paid speech API.
- Supabase email/password authentication, administrator-managed teacher/learner separation, SQL schema and Row Level Security (RLS).
- No build step, external JavaScript libraries, tracking scripts, private keys or passwords bundled.

**Delivery status:** source is ready to configure and upload. No GitHub repository or Supabase project was provisioned as part of this package. With blank `config.js`, the app runs in local practice only. Remote monitoring requires steps 2–5 below.

## 1. Try the app locally

Unzip the package. Open a terminal in the `greek-with-polina` folder:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

On some Macs use `python3` instead of `python`. Open `http://127.0.0.1:4173`. Do not double-click `index.html`: JavaScript modules need HTTP(S). Stop the server with Ctrl+C. Localhost is only accessible on your own computer; it is not the link to send Polina.

No npm installation is needed. Developers with Node 20+ can run `npm test` for model and mocked connection tests.

## 2. Create the connected database

1. Create a Supabase project in your own account. Choose a suitable hosting region and keep your database password private.
2. Open **SQL Editor**, paste and run `supabase/schema.sql` once in a new project. The migration is transactional and intentionally not a rerunnable reset script.
3. In **Authentication**, enable email/password sign-in and **disable new user signups**. The app provides no public signup flow. Do not enable anonymous sign-in.
4. In **Authentication → Users**, use the administrator **Add user / Create user** option to create Polina and Evan with their own email addresses and strong unique passwords. For this manually provisioned flow, use the administrator email-confirmed option after verifying the intended account owner. Give each person only their own credentials through a private channel. Do not put them in GitHub, links or config files.
5. Copy the two Auth user UUIDs. Replace the placeholders in `supabase/provision.example.sql`, then run that script in SQL Editor. This assigns Polina the learner role, Evan the teacher role, and explicitly links the two. Do not publish a filled provisioning script; keep the template in the repository.
6. Confirm the tables show RLS enabled. Nobody can assign their own role or create a teacher relationship through the client. A signed-in user without a profile cannot use the learning backend.

For password recovery in this small deployment, Evan/project administrator uses the Supabase administrative account-management process and privately coordinates with the account owner. There is no in-app password reset or email-invite callback. Do not send the standard invite email expecting this app to consume its callback. This package deliberately uses manually created email/password accounts, not magic links.

## 3. Set the public configuration

Find the project's URL and **publishable API key** in Supabase's project/API settings. Copy `config.example.js` over `config.js`, then fill in those two values:

```js
window.APP_CONFIG = {
  supabaseUrl: "https://YOUR_PROJECT.supabase.co",
  supabasePublishableKey: "sb_publishable_REPLACE_ME"
};
```

This file is **public by design**. A publishable key identifies the project; it does not grant access to other users’ rows. Auth and RLS enforce access. A legacy `anon` JWT key can also work, but use a publishable key for new projects. **Never use `service_role`, `sb_secret_…`, a database password, access token or user password.** `.env` is ignored and is not read by this buildless app. GitHub Pages cannot inject runtime secrets into static JavaScript.

The app and Content Security Policy currently accept standard `https://PROJECT.supabase.co` endpoints. Custom Supabase domains require deliberate changes in `backend.js` and the CSP in `index.html`.

## 4. Publish to GitHub Pages

1. Create a GitHub repository, for example `greek-with-polina`. Use a repository/plan that supports Pages (a public repository works with GitHub Free).
2. Upload the **contents** of this folder to the repository root, so `index.html`, `app.js`, `config.js`, `styles.css` and the other files are at the top level. Include the empty `.nojekyll` file when using Git; if the browser uploader omits it, create it in GitHub. No compilation is needed.
3. Open repository **Settings → Pages**. Select **Deploy from a branch**, branch `main`, folder `/ (root)`, and Save.
4. Wait for the Pages deployment to finish. Open the URL GitHub gives you, usually `https://YOUR_USERNAME.github.io/greek-with-polina/`.
5. In Supabase Auth URL configuration, set Site URL to this exact HTTPS URL for consistency. This app's password sign-in uses no redirect callback.
6. Follow the checks below, then send Polina the Pages URL. Evan can open the same URL with `#teacher` appended and sign in with his teacher account. The hash is only navigation, not a permission or secret.

All asset links are relative, so repository subpaths work. Send the **Pages website link**, not the GitHub repository/file link. On iPhone she can use Safari → Share → Add to Home Screen. It remains a normal website: no service worker, guaranteed offline launch, background sync or native app installation is promised.

## 5. Check before sharing

Use different browsers or private windows for these checks:

1. Signed out: try an answer, reload, and confirm local progress persists. Evan should see none of this practice.
2. Sign in as Polina. Existing local practice should stay separate. Select a wrong answer, select another answer, then press Check answer. Build a sentence and remove a word. Check the sharing notice is visible.
3. Sign in as Evan elsewhere. Open Teacher and Refresh now. Confirm every selection/word change and submitted attempt appears, with the actual answer and time. Confirm progress counts only questions answered correctly at least once.
4. Sign in as Polina on a second device, allow sync, then return to Learn. Confirm progress is restored. Sign out on shared devices.
5. With Polina’s page already loaded, disconnect network, submit an answer and reconnect. Keep the tab open and tap Sync now. Confirm it is uploaded once, even after another sync/reload.
6. Run the database permission checks in `docs/SECURITY-CHECKS.md` before trusting the deployment. A teacher-facing navigation button is never sufficient protection.
7. Test on her actual iPhone and Mac. Audio depends on installed Greek voices. Modern browsers are required (`dialog`, modules, Web Crypto, AbortSignal.timeout); update old iOS/macOS releases if needed.

## Saving and sync behavior

Every quiz selection, sentence change and submitted answer is an immutable event with a random UUID. A successful upload removes that event from the local queue. Retrying an upload uses the same UUID with conflict-ignore to avoid duplicates. The app reads history in 500-row pages, including histories larger than Supabase’s usual per-request limit. Keep the API maximum rows at least 500.

Local data is partitioned by user UUID; guest practice is a separate partition. Signing in does not silently upload guest practice. Auth tokens are stored in `sessionStorage` for the current tab; a page refresh can continue the session, but a new tab/device may need another sign-in. Refresh tokens renew active sessions. Passwords are never stored by app code.

Progress is derived from history: a question is mastered after at least one correct submitted answer. Selections alone do not count. Accuracy is the fraction of submitted attempts that were correct, including retries. The lesson position itself starts at the first lesson after a reload. There is no surveillance of other browsing, background activity or the learner’s screen.

If network or authentication fails, queued answers remain locally for that account and the app shows an error. Reconnect/sign in and use Sync now. Private browsing, browser storage eviction, clearing website data or device loss can erase unsynced answers. The app does not run sync after the page closes. There is no unlimited offline guarantee.

## Privacy, security and maintenance

See `docs/PRIVACY.md` and `docs/SECURITY-CHECKS.md`. Tell Polina what is shared before giving her connected access. The built-in notice says the assigned teacher sees selections and attempts. Only Auth email, account display name, exercise answers and timestamps are needed. Avoid putting personal details in lesson content, which is publicly downloadable.

Evan can export the linked learner’s event history from Teacher. Delete cloud events with the administrative SQL example, and clear local copies on every learner device **including pending queues**, otherwise queued events may be uploaded again. Removing an Auth user cascades through their profile, assignments and events. Configure your own retention period; no automatic retention job is installed. Revoke a teacher assignment to prevent future reads; it cannot retract data already viewed or exported.

Client answer keys, grading and timestamps are inspectable/editable. This is a supportive practice tool, not a tamper-resistant exam or certified assessment system. Database `received_at` records server receipt; `created_at` is the device's claimed time. Password theft or access to a signed-in device exposes that user's permitted data. Keep the project administrator account secure and review access regularly. Watch Supabase usage/availability; no paid plan, SLA or unlimited storage is assumed.

## Files and editing

- `content.js`: original lesson content, stable lesson/question IDs and answer keys.
- `app.js`, `model.js`: UI, grading, local progress and sync orchestration.
- `backend.js`: dependency-free Supabase Auth and REST client.
- `styles.css`, `theme.css`, `icon.svg`: responsive visual design.
- `supabase/`: migration and administrator provisioning template.
- `tests/`: unit and mocked network tests, plus optional live permission checks.

If you change a question's meaning/answer, use a new ID and migrate the database constraint; otherwise old events will be regraded against new content. Keep the SQL question allowlist consistent with `content.js`. This version assumes small private tutoring groups and loads a learner’s entire history; archive/export old history before very large deployments.

## Verification and reference docs

See `docs/VERIFICATION.md` for what was tested and the remaining deployment checks.

- [GitHub: Creating a Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Supabase: Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase: API keys](https://supabase.com/docs/guides/getting-started/api-keys)
- [Supabase: Password authentication](https://supabase.com/docs/guides/auth/passwords)

Setup checked against these official references on 26 October 2026. Dashboard labels may change.
