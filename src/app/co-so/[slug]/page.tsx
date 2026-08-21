import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { createClient } from "@/lib/supabase/server";
import { FACILITY_FALLBACK_IMAGES } from "@/lib/facility-images";
import type { Facility, Program } from "@/lib/types";

export const revalidate = 60;

export default async function FacilityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: facility } = await supabase
    .from("facilities")
    .select("*")
    .eq("slug", slug)
    .maybeSingle<Facility>();

  if (!facility) notFound();

  const program = facility.program_slug
    ? (
        await supabase
          .from("programs")
          .select("*")
          .eq("slug", facility.program_slug)
          .maybeSingle<Program>()
      ).data
    : null;

  const image =
    facility.cover_image_url || FACILITY_FALLBACK_IMAGES[facility.slug] || "/images/hero-page.webp";

  return (
    <div>
      <PageHero title={facility.name} crumbLabel={`Cơ Sở / ${facility.name}`} imageSrc={image} />

      <Reveal className="mx-auto block max-w-3xl px-6 py-16">
        <article>
          {facility.address && <p className="text-sm text-zinc-500">📍 {facility.address}</p>}
          {facility.description ? (
            <div className="prose prose-zinc mt-4 whitespace-pre-wrap">{facility.description}</div>
          ) : (
            <p className="mt-4 text-zinc-600">Nội dung giới thiệu chi tiết sẽ được cập nhật sau.</p>
          )}
          {program && (
            <Link
              href={`/hoat-dong/${program.slug}`}
              className="mt-8 inline-block rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-brand-orange-dark hover:shadow-lg"
            >
              Thuộc lĩnh vực {program.name} →
            </Link>
          )}
        </article>
      </Reveal>

      <Reveal className="relative mx-auto mb-16 block aspect-[16/7] max-w-5xl overflow-hidden rounded-2xl">
        <Image src={image} alt={facility.name} fill className="object-cover" sizes="100vw" />
      </Reveal>
    </div>
  );
}
