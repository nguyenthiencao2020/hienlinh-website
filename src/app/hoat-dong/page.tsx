import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { createClient } from "@/lib/supabase/server";
import { PROGRAM_FALLBACK_IMAGES, PROGRAM_ICONS } from "@/lib/program-images";
import { LeafIcon } from "@/components/icons";
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
            <h2 className="text-xl font-bold text-brand-green">Các lĩnh vực hoạt động</h2>
          </Reveal>
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            {(programs ?? []).map((program, i) => {
              const Icon = PROGRAM_ICONS[program.slug] ?? LeafIcon;
              return (
                <Reveal
                  key={program.id}
                  delay={i * 80}
                  className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                >
                  <Link
                    href={`/hoat-dong/${program.slug}`}
                    className="group flex h-full overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative w-2/5 shrink-0 overflow-hidden">
                      <Image
                        src={
                          program.cover_image_url ||
                          PROGRAM_FALLBACK_IMAGES[program.slug] ||
                          "/images/hero-page.webp"
                        }
                        alt={program.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(min-width: 1024px) 200px, (min-width: 640px) 30vw, 40vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-center gap-2 p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-brand-green">{program.name}</h3>
                      </div>
                      <p className="text-sm text-zinc-600">{program.summary}</p>
                      <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-brand-green px-4 py-1.5 text-xs font-semibold text-white transition-colors duration-300 group-hover:bg-brand-green-dark">
                        Xem chi tiết
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
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
            <h2 className="text-xl font-bold text-brand-green">Các cơ sở của chúng tôi</h2>
          </Reveal>
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            {(facilities ?? []).map((facility, i) => (
              <Reveal
                key={facility.id}
                delay={i * 60}
                className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              >
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
                  <p className="p-4 text-sm font-semibold text-brand-green">{facility.name}</p>
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
