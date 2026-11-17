import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { FacebookIcon, MailIcon, MapPinIcon, PhoneIcon, SendIcon, YoutubeIcon } from "@/components/icons";
import { createPublicClient } from "@/lib/supabase/public";
import { mapsSearchUrl } from "@/lib/maps";
import { FacilityCard } from "@/components/facility-card";
import { SITE } from "@/lib/site-config";
import type { Facility, Program } from "@/lib/types";
import { ContactForm } from "./contact-form";

export const metadata = { title: "Liên Hệ" };
export const revalidate = 60;

const socials = [
  { href: SITE.socials.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: SITE.socials.youtube, label: "YouTube", Icon: YoutubeIcon },
].filter((s) => s.href);

const CHANNELS = [
  {
    Icon: MapPinIcon,
    label: "Địa chỉ trụ sở",
    value: SITE.address,
    href: mapsSearchUrl(SITE.address),
    action: "Chỉ đường",
    external: true,
  },
  {
    Icon: PhoneIcon,
    label: "Điện thoại",
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/\s/g, "")}`,
    action: "Gọi ngay",
  },
  {
    Icon: MailIcon,
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    action: "Gửi email",
  },
];

export default async function ContactPage() {
  const supabase = createPublicClient();
  const [{ data: facilities }, { data: programs }] = await Promise.all([
    supabase.from("facilities").select("*").order("sort_order", { ascending: true }).returns<Facility[]>(),
    supabase.from("programs").select("*").order("sort_order", { ascending: true }).returns<Program[]>(),
  ]);
  const programOf = (f: Facility) => programs?.find((p) => p.slug === f.program_slug);

  return (
    <div>
      <PageHero title="Liên Hệ" crumbs={[{ label: "Liên Hệ" }]} />

      {/* Kênh liên hệ: một dải thống nhất, 3 cột */}
      <section className="relative z-10 -mt-10 px-6">
        <Reveal className="mx-auto block max-w-6xl">
          <div className="grid overflow-hidden rounded-2xl bg-white shadow-xl shadow-zinc-900/10 ring-1 ring-zinc-200/70 md:grid-cols-3 md:divide-x md:divide-zinc-100 max-md:divide-y max-md:divide-zinc-100">
            {CHANNELS.map(({ Icon, label, value, href, action, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-4 px-6 py-5 transition-colors duration-300 hover:bg-brand-cream/60"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green transition-all duration-300 group-hover:bg-brand-green group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-medium uppercase tracking-wide text-zinc-400">{label}</span>
                  <span className="mt-0.5 block text-[15px] font-semibold leading-snug text-zinc-800">{value}</span>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-brand-orange">
                    {action}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Form + bản đồ */}
      <section className="relative overflow-hidden px-6 py-16 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-brand-green/5 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="rounded-2xl bg-white p-6 shadow-lg shadow-zinc-900/5 ring-1 ring-zinc-200 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                <SendIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-brown">Liên hệ trực tuyến</p>
                <h2 className="text-xl font-bold text-brand-green sm:text-2xl">Gửi Tin Nhắn Cho Chúng Tôi</h2>
              </div>
            </div>
            <div className="mt-6">
              <ContactForm />
            </div>
            {socials.length > 0 && (
              <div className="mt-6 flex items-center gap-3 border-t border-zinc-100 pt-5 text-sm text-zinc-500">
                Theo dõi Hiển Linh:
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange text-white transition-transform hover:scale-110"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </Reveal>

          <Reveal delay={120} className="flex min-h-[420px] flex-col overflow-hidden rounded-2xl bg-white shadow-lg shadow-zinc-900/5 ring-1 ring-zinc-200">
            <iframe
              title={`Bản đồ trụ sở ${SITE.fullName}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.address)}&output=embed`}
              className="min-h-[320px] w-full flex-1"
              loading="lazy"
            />
            <div className="flex items-start gap-3 bg-gradient-to-br from-brand-green to-brand-green-dark p-5 text-white">
              <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0" />
              <div className="text-sm">
                <p className="font-semibold">Trụ sở {SITE.fullName}</p>
                <p className="mt-0.5 text-white/80">{SITE.address}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Hệ thống cơ sở */}
      {!!facilities?.length && (
        <section className="bg-brand-cream px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <Reveal className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-brown">Hệ thống cơ sở</p>
                <h2 className="mt-2 text-2xl font-bold text-brand-green">Các cơ sở của Hiển Linh</h2>
              </div>
              <Link href="/hoat-dong" className="hidden shrink-0 text-sm font-medium text-brand-green hover:underline sm:block">
                Xem tất cả →
              </Link>
            </Reveal>
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              {facilities.map((f, i) => (
                <Reveal key={f.id} delay={(i % 3) * 60} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
                  <FacilityCard facility={f} programName={programOf(f)?.name} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
