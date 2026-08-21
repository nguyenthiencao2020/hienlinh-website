import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { NewsPost } from "@/lib/types";

export const revalidate = 60;

export default async function NewsListPage() {
  const supabase = await createClient();
  const { data: news } = await supabase
    .from("news")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .returns<NewsPost[]>();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold text-zinc-900">Tin Tức &amp; Hoạt Động</h1>
      <div className="mt-8 space-y-6">
        {(news ?? []).map((post) => (
          <Link
            key={post.id}
            href={`/tin-tuc/${post.slug}`}
            className="block rounded-xl border border-zinc-200 p-6 hover:border-amber-300"
          >
            {post.category && (
              <span className="text-xs font-semibold uppercase tracking-wide text-amber-800">
                {post.category}
              </span>
            )}
            <h2 className="mt-1 text-xl font-semibold text-zinc-900">{post.title}</h2>
            <p className="mt-2 text-sm text-zinc-600">{post.excerpt}</p>
          </Link>
        ))}
        {!news?.length && (
          <p className="text-sm text-zinc-500">Chưa có bài viết nào được đăng.</p>
        )}
      </div>
    </div>
  );
}
