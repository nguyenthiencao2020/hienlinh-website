-- Điền nhanh địa chỉ + mô tả thật cho 5 cơ sở.
-- Cách dùng:
--   1. Điền nội dung thật vào phần '...' của từng dòng address/description bên dưới.
--   2. Mở Supabase Dashboard → SQL Editor → paste toàn bộ file này → Run.
--   3. Chạy lại bất cứ lúc nào nếu cần sửa — script này an toàn để chạy nhiều lần
--      (chỉ update đúng theo slug, không tạo dòng mới, không xoá dữ liệu khác).

update public.facilities set
  address = '...',
  description = '...'
where slug = 'huynh-de-nhu-nghia'; -- Mái Ấm Huynh Đệ Như Nghĩa

update public.facilities set
  address = '...',
  description = '...'
where slug = 'mam-non-anh-sang'; -- Mầm Non Ánh Sáng

update public.facilities set
  address = '...',
  description = '...'
where slug = 'mam-non-hien-linh'; -- Mầm Non Hiển Linh

update public.facilities set
  address = '...',
  description = '...'
where slug = 'noi-tru-thanh-gia'; -- Nhà Nội Trú Thánh Gia

update public.facilities set
  address = '...',
  description = '...'
where slug = 'phong-kham-hy-vong'; -- Phòng Khám Hy Vọng

-- Kiểm tra lại kết quả sau khi chạy:
select slug, name, address, description from public.facilities order by sort_order;
