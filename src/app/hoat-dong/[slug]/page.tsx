import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { createClient } from "@/lib/supabase/server";
import { PROGRAM_FALLBACK_IMAGES } from "@/lib/program-images";
import { FACILITY_FALLBACK_IMAGES } from "@/lib/facility-images";
import type { Facility, Program } from "@/lib/types";

export const revalidate = 60;

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
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
            <div className="prose prose-zinc mt-8 whitespace-pre-wrap">{program.content}</div>
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
        <section className="mx-auto mb-16 max-w-5xl px-6">
          <Reveal>
            <h2 className="text-xl font-bold text-brand-green-dark">Cơ sở liên quan</h2>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility, i) => (
              <Reveal key={facility.id} delay={i * 70}>
                <Link
                  href={`/co-so/${facility.slug}`}
                  className="group block overflow-hidden rounded-xl border border-zinc-200 transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/50 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={
                        facility.cover_image_url ||
                        FACILITY_FALLBACK_IMAGES[facility.slug] ||
                        "/images/hero-page.webp"
                      }
                      alt={facility.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(min-width: 1024px) 33vw, 50vw"
                    />
                  </div>
                  <p className="p-3 text-sm font-medium text-brand-green-dark">{facility.name}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
