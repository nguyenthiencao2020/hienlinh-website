import Link from "next/link";
import { FOOTER_LINKS, SITE } from "@/lib/site-config";
import { NewsletterForm } from "./newsletter-form";

export function SiteFooter() {
  return (
    <footer className="bg-brand-green-dark text-zinc-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-white">{SITE.name.toUpperCase()}</p>
          <p className="text-xs text-zinc-400">{SITE.tagline}</p>
          <p className="mt-4 text-sm text-zinc-400">
            Hiển Linh hoạt động vì một cộng đồng nhân ái, chung tay mang đến cuộc
            sống tốt đẹp hơn cho trẻ em và những người yếu thế.
          </p>
          <div className="mt-4 flex gap-3 text-sm">
            <a href={SITE.socials.facebook} className="hover:text-white">Facebook</a>
            <a href={SITE.socials.youtube} className="hover:text-white">YouTube</a>
            <a href={SITE.socials.zalo} className="hover:text-white">Zalo</a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white">
            Liên kết nhanh
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  › {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white">
            Thông tin liên hệ
          </p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-400">
            <li>{SITE.address}</li>
            <li>{SITE.phone}</li>
            <li>{SITE.email}</li>
            <li>{SITE.website}</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white">
            Đăng ký nhận tin
          </p>
          <p className="mt-4 text-sm text-zinc-400">
            Đăng ký để nhận thông tin về các chương trình và hoạt động mới nhất từ
            Hiển Linh.
          </p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} {SITE.fullName}. Mọi quyền được bảo lưu.
      </div>
    </footer>
  );
}
