-- AFTER creating two email/password users in Authentication > Users,
-- copy their UUIDs here. Run in SQL Editor, not in the browser.
-- Replace both occurrences of each UUID placeholder.
begin;
insert into public.profiles(id,display_name,role) values
  ('POLINA_AUTH_UUID','Polina','learner'),
  ('EVAN_AUTH_UUID','Evan','teacher');
insert into public.teacher_learners(teacher_id,learner_id)
values ('EVAN_AUTH_UUID','POLINA_AUTH_UUID');
commit;

-- Revoke Evan's access (administrator only):
-- delete from public.teacher_learners where teacher_id='EVAN_AUTH_UUID' and learner_id='POLINA_AUTH_UUID';
-- Delete Polina's answer history (administrator only; ask her to clear local copies too):
-- delete from public.events where user_id='POLINA_AUTH_UUID';
-- Removing the Auth user also cascades through profile, assignments and events.
