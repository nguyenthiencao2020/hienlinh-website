import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { createClient } from "@/lib/supabase/server";
import type { Partner } from "@/lib/types";
import { VolunteerForm } from "./volunteer-form";
import { DonationForm } from "./donation-form";

export const revalidate = 60;

export default async function JoinPage() {
  const supabase = await createClient();
  const { data: partners } = await supabase
    .from("partners")
    .select("*")
    .order("sort_order", { ascending: true })
    .returns<Partner[]>();

  return (
    <div>
      <PageHero
        title="Tham Gia Cùng Chúng Tôi"
        subtitle="Cùng chúng tôi thắp sáng hy vọng"
        crumbLabel="Tham Gia"
      />

      <section className="bg-brand-cream px-6 py-14">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
          <Reveal>
            <h2 className="text-xl font-bold text-brand-green">
              Trở Thành Tình Nguyện Viên
            </h2>
            <p className="mt-3 text-zinc-600">
              Tham gia tình nguyện cùng Hiển Linh là cơ hội để bạn lan tỏa yêu
              thương, phát huy trách nhiệm xã hội và góp phần tạo nên những
              thay đổi tích cực cho cộng đồng.
            </p>
            <p className="mt-4 text-sm font-semibold text-zinc-700">
              Bạn có thể tham gia các hoạt động:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-zinc-600">
              <li>✓ Hỗ trợ học tập, kèm cặp các em nhỏ</li>
              <li>✓ Chăm sóc sức khỏe, hỗ trợ y tế cộng đồng</li>
              <li>✓ Tổ chức hoạt động thiện nguyện, gây quỹ</li>
              <li>✓ Tham gia các chương trình tư vấn, hỗ trợ tâm lý</li>
              <li>✓ Và nhiều hoạt động ý nghĩa khác</li>
            </ul>
          </Reveal>
          <Reveal
            delay={150}
            className="rounded-2xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg"
          >
            <h3 className="font-semibold text-brand-green">
              Đăng Ký Trở Thành Tình Nguyện Viên
            </h3>
            <div className="mt-4">
              <VolunteerForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="quyen-gop" className="px-6 py-14">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
          <Reveal>
            <h2 className="text-xl font-bold text-brand-green">Quyên Góp / Ủng Hộ</h2>
            <p className="mt-3 text-zinc-600">
              Mỗi sự đóng góp, dù nhỏ bé, đều mang lại những thay đổi lớn lao
              cho cuộc sống của các em nhỏ và cộng đồng có hoàn cảnh khó khăn.
            </p>
          </Reveal>
          <Reveal
            delay={150}
            className="rounded-2xl border border-zinc-200 p-6 transition-shadow duration-300 hover:shadow-lg"
          >
            <DonationForm />
            <div className="mt-6 flex items-center gap-3 rounded-lg border border-dashed border-zinc-300 p-4 text-sm text-zinc-500">
              <span className="text-2xl">▦</span>
              <span>
                Mã QR chuyển khoản sẽ hiển thị ở đây sau khi tổ chức cung cấp ảnh
                QR ngân hàng thật (chưa có trong dữ liệu hiện tại).
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-brand-cream px-6 py-14">
        <Reveal className="mx-auto block max-w-5xl text-center">
          <h2 className="text-xl font-bold text-brand-green">Đối Tác &amp; Tài Trợ</h2>
          {partners?.length ? (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
              {partners.map((partner) => (
                <a
                  key={partner.id}
                  href={partner.website_url ?? undefined}
                  className="relative h-16 w-32 transition-transform duration-300 hover:scale-110"
                >
                  {partner.logo_url && (
                    <Image
                      src={partner.logo_url}
                      alt={partner.name}
                      fill
                      className="object-contain"
                      sizes="128px"
                    />
                  )}
                </a>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-zinc-500">
              Thông tin đối tác & tài trợ sẽ được cập nhật sau.
            </p>
          )}
        </Reveal>
      </section>
    </div>
  );
}
