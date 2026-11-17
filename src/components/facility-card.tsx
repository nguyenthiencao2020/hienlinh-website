import Image from "@/components/fade-image";
import Link from "next/link";
import { MapPinIcon } from "@/components/icons";
import { FACILITY_FALLBACK_IMAGES } from "@/lib/facility-images";
import { shortAddress } from "@/lib/maps";
import type { Facility } from "@/lib/types";

export function facilityCover(f: Facility) {
  return f.cover_image_url || FACILITY_FALLBACK_IMAGES[f.slug] || "/images/hero-page.webp";
}

// Thẻ cơ sở dùng chung cho mọi trang: ảnh phủ kín, tên + địa chỉ đặt trên ảnh
// nên mọi thẻ luôn cao bằng nhau dù có hay không có địa chỉ.
export function FacilityCard({ facility, programName }: { facility: Facility; programName?: string }) {
  const addressLine = shortAddress(facility.address);
  return (
    <Link
      href={`/co-so/${facility.slug}`}
      className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-200 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-green/20"
    >
      <Image
        src={facilityCover(facility)}
        alt={facility.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300" />
      {programName && (
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-green shadow-sm backdrop-blur">
          {programName}
        </span>
      )}
      <span className="absolute right-4 top-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-brand-orange text-white opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        →
      </span>
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <p className="text-lg font-semibold leading-snug">{facility.name}</p>
        {addressLine && (
          <p className="mt-1.5 flex items-start gap-1.5 text-sm text-white/80">
            <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="line-clamp-1">{addressLine}</span>
          </p>
        )}
      </div>
    </Link>
  );
}
