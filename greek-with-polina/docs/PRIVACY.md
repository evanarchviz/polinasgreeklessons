# Privacy notes for Evan and Polina

Local practice is stored in the browser and never uploaded automatically when you later sign in. Connected learner practice is shared with the assigned teacher: each selected answer, each sentence change, each submitted attempt, exercise identifiers and device timestamps. Supabase also records receipt time. There is no recording, location tracking or analytics in the app.

The GitHub-hosted lesson code and lesson text are public. Auth and exercise data live in your Supabase project, not in the GitHub repository. GitHub and Supabase may process normal hosting/request logs under their own policies. Device speech may use platform services; do not assume all speech processing is offline.

Evan controls the project, account provisioning, who can read learner data and retention. Agree a retention period with Polina and remove old records when no longer needed. This is an implementation guide, not a statement of legal compliance for a particular jurisdiction or age group.

## Browser storage

Answers and pending uploads are in localStorage, separated by account UUID. Tokens are in sessionStorage, scoped to the Supabase project. Another person using the same browser profile can inspect local data even after sign-out. Use private browsing or clear the local copy before leaving a shared computer. Clearing local data can discard unsynced work; cloud data is unaffected.

## Export, deletion and access removal

- Evan can export the full loaded history as JSON from Teacher; treat downloads as private learner information.
- To delete answers, first clear local copies/queues on all devices, then use the SQL example in `supabase/provision.example.sql`. Confirm the intended learner UUID before deleting.
- To delete the account, remove the Auth user through Supabase; foreign-key cascades remove profile, assignments and events.
- To stop teacher access, delete the corresponding teacher_learners row. Existing exports/local browser memory cannot be remotely recalled. Refresh or sign out of the dashboard to remove already displayed data.
- Backups and provider logs may have independent retention; consult your project/provider settings.

No secrets belong in configuration, issue reports, screenshots or Git history. If a privileged key is exposed, revoke/rotate it in Supabase and investigate access; removing the visible file alone does not remove Git history.
