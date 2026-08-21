-- Các cơ sở thực tế của DNXH Hiển Linh (mục "2.2 Các Cơ Sở Của Chúng Tôi" trong sitemap)
create table if not exists public.facilities (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  program_slug text references public.programs(slug) on delete set null,
  address text,
  description text not null default '',
  cover_image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.facilities enable row level security;

create policy "facilities are publicly readable" on public.facilities
  for select using (true);

create policy "authenticated users manage facilities" on public.facilities
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

insert into public.facilities (slug, name, program_slug, sort_order) values
  ('huynh-de-nhu-nghia', 'Cơ Sở Khiếm Thị Huynh Đệ Như Nghĩa', 'luu-tru', 1),
  ('luu-xa-emmanuel', 'Lưu Xá Emmanuel', 'luu-tru', 2),
  ('noi-tru-thanh-gia', 'Nội Trú Thánh Gia', 'luu-tru', 3),
  ('noi-tru-thang-tien', 'Nội Trú Thăng Tiến', 'luu-tru', 4),
  ('mam-non-hien-linh', 'Mầm Non Hiển Linh', 'giao-duc', 5),
  ('mam-non-anh-sang', 'Mầm Non Ánh Sáng', 'giao-duc', 6),
  ('mam-non-thien-ca', 'Mầm Non Thiên Ca', 'giao-duc', 7),
  ('mam-non-son-ca', 'Mầm Non Sơn Ca', 'giao-duc', 8),
  ('phong-kham-hy-vong', 'Phòng Khám Hy Vọng', 'y-te', 9),
  ('phong-kham-suoi-thong', 'Phòng Khám Suối Thông', 'y-te', 10)
on conflict (slug) do nothing;

-- Gắn cờ cho tab "Hoạt Động Nổi Bật" / "Câu Chuyện Thành Công" ở trang Tin Tức,
-- tách biệt với `category` (vốn dùng làm chủ đề: Giáo dục, Y tế...)
alter table public.news
  add column if not exists is_featured boolean not null default false,
  add column if not exists is_success_story boolean not null default false;

-- Đội ngũ (mục "Đội Ngũ Của Chúng Tôi" trong trang Giới Thiệu) — trống, chờ admin nhập
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  role text not null default '',
  photo_url text,
  bio text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.team_members enable row level security;

create policy "team members are publicly readable" on public.team_members
  for select using (true);

create policy "authenticated users manage team members" on public.team_members
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Đối tác & tài trợ (mục trong trang Tham Gia) — trống, chờ admin nhập
create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  website_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.partners enable row level security;

create policy "partners are publicly readable" on public.partners
  for select using (true);

create policy "authenticated users manage partners" on public.partners
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
