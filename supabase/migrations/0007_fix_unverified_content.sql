-- Sửa nội dung sai/tự đặt phát hiện khi rà soát (an toàn để chạy lại nhiều lần).

-- Địa chỉ Phòng Khám Hy Vọng: theo đúng bảng hiệu (trước đây ghi nhầm "Giồng Sao 2").
update public.facilities
set address = 'Số 86, Đường 64, Ấp Giòng Sao, Xã Tân Phú Trung, Huyện Củ Chi, TP.HCM'
where slug = 'phong-kham-hy-vong';

-- Câu tóm tắt 5 lĩnh vực: trích từ nội dung thật của từng lĩnh vực
-- (tài liệu "Content_Trang - Lĩnh Vực Hoạt Động"), thay cho câu tự viết trước đây.
update public.programs set summary = 'Kiến tạo cơ hội học tập bình đẳng và toàn diện cho thế hệ trẻ cùng những mảnh đời kém may mắn.'
where slug = 'giao-duc';
update public.programs set summary = 'Đồng hành cùng anh chị em tại các vùng sâu, vùng xa, nơi còn hạn chế về kiến thức chăm sóc và bảo vệ sức khỏe.'
where slug = 'y-te';
update public.programs set summary = 'Nơi ở an toàn cho các em nữ đồng bào vùng miền núi đến trường và các em nữ từ các tỉnh lên Sài Gòn học tập.'
where slug = 'luu-tru';
update public.programs set summary = 'Trung Tâm Chữa Lành FMM — phục vụ Chữa Lành Toàn Diện: Tâm - Trí - Linh.'
where slug = 'tam-ly';
update public.programs set summary = 'Không đơn thuần là sự sẻ chia vật chất, mà là sự hiện diện của tình thân, sự nâng đỡ và thấu hiểu chân thành.'
where slug = 'thien-nguyen';
