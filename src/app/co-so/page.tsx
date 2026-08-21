import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { createClient } from "@/lib/supabase/server";
import { FACILITY_FALLBACK_IMAGES } from "@/lib/facility-images";
import type { Facility } from "@/lib/types";

export const revalidate = 60;

export default async function FacilitiesPage() {
  const supabase = await createClient();
  const { data: facilities } = await supabase
    .from("facilities")
    .select("*")
    .order("sort_order", { ascending: true })
    .returns<Facility[]>();

  return (
    <div>
      <PageHero title="Các Cơ Sở Của Chúng Tôi" crumbLabel="Cơ Sở" />

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              <div className="p-5">
                <h2 className="font-semibold text-brand-green-dark">{facility.name}</h2>
                {facility.description && (
                  <p className="mt-2 text-sm text-zinc-600 line-clamp-2">
                    {facility.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
          {!facilities?.length && (
            <p className="text-sm text-zinc-500">
              Chưa có dữ liệu — cấu hình Supabase để hiển thị danh sách cơ sở.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
