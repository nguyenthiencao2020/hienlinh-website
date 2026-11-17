import Image from "@/components/fade-image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { HeartIcon, LeafIcon, MapPinIcon } from "@/components/icons";
import { createPublicClient } from "@/lib/supabase/public";
import { FACILITY_FALLBACK_IMAGES } from "@/lib/facility-images";
import { PROGRAM_ICONS } from "@/lib/program-images";
import type { Facility, Program } from "@/lib/types";

export const revalidate = 60;

// Không render sẵn lúc build; mỗi slug được render ở lượt truy cập đầu rồi cache (ISR).
export function generateStaticParams() {
  return [];
}

function coverOf(f: Facility) {
  return f.cover_image_url || FACILITY_FALLBACK_IMAGES[f.slug] || "/images/hero-page.webp";
}

export default async function FacilityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = createPublicClient();
  const { data: facility } = await supabase
    .from("facilities")
    .select("*")
    .eq("slug", slug)
    .maybeSingle<Facility>();

  if (!facility) notFound();

  const [{ data: program }, { data: others }] = await Promise.all([
    facility.program_slug
      ? supabase.from("programs").select("*").eq("slug", facility.program_slug).maybeSingle<Program>()
      : Promise.resolve({ data: null }),
    supabase
      .from("facilities")
      .select("*")
      .neq("id", facility.id)
      .order("sort_order", { ascending: true })
      .returns<Facility[]>(),
  ]);

  const isSameProgram = (f: Facility) => !!f.program_slug && f.program_slug === facility.program_slug;
  const pool = others ?? [];
  const related = [...pool.filter(isSameProgram), ...pool.filter((f) => !isSameProgram(f))].slice(0, 3);
  const allSameProgram = related.length > 0 && related.every(isSameProgram);

  const paragraphs = facility.description
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const [lead, ...rest] = paragraphs;
  const ProgramIcon = (program && PROGRAM_ICONS[program.slug]) || LeafIcon;
  const mapUrl = facility.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(facility.address)}`
    : null;

  return (
    <div>
      <section className="relative flex min-h-[460px] items-end overflow-hidden sm:min-h-[540px]">
        <Image
          src={coverOf(facility)}
          alt={facility.name}
          fill
          priority
          className="animate-kenburns object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-12 pt-28 text-white">
          <p className="reveal is-visible text-sm text-white/75">
            <Link href="/" className="hover:underline">Trang Chủ</Link>
            {" / "}
            <Link href="/hoat-dong" className="hover:underline">Lĩnh Vực Hoạt Động</Link>
            {" / Cơ sở"}
          </p>
          {program && (
            <Link
              href={`/hoat-dong/${program.slug}`}
              className="reveal is-visible mt-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-sm font-medium backdrop-blur-md transition-colors hover:bg-white/25"
              style={{ animationDelay: "80ms" }}
            >
              <ProgramIcon className="h-4 w-4" />
              {program.name}
            </Link>
          )}
          <h1
            className="reveal is-visible mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl"
            style={{ animationDelay: "160ms" }}
          >
            {facility.name}
          </h1>
          {facility.address && (
            <p
              className="reveal is-visible mt-4 flex items-start gap-2 text-white/85"
              style={{ animationDelay: "240ms" }}
            >
              <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0" />
              {facility.address}
            </p>
          )}
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_340px] lg:gap-14">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-brown">Giới thiệu</p>
            {lead ? (
              <div className="mt-4 text-justify">
                <p className="text-lg leading-relaxed text-zinc-800">{lead}</p>
                {rest.map((p, i) => (
                  <p key={i} className="mt-5 leading-relaxed text-zinc-600">
                    {p}
                  </p>
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center">
                <LeafIcon className="mx-auto h-8 w-8 text-brand-green/60" />
                <p className="mt-3 text-zinc-600">Nội dung giới thiệu chi tiết sẽ được cập nhật sau.</p>
              </div>
            )}
          </Reveal>

          <Reveal delay={120}>
            <aside className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
              <p className="font-semibold text-brand-green">Thông tin cơ sở</p>
              <dl className="mt-4 space-y-4 text-sm">
                {program && (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-zinc-400">Lĩnh vực</dt>
                    <dd className="mt-1">
                      <Link
                        href={`/hoat-dong/${program.slug}`}
                        className="inline-flex items-center gap-2 font-medium text-zinc-800 hover:text-brand-green"
                      >
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                          <ProgramIcon className="h-4 w-4" />
                        </span>
                        {program.name}
                      </Link>
                    </dd>
                  </div>
                )}
                {facility.address && (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-zinc-400">Địa chỉ</dt>
                    <dd className="mt-1 text-zinc-700">{facility.address}</dd>
                    {mapUrl && (
                      <a
                        href={mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-brand-green hover:underline"
                      >
                        <MapPinIcon className="h-4 w-4" />
                        Xem trên Google Maps
                      </a>
                    )}
                  </div>
                )}
              </dl>
              <div className="mt-6 space-y-2.5">
                <Link
                  href="/tham-gia"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-brand-orange-dark hover:shadow-lg hover:shadow-brand-orange/30"
                >
                  <HeartIcon className="h-4 w-4" />
                  Đồng hành cùng cơ sở
                </Link>
                <Link
                  href="/lien-he"
                  className="flex w-full items-center justify-center rounded-full border border-brand-green/30 px-5 py-3 text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green/5"
                >
                  Liên hệ
                </Link>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-brand-cream px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <Reveal className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-brown">Khám phá thêm</p>
                <h2 className="mt-2 text-2xl font-bold text-brand-green">
                  {allSameProgram && program ? `Cơ sở khác thuộc ${program.name}` : "Các cơ sở khác"}
                </h2>
              </div>
              <Link href="/hoat-dong" className="hidden shrink-0 text-sm font-medium text-brand-green hover:underline sm:block">
                Xem tất cả →
              </Link>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((f, i) => (
                <Reveal key={f.id} delay={i * 80}>
                  <Link
                    href={`/co-so/${f.slug}`}
                    className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-green/15"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={coverOf(f)}
                        alt={f.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                    <div className="p-5">
                      <p className="font-semibold text-brand-green">{f.name}</p>
                      {f.address && (
                        <p className="mt-1.5 flex items-start gap-1.5 text-sm text-zinc-500">
                          <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0" />
                          {f.address}
                        </p>
                      )}
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
