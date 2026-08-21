"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MAIN_NAV, SITE } from "@/lib/site-config";
import { HeartIcon, SearchIcon } from "./icons";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white/90 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "border-black/5 shadow-md" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="transition-transform hover:scale-[1.03]">
          <Image src="/brand/logo.webp" alt={SITE.fullName} width={160} height={74} priority className="h-11 w-auto" />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-700 lg:flex">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative py-1 transition-colors hover:text-brand-green after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-brand-green after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
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
            className="flex items-center gap-1.5 rounded-full bg-brand-brown px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:bg-brand-brown-dark hover:shadow-lg hover:shadow-brand-brown/30"
          >
            <HeartIcon className="h-3.5 w-3.5" />
            Quyên Góp
          </Link>
        </div>
      </div>
    </header>
  );
}
