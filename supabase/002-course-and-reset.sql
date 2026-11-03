-- Greek Foundations v2. Apply once before publishing the updated client.
begin;
alter table public.profiles add column if not exists progress_generation integer not null default 0;
alter table public.events add column if not exists generation integer not null default 0;
alter table public.events drop constraint if exists events_lesson_id_check;
alter table public.events drop constraint if exists valid_question;
alter table public.events add constraint valid_question check ((lesson_id='hello' and question_id in ('h1','h2','h3','h4','h5')) or (lesson_id='day' and question_id in ('d1','d2','d3','d4','d5')) or (lesson_id='cafe' and question_id in ('c1','c2','c3','c4','c5')) or (lesson_id='hello' and question_id in ('h1','h2','h3','h4','h5')) or (lesson_id='day' and question_id in ('d1','d2','d3','d4','d5')) or (lesson_id='identity' and question_id in ('i1','i2','i3','i4','i5')) or (lesson_id='people' and question_id in ('p1','p2','p3','p4','p5')) or (lesson_id='numbers' and question_id in ('n1','n2','n3','n4','n5')) or (lesson_id='cafe' and question_id in ('c1','c2','c3','c4','c5')) or (lesson_id='places' and question_id in ('l1','l2','l3','l4','l5')) or (lesson_id='routine' and question_id in ('r1','r2','r3','r4','r5')));
grant insert(generation) on public.events to authenticated;
create or replace function public.check_event_generation() returns trigger
language plpgsql security definer set search_path = '' as $$
declare current_generation integer;
begin
 select progress_generation into current_generation from public.profiles where id=new.user_id for share;
 if current_generation is null or new.generation<>current_generation then
   raise exception 'Progress has been reset. Reconnect and sync before retrying.' using errcode='23514';
 end if;
 return new;
end $$;
revoke all on function public.check_event_generation() from public,anon,authenticated;
drop trigger if exists check_event_generation on public.events;
create trigger check_event_generation before insert on public.events for each row execute function public.check_event_generation();
create or replace function public.reset_learner_progress(target_learner uuid) returns integer
language plpgsql security definer set search_path = '' as $$
declare next_generation integer;
begin
 if not exists(select 1 from public.profiles p join public.teacher_learners tl on tl.teacher_id=p.id
   where p.id=auth.uid() and p.role='teacher' and tl.learner_id=target_learner) then
   raise exception 'Only the assigned teacher can reset this learner.' using errcode='42501';
 end if;
 update public.profiles set progress_generation=progress_generation+1
 where id=target_learner and role='learner' returning progress_generation into next_generation;
 if next_generation is null then raise exception 'Learner not found'; end if;
 delete from public.events where user_id=target_learner;
 return next_generation;
end $$;
revoke all on function public.reset_learner_progress(uuid) from public,anon,authenticated;
grant execute on function public.reset_learner_progress(uuid) to authenticated;
commit;
