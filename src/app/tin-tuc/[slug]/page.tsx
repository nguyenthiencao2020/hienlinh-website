import type { Metadata } from "next";
import Image from "@/components/fade-image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { NewsCard, formatDate } from "@/components/news-card";
import { Reveal } from "@/components/reveal";
import { createPublicClient } from "@/lib/supabase/public";
import { isRichHtml } from "@/lib/rich-text";
import { sanitizeRichText } from "@/lib/sanitize-rich-text";
import type { NewsPost } from "@/lib/types";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await createPublicClient()
    .from("news")
    .select("title, excerpt")
    .eq("slug", slug).eq("published", true)
    .maybeSingle<{ title: string; excerpt: string | null }>();
  if (!data) return {};
  return { title: data.title, description: data.excerpt?.slice(0, 160) || undefined };
}

// Không render sẵn lúc build; mỗi slug được render ở lượt truy cập đầu rồi cache (ISR).
export function generateStaticParams() {
  return [];
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = createPublicClient();
  const { data: post } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle<NewsPost>();

  if (!post) notFound();

  // Bài liên quan: ưu tiên cùng chuyên mục, sau đó là bài mới nhất.
  const { data: others } = await supabase
    .from("news")
    .select("*")
    .eq("published", true)
    .neq("id", post.id)
    .order("published_at", { ascending: false })
    .limit(12)
    .returns<NewsPost[]>();
  const pool = others ?? [];
  const sameCat = (n: NewsPost) => !!post.category && n.category === post.category;
  const related = [...pool.filter(sameCat), ...pool.filter((n) => !sameCat(n))].slice(0, 3);

  return (
    <div>
      <PageHero
        title={post.title}
        crumbs={[{ label: "Tin Tức", href: "/tin-tuc" }, { label: post.title }]}
        imageSrc={post.cover_image_url || "/images/hero-page.webp"}
      />
      <Reveal className="mx-auto block max-w-3xl px-6 py-16">
        <article>
          <div className="flex items-center gap-3 text-sm text-zinc-500">
            {post.category && (
              <span className="rounded-full bg-brand-cream px-3 py-1 font-semibold text-brand-brown">
                {post.category}
              </span>
            )}
            {post.published_at && (
              <span>{formatDate(post.published_at)}</span>
            )}
          </div>
          {post.cover_image_url && (
            <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl">
              <Image src={post.cover_image_url} alt={post.title} fill className="object-cover" sizes="768px" />
            </div>
          )}
          <h2 className="mt-6 text-2xl font-bold text-brand-green sm:text-3xl">{post.title}</h2>
          {isRichHtml(post.content) ? (
            <div
              className="prose prose-zinc mt-6 max-w-none text-justify prose-headings:text-brand-green prose-a:text-brand-green prose-img:rounded-2xl prose-blockquote:border-brand-green"
              dangerouslySetInnerHTML={{ __html: sanitizeRichText(post.content) }}
            />
          ) : (
            <div className="prose prose-zinc mt-6 max-w-none whitespace-pre-wrap text-justify">
              {post.content}
            </div>
          )}
          <div className="mt-12 border-t border-zinc-200 pt-6">
            <Link href="/tin-tuc" className="text-sm font-medium text-brand-green hover:underline">
              ← Tất cả tin tức
            </Link>
          </div>
        </article>
      </Reveal>

      {related.length > 0 && (
        <section className="bg-brand-cream px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <Reveal className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-brown">Đọc thêm</p>
                <h2 className="mt-2 text-2xl font-bold text-brand-green">Bài viết khác</h2>
              </div>
              <Link href="/tin-tuc" className="hidden shrink-0 text-sm font-medium text-brand-green hover:underline sm:block">
                Xem tất cả →
              </Link>
            </Reveal>
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              {related.map((n, i) => (
                <Reveal key={n.id} delay={i * 80} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
                  <NewsCard post={n} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
