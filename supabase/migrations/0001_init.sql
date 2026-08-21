-- Hien Linh website schema
-- Run this in the Supabase SQL editor (or via `supabase db push`).

-- ── Programs: 5 mảng của "Hệ sinh thái Hiển Linh" (Giáo dục, Y tế, Lưu trú, Tâm lý, Thiện nguyện)
create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  summary text not null default '',
  content text not null default '',
  cover_image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── News / Hoạt động
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  cover_image_url text,
  category text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Đăng ký tình nguyện viên / Quyên góp / Liên hệ
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('volunteer', 'donation', 'contact')),
  full_name text not null,
  email text,
  phone text,
  message text,
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now()
);

alter table public.programs enable row level security;
alter table public.news enable row level security;
alter table public.contact_messages enable row level security;

-- Ai cũng đọc được programs
create policy "programs are publicly readable" on public.programs
  for select using (true);

-- Chỉ user đã đăng nhập (nhân sự FMM) mới được thêm/sửa/xoá
create policy "authenticated users manage programs" on public.programs
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- News: công khai chỉ thấy bài đã publish, admin thấy hết
create policy "published news are publicly readable" on public.news
  for select using (published = true or auth.role() = 'authenticated');

create policy "authenticated users manage news" on public.news
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Contact/volunteer/donation: ai cũng gửi được (insert), chỉ admin đọc được
create policy "anyone can submit a message" on public.contact_messages
  for insert with check (true);

create policy "authenticated users read messages" on public.contact_messages
  for select using (auth.role() = 'authenticated');

create policy "authenticated users update messages" on public.contact_messages
  for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Seed 5 mảng hoạt động cốt lõi
insert into public.programs (slug, name, summary, sort_order) values
  ('giao-duc', 'Giáo dục', 'Đồng hành giáo dục cho trẻ em và người trẻ.', 1),
  ('y-te', 'Y tế', 'Chăm sóc y tế cho người yếu thế.', 2),
  ('luu-tru', 'Lưu trú', 'Mái ấm, nội trú cho trẻ em và người cần nơi ở an toàn.', 3),
  ('tam-ly', 'Tâm lý', 'Hỗ trợ tâm lý, lắng nghe và đồng hành.', 4),
  ('thien-nguyen', 'Các hoạt động thiện nguyện', 'Các hoạt động thiện nguyện và kết nối cộng đồng.', 5)
on conflict (slug) do nothing;

-- Storage bucket cho ảnh/video nội dung
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "media is publicly readable" on storage.objects
  for select using (bucket_id = 'media');

create policy "authenticated users upload media" on storage.objects
  for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "authenticated users manage media" on storage.objects
  for update using (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "authenticated users delete media" on storage.objects
  for delete using (bucket_id = 'media' and auth.role() = 'authenticated');
