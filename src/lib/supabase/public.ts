import { createClient } from "@supabase/supabase-js";

// Client chỉ đọc cho trang công khai: không đụng cookies() nên Next.js có
// thể cache trang (ISR) thay vì render lại + gọi Supabase ở mỗi lượt click.
// Trang /admin vẫn dùng client trong ./server.ts (cần phiên đăng nhập).
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
