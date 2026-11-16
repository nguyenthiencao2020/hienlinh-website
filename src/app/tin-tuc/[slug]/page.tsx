import Image from "@/components/fade-image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { createPublicClient } from "@/lib/supabase/public";
import { isRichHtml } from "@/lib/rich-text";
import { sanitizeRichText } from "@/lib/sanitize-rich-text";
import type { NewsPost } from "@/lib/types";

export const revalidate = 60;

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

  return (
    <div>
      <PageHero
        title={post.title}
        crumbLabel="Tin Tức"
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
              <span>{new Date(post.published_at).toLocaleDateString("vi-VN")}</span>
            )}
          </div>
          {post.cover_image_url && (
            <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl">
              <Image src={post.cover_image_url} alt={post.title} fill className="object-cover" sizes="768px" />
            </div>
          )}
          <h1 className="mt-6 text-2xl font-bold text-brand-green sm:text-3xl">{post.title}</h1>
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
        </article>
      </Reveal>
    </div>
  );
}
