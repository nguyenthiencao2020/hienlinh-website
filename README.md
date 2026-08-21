# Website DNXH Hiển Linh

Next.js (App Router) + Supabase (DB/Storage/Auth làm CMS) + Vercel + GitHub.

## Kiến trúc

- **GitHub**: chứa source code, mỗi PR tự có preview deploy trên Vercel.
- **Vercel**: build & host Next.js, ISR (`revalidate`) cho trang chủ/tin tức.
- **Supabase**:
  - Postgres: bảng `programs` (5 mảng hệ sinh thái), `news` (tin tức/hoạt động), `contact_messages` (đăng ký tình nguyện/quyên góp/liên hệ).
  - Storage: bucket `media` (public) cho ảnh/video.
  - Auth: bảo vệ trang `/admin` — nhân sự FMM đăng nhập bằng email/password để quản lý nội dung, không cần đụng code.

## Cài đặt local

1. Tạo project tại [supabase.com](https://supabase.com).
2. Vào **SQL Editor**, chạy nội dung file `supabase/migrations/0001_init.sql`.
3. Vào **Authentication → Users**, tạo tài khoản cho nhân sự sẽ quản trị nội dung (không mở đăng ký công khai).
4. Copy `.env.example` thành `.env.local`, điền `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project Settings → API).
5. Chạy:

   ```bash
   npm install
   npm run dev
   ```

6. Trang công khai: [http://localhost:3000](http://localhost:3000). Trang quản trị: [http://localhost:3000/admin](http://localhost:3000/admin).

## Deploy lên Vercel

1. Import repo GitHub này vào Vercel (framework tự nhận diện Next.js).
2. Khai báo 2 biến môi trường ở trên trong **Project Settings → Environment Variables**.
3. Mỗi lần push lên `main` sẽ tự deploy production; mỗi PR có preview URL riêng.

## Cấu trúc nội dung

- `/` — trang chủ (hero, giới thiệu, hệ sinh thái, tin tức, CTA).
- `/about` — Câu chuyện, Tầm nhìn, Sứ mệnh, Giá trị cốt lõi (nội dung tĩnh).
- `/hoat-dong/[slug]` — trang chi tiết từng mảng hoạt động (Giáo dục, Y tế, Lưu trú, Tâm lý, Thiện nguyện) — nội dung lấy từ bảng `programs`.
- `/tin-tuc`, `/tin-tuc/[slug]` — tin tức/hoạt động, lấy từ bảng `news`.
- `/lien-he` — form đăng ký tình nguyện viên / quyên góp / liên hệ, ghi vào bảng `contact_messages`.
- `/admin` — khu vực quản trị (yêu cầu đăng nhập): quản lý tin tức, xem tin nhắn/đăng ký.

Ảnh/tài liệu tham khảo gốc (thiết kế, hình ảnh cơ sở, nội dung Home/About) nằm trong `Ref/` — không dùng trực tiếp trong code, chỉ để tham khảo khi nhập liệu nội dung thật vào Supabase.
