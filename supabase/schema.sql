-- Supabase SQL Editor에서 실행하세요.

create table if not exists public.applications (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  department text,
  course text not null check (course in ('입문반', '실전반', '심화반')),
  message text
);

alter table public.applications enable row level security;

-- 신청 페이지(익명 사용자)가 데이터를 등록할 수 있도록 허용
create policy "Allow public insert" on public.applications
  for insert to anon
  with check (true);

-- 관리자 페이지(익명 사용자)가 목록을 조회할 수 있도록 허용
-- 주의: 별도 인증이 없으므로 /admin URL을 아는 사람은 누구나 조회할 수 있습니다.
-- 운영 환경에서는 Supabase Auth 등으로 /admin 접근을 보호하는 것을 권장합니다.
create policy "Allow public select" on public.applications
  for select to anon
  using (true);
