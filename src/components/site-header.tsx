import Link from "next/link";
import { MAIN_NAV, SITE } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-lg font-bold tracking-tight text-brand-green-dark">
            {SITE.name.toUpperCase()}
          </span>
          <span className="text-[11px] text-zinc-500">{SITE.tagline}</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-700 lg:flex">
          {MAIN_NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brand-green">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/tham-gia#quyen-gop"
          className="shrink-0 rounded-full bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orange-dark"
        >
          ♥ Quyên Góp
        </Link>
      </div>
    </header>
  );
}
