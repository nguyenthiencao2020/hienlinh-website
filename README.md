# Website DNXH Hiển Linh

Next.js (App Router) + Supabase (DB/Storage/Auth làm CMS) + Vercel + GitHub.

## Kiến trúc

- **GitHub**: chứa source code, mỗi PR tự có preview deploy trên Vercel.
- **Vercel**: build & host Next.js, ISR (`revalidate`) cho trang chủ/tin tức.
- **Supabase**:
  - Postgres: `programs` (5 lĩnh vực hoạt động), `facilities` (các cơ sở thực tế),
    `news` (tin tức/hoạt động), `team_members` (đội ngũ), `partners` (đối tác/tài trợ),
    `contact_messages` (đăng ký tình nguyện/quyên góp/liên hệ), `newsletter_subscribers`.
  - Storage: bucket `media` (public) cho ảnh/video admin tải lên.
  - Auth: bảo vệ trang `/admin` — nhân sự FMM đăng nhập bằng email/password để quản lý nội dung, không cần đụng code.

## Cài đặt local

1. Tạo project tại [supabase.com](https://supabase.com).
2. Vào **SQL Editor**, chạy lần lượt tất cả các file trong `supabase/migrations/` theo đúng thứ tự số (`0001` → `0006`):
   - `0001`–`0004`: tạo bảng, RLS, seed 5 cơ sở thật đầu tiên (đã sửa từ 10 cơ sở suy đoán sai xuống 5 cơ sở đúng).
   - `0005`: nội dung thật cho 5 lĩnh vực hoạt động, địa chỉ/mô tả Phòng Khám Hy Vọng, 2 bài tin tức.
   - `0006`: thêm 6 cơ sở thật khác (Lưu Xá Emmanuel, Mầm Non Sơn Ca, Nhà Nội – Bán Trú FMM Suối Dầu có đầy đủ nội dung; Nhà Nội Trú Thạnh Mỹ, Thăng Tiến, Phòng Khám Suối Thông mới chỉ có tên) + 1 bài tin tức.
   - Tổng hiện tại: **11 cơ sở thật**, 5 lĩnh vực hoạt động có nội dung đầy đủ.
3. 3 cơ sở còn thiếu địa chỉ/mô tả (Thạnh Mỹ, Thăng Tiến, Suối Thông) có thể điền qua form admin (`/admin/co-so`) khi có nội dung thật, hoặc dùng mẫu `supabase/templates/fill_facilities_content.sql` — an toàn để chạy lại nhiều lần.
4. Vào **Authentication → Users**, tạo tài khoản cho nhân sự sẽ quản trị nội dung (không mở đăng ký công khai).
5. Copy `.env.example` thành `.env.local`, điền `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project Settings → API).
6. Chạy:

   ```bash
   npm install
   npm run dev
   ```

7. Trang công khai: [http://localhost:3000](http://localhost:3000). Trang quản trị: [http://localhost:3000/admin](http://localhost:3000/admin).

## Deploy lên Vercel

1. Import repo GitHub này vào Vercel (framework tự nhận diện Next.js).
2. Khai báo 2 biến môi trường ở trên trong **Project Settings → Environment Variables**.
3. Mỗi lần push lên `main` sẽ tự deploy production; mỗi PR có preview URL riêng.

## Sitemap

```
Trang Chủ
├── Về Chúng Tôi        /about            (Câu chuyện, Tầm nhìn & Sứ mệnh, Giá trị cốt lõi, Đội ngũ)
├── Hoạt Động & Cơ Sở    /hoat-dong        (1 trang, 2 section: Lĩnh vực hoạt động — bảng `programs`,
│                                            và Cơ sở — bảng `facilities`)
│   ├── /hoat-dong/[slug]   chi tiết từng lĩnh vực (kèm cơ sở liên quan)
│   └── /co-so/[slug]       chi tiết từng cơ sở (không có trang danh sách riêng/không có trong nav)
├── Tin Tức & Sự Kiện    /tin-tuc, /tin-tuc/[slug]   (bảng `news`, tab Mới nhất/Nổi bật/Thành công)
├── Tham Gia             /tham-gia         (đăng ký TNV, quyên góp — chỉ thu ý định, không thanh toán thật;
│                                            đối tác & tài trợ — bảng `partners`)
├── Liên Hệ              /lien-he          (thông tin liên hệ, form, bản đồ)
└── Tìm Kiếm             /tim-kiem         (tìm theo lĩnh vực / cơ sở / tin tức)

/admin — khu vực quản trị (yêu cầu đăng nhập): tin tức, cơ sở, tin nhắn/đăng ký.
```

Ảnh/tài liệu tham khảo gốc (thiết kế, hình ảnh cơ sở, nội dung Home/About, bài viết thật trong `Ref/HINH ANH 2`) nằm trong `Ref/` — không dùng trực tiếp trong code; ảnh đã qua xử lý được lưu trong `public/images/` và `public/brand/`, nội dung thật đã được đưa vào migrations `0005`/`0006`.
