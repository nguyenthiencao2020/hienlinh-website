import Image from "@/components/fade-image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { HeartIcon, LeafIcon, MapPinIcon } from "@/components/icons";
import { createPublicClient } from "@/lib/supabase/public";
import { FacilityCard, facilityCover } from "@/components/facility-card";
import { parseLocations } from "@/lib/maps";
import { PROGRAM_FALLBACK_IMAGES, PROGRAM_ICONS } from "@/lib/program-images";
import type { Facility, Program } from "@/lib/types";

export const revalidate = 60;

// Không render sẵn lúc build; mỗi slug được render ở lượt truy cập đầu rồi cache (ISR).
export function generateStaticParams() {
  return [];
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
  const locations = parseLocations(facility.address);

  return (
    <div>
      <section className="relative flex min-h-[460px] items-end overflow-hidden sm:min-h-[540px]">
        <Image
          src={facilityCover(facility)}
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
          {locations.length > 0 && (
            <ul
              className="reveal is-visible mt-4 space-y-1.5 text-white/85"
              style={{ animationDelay: "240ms" }}
            >
              {locations.map((loc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>
                    {loc.label && <strong className="font-semibold text-white">{loc.label}: </strong>}
                    {loc.address}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-16 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-brand-green/5 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
          <div>
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-brown">Giới thiệu</p>
              <h2 className="mt-2 text-2xl font-bold text-brand-green sm:text-3xl">Về {facility.name}</h2>
            </Reveal>
            {lead ? (
              <>
                <Reveal delay={80}>
                  <blockquote className="relative mt-8 overflow-hidden rounded-2xl bg-brand-cream p-6 pl-8 sm:p-8 sm:pl-10">
                    <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-brand-green to-brand-orange" />
                    <span aria-hidden className="absolute -top-6 right-4 select-none font-serif text-[120px] leading-none text-brand-orange/15">
                      &ldquo;
                    </span>
                    <p className="relative text-justify text-lg leading-relaxed text-zinc-800 sm:text-xl">{lead}</p>
                  </blockquote>
                </Reveal>
                {rest.length > 0 && (
                  <Reveal delay={120} className="mt-8 block space-y-5 text-justify leading-relaxed text-zinc-600">
                    {rest.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </Reveal>
                )}
              </>
            ) : (
              <Reveal className="mt-8 block rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center">
                <LeafIcon className="mx-auto h-8 w-8 text-brand-green/60" />
                <p className="mt-3 text-zinc-600">Nội dung giới thiệu chi tiết sẽ được cập nhật sau.</p>
              </Reveal>
            )}

            {program && (
              <Reveal delay={160}>
                <Link
                  href={`/hoat-dong/${program.slug}`}
                  className="group mt-10 flex overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-green/15"
                >
                  <div className="relative w-1/3 shrink-0 overflow-hidden sm:w-2/5">
                    <Image
                      src={program.cover_image_url || PROGRAM_FALLBACK_IMAGES[program.slug] || "/images/hero-page.webp"}
                      alt={program.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(min-width: 640px) 280px, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center gap-2 p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-brown">Thuộc lĩnh vực</p>
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
                        <ProgramIcon className="h-5 w-5" />
                      </span>
                      <p className="text-lg font-semibold text-brand-green">{program.name}</p>
                    </div>
                    {program.summary && <p className="line-clamp-3 text-sm text-zinc-600">{program.summary}</p>}
                    <span className="mt-1 inline-flex w-fit items-center gap-1 text-sm font-semibold text-brand-green">
                      Tìm hiểu lĩnh vực
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            )}
          </div>

          <Reveal delay={120}>
            <aside className="overflow-hidden rounded-2xl bg-white shadow-lg shadow-zinc-900/5 ring-1 ring-zinc-200 lg:sticky lg:top-24">
              <div className="bg-gradient-to-br from-brand-green to-brand-green-dark px-6 py-5 text-white">
                <p className="text-xs uppercase tracking-wide text-white/70">Thông tin cơ sở</p>
                <p className="mt-1 text-lg font-semibold leading-snug">{facility.name}</p>
              </div>
              <div className="space-y-5 p-6">
                {program && (
                  <div className="flex gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                      <ProgramIcon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-zinc-400">Lĩnh vực</p>
                      <Link href={`/hoat-dong/${program.slug}`} className="font-medium text-zinc-800 hover:text-brand-green">
                        {program.name}
                      </Link>
                    </div>
                  </div>
                )}
                {locations.length > 0 && (
                  <div className="flex gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                      <MapPinIcon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs uppercase tracking-wide text-zinc-400">
                        {locations.length > 1 ? `Địa chỉ (${locations.length} cơ sở)` : "Địa chỉ"}
                      </p>
                      <ul className="mt-1 space-y-3">
                        {locations.map((loc, i) => (
                          <li key={i} className={locations.length > 1 ? "rounded-xl bg-zinc-50 p-3" : ""}>
                            {loc.label && <p className="text-sm font-semibold text-brand-green">{loc.label}</p>}
                            <p className="text-sm text-zinc-700">{loc.address}</p>
                            <a
                              href={loc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1.5 inline-flex items-center gap-1 text-sm font-medium text-brand-orange hover:underline"
                            >
                              Xem bản đồ{loc.label ? ` ${loc.label.toLowerCase()}` : ""} ↗
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                <div className="space-y-2.5 border-t border-zinc-100 pt-5">
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
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              {related.map((f, i) => (
                <Reveal key={f.id} delay={i * 80} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
                  <FacilityCard facility={f} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
