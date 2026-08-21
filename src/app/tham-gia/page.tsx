import { PageHero } from "@/components/page-hero";
import { VolunteerForm } from "./volunteer-form";
import { DonationForm } from "./donation-form";

export default function JoinPage() {
  return (
    <div>
      <PageHero
        title="Tham Gia Cùng Chúng Tôi"
        subtitle="Cùng chúng tôi thắp sáng hy vọng"
        crumbLabel="Tham Gia"
      />

      <section className="bg-brand-cream px-6 py-14">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-brand-green-dark">
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
          </div>
          <div className="rounded-2xl bg-white p-6">
            <h3 className="font-semibold text-brand-green-dark">
              Đăng Ký Trở Thành Tình Nguyện Viên
            </h3>
            <div className="mt-4">
              <VolunteerForm />
            </div>
          </div>
        </div>
      </section>

      <section id="quyen-gop" className="px-6 py-14">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-brand-green-dark">Quyên Góp / Ủng Hộ</h2>
            <p className="mt-3 text-zinc-600">
              Mỗi sự đóng góp, dù nhỏ bé, đều mang lại những thay đổi lớn lao
              cho cuộc sống của các em nhỏ và cộng đồng có hoàn cảnh khó khăn.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 p-6">
            <DonationForm />
            <div className="mt-6 flex items-center gap-3 rounded-lg border border-dashed border-zinc-300 p-4 text-sm text-zinc-500">
              <span className="text-2xl">▦</span>
              <span>
                Mã QR chuyển khoản sẽ hiển thị ở đây sau khi tổ chức cung cấp ảnh
                QR ngân hàng thật (chưa có trong dữ liệu hiện tại).
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
