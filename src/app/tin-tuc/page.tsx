import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { createClient } from "@/lib/supabase/server";
import type { NewsPost } from "@/lib/types";

export const revalidate = 60;

const PAGE_SIZE = 6;

export default async function NewsListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam ?? "1") || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await createClient();
  const { data: news, count } = await supabase
    .from("news")
    .select("*", { count: "exact" })
    .eq("published", true)
    .order("published_at", { ascending: false })
    .range(from, to)
    .returns<NewsPost[]>();

  const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));

  return (
    <div>
      <PageHero title="Tin Tức & Sự Kiện" crumbLabel="Tin Tức" />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(news ?? []).map((post) => (
              <Link
                key={post.id}
                href={`/tin-tuc/${post.slug}`}
                className="overflow-hidden rounded-xl border border-zinc-200 bg-white hover:border-brand-orange/50"
              >
                <div className="relative aspect-[16/10] bg-zinc-100">
                  {post.cover_image_url && (
                    <Image
                      src={post.cover_image_url}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  )}
                </div>
                <div className="p-5">
                  {post.published_at && (
                    <p className="text-xs text-zinc-500">
                      {new Date(post.published_at).toLocaleDateString("vi-VN")}
                    </p>
                  )}
                  <h2 className="mt-1 text-lg font-semibold text-brand-green-dark">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-zinc-600 line-clamp-2">{post.excerpt}</p>
                  <span className="mt-3 inline-block text-sm font-medium text-brand-orange">
                    Đọc tiếp →
                  </span>
                </div>
              </Link>
            ))}
            {!news?.length && (
              <p className="text-sm text-zinc-500">Chưa có bài viết nào được đăng.</p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex justify-center gap-2 text-sm">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/tin-tuc?page=${p}`}
                  className={`rounded-full px-3 py-1.5 ${
                    p === page
                      ? "bg-brand-orange text-white"
                      : "border border-zinc-200 text-zinc-600 hover:border-brand-orange/50"
                  }`}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
