# Greek Foundations update

## Course design

The Centre for the Greek Language A1 adult syllabus emphasizes personal information, familiar people, everyday needs, purchases, time and place, supported by integrated listening, reading, speaking and writing. CEFR describes practical beginner outcomes, not a single optimal lesson order.

This course uses the following editorial sequence for learners who can already read the Greek alphabet:

1. Greetings and introductions — ready-to-use phrases, names and questions.
2. Greetings and feelings — social exchanges and είμαι.
3. Origins and residence — personal details, location chunks and negation.
4. People and possessions — noun articles/gender, έχω and μου.
5. Numbers and quantities — prices, number recognition and agreement.
6. Café transactions — combine quantities with polite requests.
7. Places and directions — location questions and spatial chunks.
8. Time and routines — present-tense verb pairs and time expressions.

Each lesson includes reference phrases, a grammar explanation, a contextual dialogue and retrieval exercises. Reuse previous vocabulary; read aloud, attempt exercises without consulting the cards, then revisit errors on a later day. A correct answer once is an app completion measure, not proof of durable language proficiency. Device speech is optional; this is a foundation course rather than a complete A1 qualification or a speaking assessment.

Sources researched before implementation:
- https://www.greek-language.gr/certification/node/97.html
- https://www.coe.int/fr/web/common-european-framework-reference-languages/cefr-descriptors-search

## Upgrade existing Supabase project

Run `supabase/002-course-and-reset.sql` once in the Supabase SQL Editor before publishing the updated client. For new projects, apply `schema.sql` first and then migration 002. The migration retains existing accounts and answers. It extends the exercise allowlist, adds progress generations and a restricted teacher reset function.

The original lessons retain their IDs and model answers to preserve historical grading. Names in example conversations are examples, not personalized product branding.

## Teacher reset

Teacher → select learner → Delete all progress → confirm the named learner. Export first if records are needed. The function checks the signed-in teacher's database role and explicit learner assignment; it deletes that learner's events and increments their progress generation in one transaction. It cannot delete accounts or another teacher's learners.

Learner clients check the server generation before uploading. After a reset they clear stale local events, pending uploads and the current answer. An insert trigger rejects older generations even from an old client; it locks the learner profile to serialize concurrent inserts and resets. An offline device cannot be remotely wiped: its stale local copy clears when it reconnects with the updated app and syncs. Guest practice remains independent.

The destructive button requires confirmation in the app. This update does not itself reset any real learner's progress. No administrative key is used in browser code.

## Validation

Run `node --test test.mjs` and syntax checks. Test reset in a transaction with rollback or a disposable learner, including learner/outsider denial and a stale queued event after generation increment. Actual browser/device sign-in must also be checked; test credentials are not included.
