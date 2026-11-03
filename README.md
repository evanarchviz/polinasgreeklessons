# Greek Foundations

A static Modern Greek A1 foundation course for readers of the Greek alphabet. Eight lessons combine phrase references, grammar notes, contextual dialogues, quizzes and sentence building. Responsive layouts support iPhone and desktop browsers. Optional pronunciation uses an installed Greek device voice.

## Existing deployment: required upgrade

**Before merging/publishing this update**, run `supabase/002-course-and-reset.sql` in the Supabase project's SQL Editor. The updated client requires its new profile/event fields and reset function. It preserves existing data; no progress is deleted by the migration. See `COURSE-AND-RESET.md` for the research, course sequence, reset behavior and limitations.

## Teacher actions

Open the website with `#teacher`, sign in with an assigned teacher account, choose a learner, then inspect/export answers. **Delete all progress** requests confirmation and deletes the selected learner's answers across all lessons. It retains accounts and assignments. The database enforces teacher access, including for direct API requests.

After a reset, updated learner clients clear their stale saved history and queued answers when they reconnect and sync. Old uploads are rejected by the server. Offline devices cannot be erased remotely while offline. Signed-out local practice is separate.

## New installation

1. Create a Supabase project. Run `supabase/schema.sql`, followed by `supabase/002-course-and-reset.sql`.
2. Disable public signup and anonymous sign-in; keep email/password sign-in enabled.
3. Create each Auth user manually, then assign profiles and teacher relationships using `supabase/provision.example.sql`. Users cannot assign their own role.
4. Copy `config.example.js` to `config.js`, entering only the project HTTPS URL and public publishable key. Never commit passwords, database credentials, service-role or secret keys.
5. Upload the repository root to GitHub Pages. Use Deploy from a branch → main → root. Assets use relative URLs; no compilation is needed.

The site and answer keys are public. Private learner data is stored in Supabase behind Auth and RLS. This is a practice app, not a tamper-resistant exam. See `docs/PRIVACY.md` for storage/export details, with teacher reset now available directly in the dashboard.

## Development and validation

Serve locally with `python -m http.server 4173 --bind 127.0.0.1` (or `python3` on Mac). Open localhost:4173. Run `npm test` with Node 20+. New course checks: `node --test test.mjs`. Browser checks should include a narrow phone viewport, learner/teacher sign-in, offline queued answers and a reset using a disposable learner.

No private key is required by browser code. Progress is localStorage-backed per account; auth sessions use sessionStorage. A correct submitted answer once counts toward completion. Actual language mastery needs repeated recall and spoken practice.
