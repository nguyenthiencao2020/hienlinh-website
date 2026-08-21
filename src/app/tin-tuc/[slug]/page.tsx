import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
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
              <span className="rounded-full bg-brand-cream px-3 py-1 font-semibold text-brand-orange">
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
          <div className="prose prose-zinc mt-8 whitespace-pre-wrap">{post.content}</div>
        </article>
      </Reveal>
    </div>
  );
}
