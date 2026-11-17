import { Suspense } from "react";
import Image from "@/components/fade-image";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { HeartIcon, UsersIcon } from "@/components/icons";
import { createPublicClient } from "@/lib/supabase/public";
import type { Partner, Program } from "@/lib/types";
import { VolunteerForm } from "./volunteer-form";
import { DonationForm } from "./donation-form";

export const metadata = { title: "Tham Gia" };

export const revalidate = 60;

const ACTIVITIES = [
  "Hỗ trợ học tập, kèm cặp các em nhỏ",
  "Chăm sóc sức khỏe, hỗ trợ y tế cộng đồng",
  "Tổ chức hoạt động thiện nguyện, gây quỹ",
  "Tham gia các chương trình tư vấn, hỗ trợ tâm lý",
  "Và nhiều hoạt động ý nghĩa khác",
];

const WAYS = [
  { href: "#tinh-nguyen", Icon: UsersIcon, label: "Tình nguyện", value: "Trở thành tình nguyện viên", action: "Đăng ký" },
  { href: "#quyen-gop", Icon: HeartIcon, label: "Ủng hộ", value: "Quyên góp / Ủng hộ", action: "Đóng góp" },
];

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function JoinPage() {
  const supabase = createPublicClient();
  const [{ data: partners }, { data: programs }] = await Promise.all([
    supabase.from("partners").select("*").order("sort_order", { ascending: true }).returns<Partner[]>(),
    supabase.from("programs").select("slug, name").order("sort_order", { ascending: true }).returns<Pick<Program, "slug" | "name">[]>(),
  ]);
  const areas = programs ?? [];

  return (
    <div>
      <PageHero
        title="Tham Gia Cùng Chúng Tôi"
        subtitle="Cùng chúng tôi thắp sáng hy vọng"
        crumbs={[{ label: "Tham Gia" }]}
      />

      {/* 2 cách tham gia: cùng kiểu dải với trang Liên Hệ */}
      <section className="relative z-10 -mt-10 px-6">
        <Reveal className="mx-auto block max-w-4xl">
          <div className="grid overflow-hidden rounded-2xl bg-white shadow-xl shadow-zinc-900/10 ring-1 ring-zinc-200/70 sm:grid-cols-2 sm:divide-x sm:divide-zinc-100 max-sm:divide-y max-sm:divide-zinc-100">
            {WAYS.map(({ href, Icon, label, value, action }) => (
              <a key={href} href={href} className="group flex items-center gap-4 px-6 py-5 transition-colors duration-300 hover:bg-brand-cream/60">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green transition-all duration-300 group-hover:bg-brand-green group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-medium uppercase tracking-wide text-zinc-400">{label}</span>
                  <span className="mt-0.5 block text-[15px] font-semibold text-zinc-800">{value}</span>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-brand-orange">
                    {action}
                    <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
                  </span>
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Tình nguyện */}
      <section id="tinh-nguyen" className="relative scroll-mt-24 overflow-hidden px-6 py-16 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-brand-green/5 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-brown">Tình nguyện</p>
            <h2 className="mt-2 text-2xl font-bold text-brand-green sm:text-3xl">Trở Thành Tình Nguyện Viên</h2>
            <p className="mt-4 text-justify leading-relaxed text-zinc-600">
              Tham gia tình nguyện cùng Hiển Linh là cơ hội để bạn lan tỏa yêu thương, phát huy trách nhiệm xã hội và
              góp phần tạo nên những thay đổi tích cực cho cộng đồng.
            </p>
            <p className="mt-6 text-sm font-semibold text-zinc-800">Bạn có thể tham gia các hoạt động:</p>
            <ul className="mt-3 space-y-3">
              {ACTIVITIES.map((a) => (
                <li key={a} className="flex items-start gap-3 text-zinc-600">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="rounded-2xl bg-white p-6 shadow-lg shadow-zinc-900/5 ring-1 ring-zinc-200 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                <UsersIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-brown">Đăng ký trực tuyến</p>
                <h3 className="text-xl font-bold text-brand-green">Đăng Ký Tình Nguyện Viên</h3>
              </div>
            </div>
            <div className="mt-6">
              <Suspense>
                <VolunteerForm areas={areas} />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quyên góp */}
      <section id="quyen-gop" className="relative scroll-mt-24 overflow-hidden bg-brand-cream px-6 py-16 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-brown">Ủng hộ</p>
            <h2 className="mt-2 text-2xl font-bold text-brand-green sm:text-3xl">Quyên Góp / Ủng Hộ</h2>
            <p className="mt-4 text-justify leading-relaxed text-zinc-600">
              Mỗi sự đóng góp, dù nhỏ bé, đều mang lại những thay đổi lớn lao cho cuộc sống của các em nhỏ và cộng đồng
              có hoàn cảnh khó khăn.
            </p>
            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-white/70 p-5 text-sm text-zinc-600 ring-1 ring-black/5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange text-white">
                <HeartIcon className="h-4 w-4" />
              </span>
              <p>
                Sau khi bạn gửi thông tin, Hiển Linh sẽ liên hệ lại để xác nhận và hướng dẫn cách đóng góp.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} className="rounded-2xl bg-white p-6 shadow-lg shadow-zinc-900/5 ring-1 ring-zinc-200 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                <HeartIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-brown">Đăng ký ủng hộ</p>
                <h3 className="text-xl font-bold text-brand-green">Thông Tin Ủng Hộ</h3>
              </div>
            </div>
            <div className="mt-6">
              <DonationForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Đối tác: chỉ hiện khi đã có dữ liệu thật */}
      {!!partners?.length && (
        <section className="px-6 py-16">
          <Reveal className="mx-auto block max-w-6xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-brown">Đồng hành cùng Hiển Linh</p>
            <h2 className="mt-2 text-2xl font-bold text-brand-green">Đối Tác &amp; Tài Trợ</h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
              {partners.map((partner) => {
                const logo = partner.logo_url ? (
                  <Image src={partner.logo_url} alt={partner.name} fill className="object-contain" sizes="128px" />
                ) : (
                  <span className="flex h-full items-center justify-center text-sm font-semibold text-zinc-600">{partner.name}</span>
                );
                return partner.website_url ? (
                  <a
                    key={partner.id}
                    href={partner.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={partner.name}
                    className="relative h-16 w-32 grayscale transition-all duration-300 hover:scale-110 hover:grayscale-0"
                  >
                    {logo}
                  </a>
                ) : (
                  <div key={partner.id} title={partner.name} className="relative h-16 w-32">
                    {logo}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </section>
      )}
    </div>
  );
}
