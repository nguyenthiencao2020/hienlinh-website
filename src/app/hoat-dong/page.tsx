import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { createClient } from "@/lib/supabase/server";
import { PROGRAM_FALLBACK_IMAGES } from "@/lib/program-images";
import type { Program } from "@/lib/types";

export const revalidate = 60;

export default async function ProgramsPage() {
  const supabase = await createClient();
  const { data: programs } = await supabase
    .from("programs")
    .select("*")
    .order("sort_order", { ascending: true })
    .returns<Program[]>();

  return (
    <div>
      <PageHero title="Lĩnh Vực Hoạt Động" crumbLabel="Hoạt Động" />

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                <h2 className="text-lg font-semibold text-brand-green-dark">{program.name}</h2>
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
      </section>
    </div>
  );
}
