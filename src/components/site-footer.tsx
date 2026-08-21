import Image from "next/image";
import Link from "next/link";
import { FOOTER_LINKS, SITE } from "@/lib/site-config";
import { NewsletterForm } from "./newsletter-form";
import { LeafyBackground } from "./leafy-background";
import {
  FacebookIcon,
  GlobeIcon,
  LeafIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  YoutubeIcon,
  ZaloIcon,
} from "./icons";

const SOCIALS = [
  { href: SITE.socials.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: SITE.socials.youtube, label: "YouTube", Icon: YoutubeIcon },
  { href: SITE.socials.zalo, label: "Zalo", Icon: ZaloIcon },
];

export function SiteFooter() {
  return (
    <footer className="relative text-zinc-300">
      <LeafyBackground />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src="/brand/logo-white.webp" alt={SITE.fullName} width={160} height={74} className="h-auto w-40" />
          <p className="mt-3 text-sm font-medium text-amber-300">Nơi Ánh Sáng Chạm Trái Tim</p>
          <p className="mt-4 text-sm text-zinc-300/80">
            Hiển Linh là nơi kết nối những tấm lòng thiện nguyện để cùng nhau lan
            tỏa yêu thương và tạo nên tác động tích cực bền vững.
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white">
            <LeafIcon className="h-4 w-4 text-amber-300" />
            Liên kết nhanh
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="flex items-center gap-1 hover:text-white">
                  <span className="text-amber-300">›</span> {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white">
            <PhoneIcon className="h-4 w-4 text-amber-300" />
            Thông tin liên hệ
          </p>
          <ul className="mt-4 space-y-3 text-sm text-zinc-300/80">
            <li className="flex items-start gap-2">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
              {SITE.address}
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 shrink-0 text-amber-300" />
              {SITE.phone}
            </li>
            <li className="flex items-center gap-2">
              <MailIcon className="h-4 w-4 shrink-0 text-amber-300" />
              {SITE.email}
            </li>
            <li className="flex items-center gap-2">
              <GlobeIcon className="h-4 w-4 shrink-0 text-amber-300" />
              {SITE.website}
            </li>
          </ul>
        </div>

        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white">
            <MailIcon className="h-4 w-4 text-amber-300" />
            Đăng ký nhận tin
          </p>
          <p className="mt-4 text-sm text-zinc-300/80">
            Đăng ký để nhận những tin tức mới nhất và cùng Hiển Linh lan tỏa những
            điều tử tế.
          </p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </div>
      </div>
      <div className="relative border-t border-white/10 py-4 text-center text-xs text-zinc-400">
        © {new Date().getFullYear()} {SITE.fullName}. Mọi quyền được bảo lưu.
      </div>
    </footer>
  );
}
