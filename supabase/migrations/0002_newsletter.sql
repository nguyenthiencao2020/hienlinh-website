-- Đăng ký nhận tin (footer newsletter)
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

create policy "anyone can subscribe" on public.newsletter_subscribers
  for insert with check (true);

create policy "authenticated users read subscribers" on public.newsletter_subscribers
  for select using (auth.role() = 'authenticated');

-- Mở rộng contact_messages: lĩnh vực TNV quan tâm, thông tin quyên góp dự định
alter table public.contact_messages
  add column if not exists interest text,
  add column if not exists donation_amount numeric,
  add column if not exists donation_frequency text check (donation_frequency in ('one_time', 'monthly'));
