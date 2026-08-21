import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminHomePage() {
  const supabase = await createClient();
  const [{ count: newsCount }, { count: newMessagesCount }] = await Promise.all([
    supabase.from("news").select("*", { count: "exact", head: true }),
    supabase
      .from("contact_messages")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">Tổng quan</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/tin-tuc"
          className="rounded-xl border border-zinc-200 p-6 hover:border-brand-brown/40"
        >
          <p className="text-3xl font-bold text-zinc-900">{newsCount ?? 0}</p>
          <p className="mt-1 text-sm text-zinc-600">Bài viết tin tức</p>
        </Link>
        <Link
          href="/admin/tin-nhan"
          className="rounded-xl border border-zinc-200 p-6 hover:border-brand-brown/40"
        >
          <p className="text-3xl font-bold text-zinc-900">{newMessagesCount ?? 0}</p>
          <p className="mt-1 text-sm text-zinc-600">Tin nhắn / đăng ký chưa đọc</p>
        </Link>
      </div>
    </div>
  );
}
