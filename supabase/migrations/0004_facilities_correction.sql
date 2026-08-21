-- Tổ chức xác nhận chỉ có 5 cơ sở thực tế (không phải 10 như seed ban đầu ở 0003).
-- Migration này sửa lại cho đúng — an toàn dù bạn đã chạy 0003 hay chưa.

-- Xoá 5 cơ sở không có thật
delete from public.facilities
where slug in (
  'luu-xa-emmanuel',
  'noi-tru-thang-tien',
  'mam-non-thien-ca',
  'mam-non-son-ca',
  'phong-kham-suoi-thong'
);

-- Sửa tên + thứ tự cho đúng 5 cơ sở còn lại (nếu đã tồn tại từ 0003)
update public.facilities set name = 'Mái Ấm Huynh Đệ Như Nghĩa', sort_order = 1 where slug = 'huynh-de-nhu-nghia';
update public.facilities set sort_order = 2 where slug = 'mam-non-anh-sang';
update public.facilities set sort_order = 3 where slug = 'mam-non-hien-linh';
update public.facilities set name = 'Nhà Nội Trú Thánh Gia', sort_order = 4 where slug = 'noi-tru-thanh-gia';
update public.facilities set sort_order = 5 where slug = 'phong-kham-hy-vong';

-- Đảm bảo đủ 5 cơ sở nếu 0003 chưa từng chạy
insert into public.facilities (slug, name, program_slug, sort_order) values
  ('huynh-de-nhu-nghia', 'Mái Ấm Huynh Đệ Như Nghĩa', 'luu-tru', 1),
  ('mam-non-anh-sang', 'Mầm Non Ánh Sáng', 'giao-duc', 2),
  ('mam-non-hien-linh', 'Mầm Non Hiển Linh', 'giao-duc', 3),
  ('noi-tru-thanh-gia', 'Nhà Nội Trú Thánh Gia', 'luu-tru', 4),
  ('phong-kham-hy-vong', 'Phòng Khám Hy Vọng', 'y-te', 5)
on conflict (slug) do nothing;

select slug, name, sort_order from public.facilities order by sort_order;
