import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { createPublicClient } from "@/lib/supabase/public";
import { PROGRAM_FALLBACK_IMAGES, PROGRAM_ICONS } from "@/lib/program-images";
import { LeafIcon } from "@/components/icons";
import { FacilityCard } from "@/components/facility-card";
import type { Facility, Program } from "@/lib/types";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await createPublicClient()
    .from("programs")
    .select("name, summary")
    .eq("slug", slug)
    .maybeSingle<{ name: string; summary: string | null }>();
  if (!data) return {};
  return { title: data.name, description: data.summary?.slice(0, 160) || undefined };
}

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
  const [{ data: programs }, { data: facilities }] = await Promise.all([
    supabase.from("programs").select("*").order("sort_order", { ascending: true }).returns<Program[]>(),
    supabase
      .from("facilities")
      .select("*")
      .eq("program_slug", slug)
      .order("sort_order", { ascending: true })
      .returns<Facility[]>(),
  ]);

  const program = programs?.find((p) => p.slug === slug);
  if (!program) notFound();
  const otherPrograms = (programs ?? []).filter((p) => p.id !== program.id);

  const image =
    program.cover_image_url || PROGRAM_FALLBACK_IMAGES[program.slug] || "/images/hero-page.webp";

  return (
    <div>
      <PageHero title={program.name} crumbs={[{ label: "Lĩnh Vực Hoạt Động", href: "/hoat-dong" }, { label: program.name }]} imageSrc={image} />

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
            href={`/tham-gia?linh-vuc=${program.slug}`}
            className="mt-8 inline-block rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-brand-orange-dark hover:shadow-lg"
          >
            Đồng hành cùng chương trình này →
          </Link>
        </article>
      </Reveal>

      {!!facilities?.length && (
        <section className="mx-auto mb-16 max-w-6xl px-6">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-brown">Hệ thống cơ sở</p>
            <h2 className="mt-2 text-2xl font-bold text-brand-green">Cơ sở thuộc lĩnh vực {program.name}</h2>
          </Reveal>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {facilities.map((facility, i) => (
              <Reveal key={facility.id} delay={i * 70} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
                <FacilityCard facility={facility} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {otherPrograms.length > 0 && (
        <section className="bg-brand-cream px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-brown">Hệ sinh thái Hiển Linh</p>
              <h2 className="mt-2 text-2xl font-bold text-brand-green">Các lĩnh vực khác</h2>
            </Reveal>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {otherPrograms.map((p, i) => {
                const Icon = PROGRAM_ICONS[p.slug] ?? LeafIcon;
                return (
                  <Reveal key={p.id} delay={i * 60} className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]">
                    <Link
                      href={`/hoat-dong/${p.slug}`}
                      className="group flex h-full items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-green/15"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green text-white transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="flex-1 font-semibold text-brand-green">{p.name}</span>
                      <span className="text-brand-green transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
