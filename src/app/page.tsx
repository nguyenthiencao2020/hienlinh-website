import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { NewsPost, Program } from "@/lib/types";

export const revalidate = 60;

export default async function Home() {
  const supabase = await createClient();

  const [{ data: programs }, { data: news }] = await Promise.all([
    supabase
      .from("programs")
      .select("*")
      .order("sort_order", { ascending: true })
      .returns<Program[]>(),
    supabase
      .from("news")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .limit(3)
      .returns<NewsPost[]>(),
  ]);

  return (
    <div>
      {/* Section 1: Hero */}
      <section className="bg-amber-50 px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-800">
            Doanh Nghiệp Xã Hội Hiển Linh
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Nơi Ánh Sáng Chạm Trái Tim
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600">
            Hiển Linh &quot;chạm&quot; những mảnh đời bất hạnh, yếu thế — nơi môi trường
            Giáo dục, Y tế, các hoạt động thiện nguyện. Từ đó một hành trình mới
            mở ra bằng sự nâng đỡ, lắng nghe, đồng hành và giúp họ vươn lên
            trong cuộc sống.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/about"
              className="rounded-full bg-amber-800 px-6 py-3 text-sm font-medium text-white hover:bg-amber-900"
            >
              Xem chi tiết
            </Link>
            <Link
              href="/lien-he"
              className="rounded-full border border-amber-800 px-6 py-3 text-sm font-medium text-amber-900 hover:bg-amber-100"
            >
              Trở thành tình nguyện viên
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Chúng tôi là ai */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-800">
              Chúng tôi là ai?
            </p>
            <h2 className="mt-2 text-3xl font-bold text-zinc-900">DNXH Hiển Linh</h2>
            <p className="mt-4 text-zinc-600">
              Mang tinh thần FMM — Doanh nghiệp Xã hội Hiển Linh với sứ mệnh lan
              tỏa yêu thương, lắng nghe thấu cảm và kết nối cộng đồng, Hiển Linh
              không ngừng đổi mới để tạo nên những giá trị bền vững. Mỗi sự
              &quot;Chạm&quot; là khởi đầu của một hành trình đồng hành, nâng đỡ và trao
              cơ hội, giúp những người yếu thế từng bước vươn lên trong cuộc
              sống.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-block text-sm font-medium text-amber-900 underline"
            >
              Khám phá thêm →
            </Link>
          </div>
          <div className="aspect-[4/3] rounded-2xl bg-zinc-100" />
        </div>
      </section>

      {/* Section 3: Hệ sinh thái */}
      <section className="bg-zinc-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-800">
              Các lĩnh vực hoạt động cốt lõi
            </p>
            <h2 className="mt-2 text-3xl font-bold text-zinc-900">
              Hệ Sinh Thái Hiển Linh
            </h2>
            <p className="mt-4 text-zinc-600">
              Mỗi hoạt động là một điểm chạm yêu thương — đồng hành — nâng đỡ,
              thông qua giáo dục, y tế, hỗ trợ tâm lý và các hoạt động xã hội,
              thiện nguyện.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {(programs ?? []).map((program) => (
              <Link
                key={program.id}
                href={`/hoat-dong/${program.slug}`}
                className="rounded-xl border border-zinc-200 bg-white p-6 transition hover:border-amber-300 hover:shadow-sm"
              >
                <h3 className="font-semibold text-zinc-900">{program.name}</h3>
                <p className="mt-2 text-sm text-zinc-600">{program.summary}</p>
              </Link>
            ))}
            {!programs?.length && (
              <p className="text-sm text-zinc-500">
                Chưa có dữ liệu — cấu hình Supabase để hiển thị các mảng hoạt động.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Section 5: Tin tức */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold text-zinc-900">Tin tức &amp; Hoạt động</h2>
            <Link href="/tin-tuc" className="text-sm font-medium text-amber-900 underline">
              Xem tất cả →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {(news ?? []).map((post) => (
              <Link
                key={post.id}
                href={`/tin-tuc/${post.slug}`}
                className="rounded-xl border border-zinc-200 p-5 hover:border-amber-300"
              >
                <h3 className="font-semibold text-zinc-900">{post.title}</h3>
                <p className="mt-2 text-sm text-zinc-600 line-clamp-3">{post.excerpt}</p>
              </Link>
            ))}
            {!news?.length && (
              <p className="text-sm text-zinc-500">Chưa có bài viết nào được đăng.</p>
            )}
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section className="bg-amber-900 px-6 py-16 text-center text-white">
        <h2 className="text-2xl font-bold">Đăng Ký Tham Gia Thiện Nguyện &amp; Quyên Góp</h2>
        <p className="mx-auto mt-3 max-w-xl text-amber-100">
          Mỗi sự đóng góp là một điểm chạm yêu thương gửi tới những người yếu thế.
        </p>
        <Link
          href="/lien-he"
          className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-amber-900 hover:bg-amber-50"
        >
          Đăng ký ngay
        </Link>
      </section>
    </div>
  );
}
