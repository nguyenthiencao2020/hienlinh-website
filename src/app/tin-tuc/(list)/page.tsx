import { NewsCard, NewsFeatureCard } from "@/components/news-card";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { createPublicClient } from "@/lib/supabase/public";
import type { NewsPost } from "@/lib/types";

export const metadata = { title: "Tin Tức & Sự Kiện" };

export const revalidate = 60;

const PAGE_SIZE = 6;

const TABS = [
  { value: "", label: "Tin Tức Mới Nhất" },
  { value: "noi-bat", label: "Hoạt Động Nổi Bật" },
  { value: "thanh-cong", label: "Câu Chuyện Thành Công" },
];

export default async function NewsListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; loai?: string }>;
}) {
  const { page: pageParam, loai } = await searchParams;
  const page = Math.max(1, Number(pageParam ?? "1") || 1);
  const activeTab = TABS.some((t) => t.value === loai) ? (loai ?? "") : "";
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = createPublicClient();
  let query = supabase
    .from("news")
    .select("*", { count: "exact" })
    .eq("published", true)
    .order("published_at", { ascending: false })
    .range(from, to);

  if (activeTab === "noi-bat") {
    query = query.eq("is_featured", true);
  } else if (activeTab === "thanh-cong") {
    query = query.eq("is_success_story", true);
  }

  const { data: news, count } = await query.returns<NewsPost[]>();
  const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));
  // Trang đầu của mục "Tin Tức Mới Nhất": bài mới nhất hiển thị lớn.
  const showFeature = page === 1 && !activeTab && (news?.length ?? 0) > 1;
  const feature = showFeature ? news![0] : null;
  const rest = (showFeature ? news!.slice(1) : news) ?? [];

  const pageHref = (p: number) => {
    const q = new URLSearchParams();
    if (activeTab) q.set("loai", activeTab);
    if (p > 1) q.set("page", String(p));
    const qs = q.toString();
    return qs ? `/tin-tuc?${qs}` : "/tin-tuc";
  };

  return (
    <div>
      <PageHero title="Tin Tức & Sự Kiện" crumbs={[{ label: "Tin Tức" }]} />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-2">
            {TABS.map((tab) => (
              <Link
                key={tab.value}
                href={tab.value ? `/tin-tuc?loai=${tab.value}` : "/tin-tuc"}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.value
                    ? "bg-brand-orange text-white shadow-sm"
                    : "border border-zinc-200 text-zinc-600 hover:scale-105 hover:border-brand-orange/50"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          {feature && (
            <Reveal className="mt-8 block">
              <NewsFeatureCard post={feature} />
            </Reveal>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {rest.map((post, i) => (
              <Reveal key={post.id} delay={(i % 3) * 70} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
                <NewsCard post={post} />
              </Reveal>
            ))}
          </div>
          {!news?.length && (
            <div className="mt-8 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-12 text-center text-zinc-500">
              {activeTab ? "Chưa có bài viết nào trong mục này." : "Chưa có bài viết nào được đăng."}
              {activeTab && (
                <Link href="/tin-tuc" className="mt-2 block text-sm font-semibold text-brand-green hover:underline">
                  Xem tất cả tin tức →
                </Link>
              )}
            </div>
          )}

          {totalPages > 1 && (
            <nav aria-label="Phân trang" className="mt-10 flex flex-wrap items-center justify-center gap-2 text-sm">
              {page > 1 && (
                <Link href={pageHref(page - 1)} className="rounded-full border border-zinc-200 px-4 py-1.5 text-zinc-600 transition-colors hover:border-brand-orange/50">
                  ← Trước
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={pageHref(p)}
                  aria-current={p === page ? "page" : undefined}
                  className={`flex h-9 min-w-9 items-center justify-center rounded-full px-3 transition-all duration-300 ${
                    p === page
                      ? "bg-brand-orange text-white"
                      : "border border-zinc-200 text-zinc-600 hover:border-brand-orange/50"
                  }`}
                >
                  {p}
                </Link>
              ))}
              {page < totalPages && (
                <Link href={pageHref(page + 1)} className="rounded-full border border-zinc-200 px-4 py-1.5 text-zinc-600 transition-colors hover:border-brand-orange/50">
                  Sau →
                </Link>
              )}
            </nav>
          )}
        </div>
      </section>
    </div>
  );
}
