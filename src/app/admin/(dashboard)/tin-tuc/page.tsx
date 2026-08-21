import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { NewsPost } from "@/lib/types";
import { deleteNews } from "./actions";

export default async function AdminNewsListPage() {
  const supabase = await createClient();
  const { data: news } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<NewsPost[]>();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">Tin tức</h1>
        <Link
          href="/admin/tin-tuc/moi"
          className="rounded-full bg-brand-orange px-4 py-2 text-sm font-medium text-white hover:bg-brand-orange-dark"
        >
          + Bài viết mới
        </Link>
      </div>
      <div className="mt-6 divide-y divide-zinc-200 rounded-xl border border-zinc-200">
        {(news ?? []).map((post) => (
          <div key={post.id} className="flex items-center justify-between gap-4 p-4">
            <div>
              <p className="font-medium text-zinc-900">{post.title}</p>
              <p className="text-xs text-zinc-500">
                /{post.slug} ·{" "}
                {post.published ? (
                  <span className="text-green-700">Đã đăng</span>
                ) : (
                  <span className="text-zinc-500">Bản nháp</span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Link href={`/admin/tin-tuc/${post.id}`} className="text-brand-orange underline">
                Sửa
              </Link>
              <form action={deleteNews.bind(null, post.id)}>
                <button className="text-red-600 underline" type="submit">
                  Xoá
                </button>
              </form>
            </div>
          </div>
        ))}
        {!news?.length && <p className="p-4 text-sm text-zinc-500">Chưa có bài viết nào.</p>}
      </div>
    </div>
  );
}
