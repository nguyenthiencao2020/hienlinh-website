import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { createClient } from "@/lib/supabase/server";
import type { NewsPost } from "@/lib/types";

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

  const supabase = await createClient();
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

  return (
    <div>
      <PageHero title="Tin Tức & Sự Kiện" crumbLabel="Tin Tức" />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-2">
            {TABS.map((tab) => (
              <Link
                key={tab.value}
                href={tab.value ? `/tin-tuc?loai=${tab.value}` : "/tin-tuc"}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.value
                    ? "bg-brand-brown text-white shadow-sm"
                    : "border border-zinc-200 text-zinc-600 hover:scale-105 hover:border-brand-brown/50"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(news ?? []).map((post, i) => (
              <Reveal key={post.id} delay={i * 70}>
                <Link
                  href={`/tin-tuc/${post.slug}`}
                  className="group block overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-brown/50 hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                    {post.cover_image_url && (
                      <Image
                        src={post.cover_image_url}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
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
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-brown">
                      Đọc tiếp
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
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
                  href={`/tin-tuc?page=${p}${activeTab ? `&loai=${activeTab}` : ""}`}
                  className={`rounded-full px-3 py-1.5 transition-all duration-300 ${
                    p === page
                      ? "bg-brand-brown text-white"
                      : "border border-zinc-200 text-zinc-600 hover:scale-105 hover:border-brand-brown/50"
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
