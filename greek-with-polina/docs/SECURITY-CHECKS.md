# Deployment access checks

The source includes RLS and least-privilege grants, but the actual hosted configuration must be tested. No live Supabase project was supplied during delivery. Run these checks in a separate test project before using learner information.

## Access matrix

| Action | Signed out | Polina | Assigned Evan | Unlinked account |
|---|---|---|---|---|
| Read public lesson files | Yes | Yes | Yes | Yes |
| Read Polina's profile/events | No | Yes | Yes | No |
| Append Polina's events | No | Yes | No | No |
| Update/delete events | No | No | No | No |
| Set role or teacher assignment | No | No | No | No |

Project administrators can provision and delete records. Do not expose administrative credentials. All three public tables have RLS. Anonymous users have no table grants. Authenticated users have SELECT and only limited event-column INSERT grants. No public function bypasses RLS and no browser-editable metadata determines roles.

## Automated live smoke test

1. Create a **test project**, apply the schema and provision a linked learner and teacher exactly as in README.
2. Create one additional Auth user with a learner profile but **no teacher assignment**. This is the outsider test account. All three must be different users.
3. In a local shell, set the following environment variables privately (avoid command history where possible):
   - `TEST_SUPABASE_URL`
   - `TEST_PUBLISHABLE_KEY` (starts with `sb_publishable_`)
   - `TEST_LEARNER_EMAIL`, `TEST_LEARNER_PASSWORD`
   - `TEST_TEACHER_EMAIL`, `TEST_TEACHER_PASSWORD`
   - `TEST_OUTSIDER_EMAIL`, `TEST_OUTSIDER_PASSWORD`
4. Run `node tests/live-security.mjs` with Node 20+. Do not use an admin/service key. Do not put these values in GitHub or commit an environment file.
5. The test inserts one harmless selection, verifies duplicate retry, confirms linked reads and denied outsider reads, and attempts blocked writes/role escalation. It signs out the test sessions afterwards. It leaves that one event for administrator cleanup; assertions intentionally stop on unexpected access.
6. If any assertion fails, do not share the deployment. Inspect grants, policies and assignments in Supabase. Never disable RLS to fix a client connection problem.

This verifies API authorization, not just whether a navigation button is hidden. Use the manual browser checks in README as well. Confirm changing URL hashes, account display names or JavaScript cannot grant teacher reads. The client UI is not a trust boundary.

## Operational limits

- These tests are not a penetration test or a guarantee against stolen accounts, SQL administered incorrectly or future code changes.
- Device timestamps and client answer strings are untrusted; correctness is computed locally from public answer keys. Not suitable for secure exams.
- Teacher dashboard stores fetched history in tab memory. Removing access stops future reads, not information already downloaded.
- Use strong passwords, secure the administrative account, and disable public registrations/anonymous sign-in.
- Keep all credentials out of source and exports. Public configuration must contain only the URL and publishable key.
- Account history is stored on the device for offline retry. Shared browser users can inspect it; sign-out alone is not a local data wipe.
- Check provider limits and use a retention policy. Keep the configured API row cap at least 500 so pagination can retrieve complete history.
