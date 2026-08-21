import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { NewsPost } from "@/lib/types";

export const revalidate = 60;

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle<NewsPost>();

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      {post.category && (
        <span className="text-xs font-semibold uppercase tracking-wide text-amber-800">
          {post.category}
        </span>
      )}
      <h1 className="mt-2 text-3xl font-bold text-zinc-900">{post.title}</h1>
      {post.published_at && (
        <p className="mt-2 text-sm text-zinc-500">
          {new Date(post.published_at).toLocaleDateString("vi-VN")}
        </p>
      )}
      <div className="prose prose-zinc mt-8 whitespace-pre-wrap">{post.content}</div>
    </article>
  );
}
