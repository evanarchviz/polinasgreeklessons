-- Run ONCE in a new Supabase project's SQL Editor as project administrator.
-- Roles and teacher assignments can only be provisioned by an administrator.
begin;
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 80),
  role text not null check (role in ('learner','teacher'))
);
create table public.teacher_learners (
  teacher_id uuid not null references public.profiles(id) on delete cascade,
  learner_id uuid not null references public.profiles(id) on delete cascade,
  primary key (teacher_id,learner_id),
  check (teacher_id <> learner_id)
);
create table public.events (
  id uuid primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id text not null check (lesson_id in ('hello','day','cafe')),
  question_id text not null,
  kind text not null check (kind in ('select','submit')),
  answer text not null check (char_length(answer)<=500),
  created_at timestamptz not null,
  received_at timestamptz not null default now(),
  constraint valid_question check (
    (lesson_id='hello' and question_id in ('h1','h2','h3','h4','h5')) or
    (lesson_id='day' and question_id in ('d1','d2','d3','d4','d5')) or
    (lesson_id='cafe' and question_id in ('c1','c2','c3','c4','c5'))
  )
);
create index events_user_time on public.events(user_id,created_at,id);
alter table public.profiles enable row level security;
alter table public.teacher_learners enable row level security;
alter table public.events enable row level security;
revoke all on public.profiles, public.teacher_learners, public.events from anon, authenticated;
grant select on public.profiles, public.teacher_learners, public.events to authenticated;
-- Do not grant received_at: the server sets receipt time.
grant insert(id,user_id,lesson_id,question_id,kind,answer,created_at) on public.events to authenticated;

create policy "read own assignments" on public.teacher_learners for select to authenticated
using (teacher_id=(select auth.uid()) or learner_id=(select auth.uid()));
create policy "read own or linked learner profile" on public.profiles for select to authenticated
using (id=(select auth.uid()) or exists (
  select 1 from public.teacher_learners tl where tl.teacher_id=(select auth.uid()) and tl.learner_id=profiles.id
));
create policy "learner inserts own events" on public.events for insert to authenticated
with check (user_id=(select auth.uid()) and exists (
  select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='learner'
));
create policy "own events or assigned teacher reads" on public.events for select to authenticated
using (user_id=(select auth.uid()) or (
  exists (select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='teacher') and
  exists (select 1 from public.teacher_learners tl where tl.teacher_id=(select auth.uid()) and tl.learner_id=events.user_id)
));
-- No client UPDATE/DELETE policies or grants. No public registration trigger.
commit;
