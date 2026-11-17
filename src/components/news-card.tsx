import Image from "@/components/fade-image";
import Link from "next/link";
import type { NewsPost } from "@/lib/types";

export function formatDate(iso: string | null) {
  return iso ? new Date(iso).toLocaleDateString("vi-VN") : null;
}

function Meta({ post, light = false }: { post: NewsPost; light?: boolean }) {
  const date = formatDate(post.published_at);
  if (!post.category && !date) return null;
  return (
    <p className={`flex flex-wrap items-center gap-2 text-xs ${light ? "text-white/80" : "text-zinc-500"}`}>
      {post.category && (
        <span
          className={`rounded-full px-2.5 py-0.5 font-semibold ${
            light ? "bg-white/90 text-brand-green" : "bg-brand-cream text-brand-brown"
          }`}
        >
          {post.category}
        </span>
      )}
      {date && <span>{date}</span>}
    </p>
  );
}

// Thẻ tin tức dùng chung: trang Tin Tức, "Bài viết khác", trang chủ.
export function NewsCard({ post }: { post: NewsPost }) {
  return (
    <Link
      href={`/tin-tuc/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-green/15"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
        <Image
          src={post.cover_image_url || "/images/hero-page.webp"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <Meta post={post} />
        <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug text-brand-green">{post.title}</h3>
        {post.excerpt && <p className="mt-2 line-clamp-3 text-sm text-zinc-600">{post.excerpt}</p>}
        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-brand-orange">
          Đọc tiếp
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}

// Bài nổi bật đầu trang Tin Tức: ảnh lớn bên trái, nội dung bên phải.
export function NewsFeatureCard({ post }: { post: NewsPost }) {
  return (
    <Link
      href={`/tin-tuc/${post.slug}`}
      className="group grid overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:shadow-xl hover:shadow-brand-green/15 md:grid-cols-[1.25fr_1fr]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 md:aspect-auto md:min-h-[340px]">
        <Image
          src={post.cover_image_url || "/images/hero-page.webp"}
          alt={post.title}
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 768px) 55vw, 100vw"
        />
        <span className="absolute left-4 top-4 rounded-full bg-brand-orange px-3 py-1 text-xs font-semibold text-white shadow">
          Mới nhất
        </span>
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-8">
        <Meta post={post} />
        <h2 className="mt-3 text-2xl font-bold leading-snug text-brand-green sm:text-[28px]">{post.title}</h2>
        {post.excerpt && <p className="mt-3 line-clamp-4 text-justify leading-relaxed text-zinc-600">{post.excerpt}</p>}
        <span className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 group-hover:bg-brand-green-dark">
          Đọc bài viết
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
