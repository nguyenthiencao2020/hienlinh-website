import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { createPublicClient } from "@/lib/supabase/public";
import { PROGRAM_FALLBACK_IMAGES } from "@/lib/program-images";
import { FacilityCard } from "@/components/facility-card";
import type { Facility, Program } from "@/lib/types";

export const revalidate = 60;

// Không render sẵn lúc build; mỗi slug được render ở lượt truy cập đầu rồi cache (ISR).
export function generateStaticParams() {
  return [];
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = createPublicClient();
  const [{ data: program }, { data: facilities }] = await Promise.all([
    supabase.from("programs").select("*").eq("slug", slug).maybeSingle<Program>(),
    supabase
      .from("facilities")
      .select("*")
      .eq("program_slug", slug)
      .order("sort_order", { ascending: true })
      .returns<Facility[]>(),
  ]);

  if (!program) notFound();

  const image =
    program.cover_image_url || PROGRAM_FALLBACK_IMAGES[program.slug] || "/images/hero-page.webp";

  return (
    <div>
      <PageHero title={program.name} crumbLabel={`Hoạt Động / ${program.name}`} imageSrc={image} />

      <Reveal className="mx-auto block max-w-3xl px-6 py-16">
        <article>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-brown">
            Hệ sinh thái Hiển Linh
          </p>
          <p className="mt-4 text-lg text-zinc-600">{program.summary}</p>
          {program.content && (
            <div className="prose prose-zinc mt-8 max-w-none whitespace-pre-wrap text-justify">{program.content}</div>
          )}
          <Link
            href="/tham-gia"
            className="mt-8 inline-block rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-brand-orange-dark hover:shadow-lg"
          >
            Đồng hành cùng chương trình này →
          </Link>
        </article>
      </Reveal>

      {!!facilities?.length && (
        <section className="mx-auto mb-16 max-w-6xl px-6">
          <Reveal>
            <h2 className="text-2xl font-bold text-brand-green">Cơ sở liên quan</h2>
          </Reveal>
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            {facilities.map((facility, i) => (
              <Reveal key={facility.id} delay={i * 70} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
                <FacilityCard facility={facility} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
