"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MAIN_NAV, SITE } from "@/lib/site-config";
import { HeartIcon, SearchIcon } from "./icons";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const menuOpen = openPath === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white/90 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "border-black/5 shadow-md" : "border-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 transition-all duration-300 ${
          scrolled ? "py-1.5" : "py-3"
        }`}
      >
        <Link href="/" className="transition-transform hover:scale-[1.03]">
          <Image
            src="/brand/logo.webp"
            alt={SITE.fullName}
            width={160}
            height={74}
            priority
            className={`w-auto transition-all duration-300 ${scrolled ? "h-9" : "h-11"}`}
          />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-700 lg:flex">
          {MAIN_NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-1 transition-colors hover:text-brand-green after:absolute after:bottom-0 after:left-0 after:h-[2px] after:rounded-full after:bg-brand-green after:transition-all after:duration-300 hover:after:w-full ${
                  active ? "text-brand-green after:w-full" : "after:w-0"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/tim-kiem"
            aria-label="Tìm kiếm"
            className="text-zinc-500 transition-transform hover:scale-110 hover:text-brand-green"
          >
            <SearchIcon className="h-5 w-5" />
          </Link>
          <Link
            href="/tham-gia#quyen-gop"
            className="flex items-center gap-1.5 rounded-full bg-brand-orange px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:bg-brand-orange-dark hover:shadow-lg hover:shadow-brand-orange/30"
          >
            <HeartIcon className="h-3.5 w-3.5" />
            Quyên Góp
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={menuOpen}
            onClick={() => setOpenPath(menuOpen ? null : pathname)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-700 hover:bg-zinc-100 lg:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>
      <nav
        className={`overflow-hidden border-t border-black/5 bg-white transition-all duration-300 lg:hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <ul className="mx-auto max-w-7xl px-6 py-2">
          {MAIN_NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active ? "bg-brand-green/10 text-brand-green" : "text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
