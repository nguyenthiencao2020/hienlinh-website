import Link from "next/link";

const NAV = [
  { href: "/", label: "Trang chủ" },
  { href: "/about", label: "Về chúng tôi" },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/lien-he", label: "Liên hệ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-amber-900">
          DNXH Hiển Linh
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-zinc-700">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-amber-900">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/lien-he"
          className="rounded-full bg-amber-800 px-4 py-2 text-sm font-medium text-white hover:bg-amber-900"
        >
          Đăng ký thiện nguyện
        </Link>
      </div>
    </header>
  );
}
