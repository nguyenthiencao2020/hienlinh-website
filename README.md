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
2. Vào **SQL Editor**, chạy lần lượt các file trong `supabase/migrations/` (theo thứ tự số).
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

## Sitemap

```
Trang Chủ
├── Về Chúng Tôi        /about            (Câu chuyện, Tầm nhìn & Sứ mệnh, Giá trị cốt lõi, Đội ngũ)
├── Hoạt Động & Cơ Sở
│   ├── Lĩnh Vực Hoạt Động   /hoat-dong, /hoat-dong/[slug]   (bảng `programs`)
│   └── Các Cơ Sở            /co-so, /co-so/[slug]           (bảng `facilities`)
├── Tin Tức & Sự Kiện    /tin-tuc, /tin-tuc/[slug]   (bảng `news`, tab Mới nhất/Nổi bật/Thành công)
├── Tham Gia             /tham-gia         (đăng ký TNV, quyên góp — chỉ thu ý định, không thanh toán thật;
│                                            đối tác & tài trợ — bảng `partners`)
├── Liên Hệ              /lien-he          (thông tin liên hệ, form, bản đồ)
└── Tìm Kiếm             /tim-kiem         (tìm theo lĩnh vực / cơ sở / tin tức)

/admin — khu vực quản trị (yêu cầu đăng nhập): tin tức, cơ sở, tin nhắn/đăng ký.
```

Ảnh/tài liệu tham khảo gốc (thiết kế, hình ảnh cơ sở, nội dung Home/About) nằm trong `Ref/` — không dùng trực tiếp trong code, chỉ để tham khảo khi nhập liệu nội dung thật vào Supabase.
