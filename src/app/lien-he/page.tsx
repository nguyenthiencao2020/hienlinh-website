import { ContactForm } from "./contact-form";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-3xl font-bold text-zinc-900">
        Đăng Ký Thiện Nguyện &amp; Quyên Góp
      </h1>
      <p className="mt-4 text-zinc-600">
        Mỗi sự đóng góp, dù nhỏ, đều là một điểm chạm yêu thương gửi tới những
        người yếu thế. Hãy để lại thông tin, chúng tôi sẽ liên hệ với bạn.
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
