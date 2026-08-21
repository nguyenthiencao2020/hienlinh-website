import Image from "next/image";
import Link from "next/link";
import { MAIN_NAV, SITE } from "@/lib/site-config";
import { HeartIcon, SearchIcon } from "./icons";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/">
          <Image src="/brand/logo.webp" alt={SITE.fullName} width={160} height={74} priority className="h-11 w-auto" />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-700 lg:flex">
          {MAIN_NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brand-green">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/tim-kiem"
            aria-label="Tìm kiếm"
            className="text-zinc-500 hover:text-brand-green"
          >
            <SearchIcon className="h-5 w-5" />
          </Link>
          <Link
            href="/tham-gia#quyen-gop"
            className="flex items-center gap-1.5 rounded-full bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orange-dark"
          >
            <HeartIcon className="h-3.5 w-3.5" />
            Quyên Góp
          </Link>
        </div>
      </div>
    </header>
  );
}
