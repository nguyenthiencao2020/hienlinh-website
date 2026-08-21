import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
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
          <h2 className="text-xl font-bold text-brand-green-dark">Các lĩnh vực hoạt động</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(programs ?? []).map((program) => (
              <div
                key={program.id}
                className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-6"
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
                    className="mt-3 inline-block rounded-full bg-brand-orange px-4 py-1.5 text-xs font-semibold text-white hover:bg-brand-orange-dark"
                  >
                    Xem chi tiết →
                  </Link>
                </div>
              </div>
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
          <h2 className="text-xl font-bold text-brand-green-dark">Các cơ sở của chúng tôi</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(facilities ?? []).map((facility) => (
              <Link
                key={facility.id}
                href={`/co-so/${facility.slug}`}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white hover:border-brand-orange/50"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={
                      facility.cover_image_url ||
                      FACILITY_FALLBACK_IMAGES[facility.slug] ||
                      "/images/hero-page.webp"
                    }
                    alt={facility.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <p className="p-4 text-sm font-semibold text-brand-green-dark">{facility.name}</p>
              </Link>
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
