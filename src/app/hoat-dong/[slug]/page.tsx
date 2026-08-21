import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { createClient } from "@/lib/supabase/server";
import { PROGRAM_FALLBACK_IMAGES } from "@/lib/program-images";
import type { Program } from "@/lib/types";

export const revalidate = 60;

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: program } = await supabase
    .from("programs")
    .select("*")
    .eq("slug", slug)
    .maybeSingle<Program>();

  if (!program) notFound();

  const image =
    program.cover_image_url || PROGRAM_FALLBACK_IMAGES[program.slug] || "/images/hero-page.webp";

  return (
    <div>
      <PageHero title={program.name} crumbLabel={`Hoạt Động / ${program.name}`} imageSrc={image} />

      <article className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-orange">
          Hệ sinh thái Hiển Linh
        </p>
        <p className="mt-4 text-lg text-zinc-600">{program.summary}</p>
        {program.content && (
          <div className="prose prose-zinc mt-8 whitespace-pre-wrap">{program.content}</div>
        )}
        <Link
          href="/tham-gia"
          className="mt-8 inline-block rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white hover:bg-brand-orange-dark"
        >
          Đồng hành cùng chương trình này →
        </Link>
      </article>

      <div className="relative mx-auto mb-16 aspect-[16/7] max-w-5xl overflow-hidden rounded-2xl">
        <Image src={image} alt={program.name} fill className="object-cover" sizes="100vw" />
      </div>
    </div>
  );
}
