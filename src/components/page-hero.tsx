import Image from "next/image";
import Link from "next/link";

export function PageHero({
  title,
  subtitle,
  crumbLabel,
  imageSrc = "/images/hero-page.webp",
}: {
  title: string;
  subtitle?: string;
  crumbLabel: string;
  imageSrc?: string;
}) {
  return (
    <div className="relative h-64 overflow-hidden sm:h-72">
      <Image
        src={imageSrc}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative mx-auto flex h-full max-w-7xl flex-col items-start justify-center px-6 text-white">
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 text-white/90">{subtitle}</p>}
        <p className="mt-4 text-sm text-white/80">
          <Link href="/" className="hover:underline">
            Trang Chủ
          </Link>{" "}
          / {crumbLabel}
        </p>
      </div>
    </div>
  );
}
