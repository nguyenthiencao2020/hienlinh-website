import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { createClient } from "@/lib/supabase/server";
import { PROGRAM_FALLBACK_IMAGES } from "@/lib/program-images";
import { FACILITY_FALLBACK_IMAGES } from "@/lib/facility-images";
import type { Facility, Program } from "@/lib/types";

export const revalidate = 60;

export default async function ProgramsPage() {
  const supabase = await createClient();
  const [{ data: programs }, { data: facilities }] = await Promise.all([
    supabase.from("programs").select("*").order("sort_order", { ascending: true }).returns<Program[]>(),
    supabase.from("facilities").select("*").order("sort_order", { ascending: true }).returns<Facility[]>(),
  ]);

  return (
    <div>
      <PageHero title="Lĩnh Vực Hoạt Động" crumbLabel="Hoạt Động" />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-xl font-bold text-brand-green-dark">Các lĩnh vực hoạt động</h2>
          </Reveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(programs ?? []).map((program, i) => (
              <Reveal
                key={program.id}
                delay={i * 80}
                className="flex h-full items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={
                      program.cover_image_url ||
                      PROGRAM_FALLBACK_IMAGES[program.slug] ||
                      "/images/hero-page.webp"
                    }
                    alt={program.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-brand-green-dark">{program.name}</h3>
                  <p className="mt-2 text-sm text-zinc-600">{program.summary}</p>
                  <Link
                    href={`/hoat-dong/${program.slug}`}
                    className="mt-3 inline-block rounded-full bg-brand-orange px-4 py-1.5 text-xs font-semibold text-white transition-transform duration-300 hover:scale-105 hover:bg-brand-orange-dark"
                  >
                    Xem chi tiết →
                  </Link>
                </div>
              </Reveal>
            ))}
            {!programs?.length && (
              <p className="text-sm text-zinc-500">
                Chưa có dữ liệu — cấu hình Supabase để hiển thị các mảng hoạt động.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-xl font-bold text-brand-green-dark">Các cơ sở của chúng tôi</h2>
          </Reveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(facilities ?? []).map((facility, i) => (
              <Reveal key={facility.id} delay={i * 60}>
                <Link
                  href={`/co-so/${facility.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/50 hover:shadow-lg"
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
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <p className="p-4 text-sm font-semibold text-brand-green-dark">{facility.name}</p>
                </Link>
              </Reveal>
            ))}
            {!facilities?.length && (
              <p className="text-sm text-zinc-500">
                Chưa có dữ liệu — cấu hình Supabase để hiển thị danh sách cơ sở.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
