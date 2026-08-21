import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site-config";
import { ContactForm } from "./contact-form";

export default function ContactPage() {
  const mapQuery = encodeURIComponent(SITE.address);

  return (
    <div>
      <PageHero title="Liên Hệ" crumbLabel="Liên Hệ" />

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
          <Reveal className="rounded-2xl border border-zinc-200 p-6 transition-shadow duration-300 hover:shadow-lg">
            <h2 className="text-lg font-bold text-brand-green-dark">Thông Tin Liên Hệ</h2>
            <ul className="mt-4 space-y-3 text-sm text-zinc-600">
              <li>Địa chỉ: {SITE.address}</li>
              <li>Điện thoại: {SITE.phone}</li>
              <li>Email: {SITE.email}</li>
            </ul>
            <p className="mt-4 text-sm text-zinc-600">
              Mạng xã hội:{" "}
              <a href={SITE.socials.facebook} className="text-brand-orange hover:underline">Facebook</a>,{" "}
              <a href={SITE.socials.youtube} className="text-brand-orange hover:underline">YouTube</a>
            </p>
          </Reveal>
          <Reveal delay={150} className="rounded-2xl border border-zinc-200 p-6 transition-shadow duration-300 hover:shadow-lg">
            <h2 className="text-lg font-bold text-brand-green-dark">Gửi Tin Nhắn Cho Chúng Tôi</h2>
            <div className="mt-4">
              <ContactForm />
            </div>
          </Reveal>
        </div>

        <Reveal delay={250} className="mx-auto mt-6 block max-w-5xl overflow-hidden rounded-2xl border border-zinc-200">
          <iframe
            title="Bản đồ"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="h-80 w-full"
            loading="lazy"
          />
        </Reveal>
      </section>
    </div>
  );
}
