import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PROGRAM_FALLBACK_IMAGES } from "@/lib/program-images";
import { LeafyBackground } from "@/components/leafy-background";
import { HeartIcon } from "@/components/icons";
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
      <section className="relative flex min-h-[520px] items-center overflow-hidden">
        <Image
          src="/images/hero-home.webp"
          alt="Tình nguyện viên Hiển Linh đồng hành cùng trẻ em"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Nơi Ánh Sáng Chạm Trái Tim
            </h1>
            <p className="mt-6 text-lg text-white/90">
              Hiển Linh &quot;chạm&quot; những mảnh đời bất hạnh, yếu thế — nơi môi
              trường Giáo dục, Y tế, các hoạt động thiện nguyện. Từ đó một hành
              trình mới mở ra bằng sự nâng đỡ, lắng nghe, đồng hành và giúp họ
              vươn lên trong cuộc sống.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-green-dark hover:bg-zinc-100"
              >
                Khám phá thêm
              </Link>
              <Link
                href="/tham-gia"
                className="rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white hover:bg-brand-orange-dark"
              >
                Trở thành tình nguyện viên
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Chúng tôi là ai */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 sm:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/about-story.webp"
              alt="Đội ngũ Hiển Linh đồng hành cùng cộng đồng"
              fill
              className="object-cover"
              sizes="(min-width: 640px) 50vw, 100vw"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-orange">
              Chúng tôi là ai?
            </p>
            <h2 className="mt-2 text-3xl font-bold text-brand-green-dark">
              DNXH Hiển Linh
            </h2>
            <p className="mt-4 text-zinc-600">
              Mang tinh thần FMM — Doanh nghiệp Xã hội Hiển Linh với sứ mệnh lan
              tỏa yêu thương, lắng nghe thấu cảm và kết nối cộng đồng, Hiển Linh
              không ngừng đổi mới để tạo nên những giá trị bền vững. Mỗi sự
              &quot;Chạm&quot; là khởi đầu của một hành trình đồng hành, nâng đỡ và trao
              cơ hội, giúp những người yếu thế từng bước vươn lên trong cuộc
              sống.
            </p>
            <Link
              href="/hoat-dong"
              className="mt-6 inline-block rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white hover:bg-brand-green-dark"
            >
              Khám phá thêm →
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: Hệ sinh thái */}
      <section className="bg-brand-cream px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-orange">
              Các lĩnh vực hoạt động cốt lõi
            </p>
            <h2 className="mt-2 text-3xl font-bold text-brand-green-dark">
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
                className="rounded-2xl bg-white p-6 text-center shadow-sm transition hover:shadow-md"
              >
                <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full">
                  <Image
                    src={program.cover_image_url || PROGRAM_FALLBACK_IMAGES[program.slug] || "/images/hero-page.webp"}
                    alt={program.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <h3 className="mt-4 font-semibold text-brand-green-dark">{program.name}</h3>
                <p className="mt-2 text-sm text-zinc-600">{program.summary}</p>
                <span className="mt-3 inline-block text-sm font-medium text-brand-orange">
                  Xem chi tiết →
                </span>
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

      {/* Section 4: Câu chuyện */}
      <section className="relative overflow-hidden px-6 py-24">
        <Image
          src="/images/hero-page.webp"
          alt="Hoạt động thiện nguyện Hiển Linh"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-green-dark/80" />
        <div className="relative mx-auto max-w-3xl text-center text-white">
          <h2 className="text-3xl font-bold">
            Lắng Nghe, Thấu Cảm, Lan Tỏa Yêu Thương
          </h2>
          <p className="mt-4 text-white/90">
            Mỗi hành trình yêu thương đều bắt đầu từ một trái tim biết lắng
            nghe, cảm thông và sẵn sàng đón nhận những thách đố của thời đại để
            cùng lan tỏa tình yêu thương và hy vọng.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-block rounded-full border border-white px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-brand-green-dark"
          >
            Về chúng tôi
          </Link>
        </div>
      </section>

      {/* Section 5: Tin tức */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold text-brand-green-dark">Tin tức &amp; Hoạt động</h2>
            <Link href="/tin-tuc" className="text-sm font-medium text-brand-orange hover:underline">
              Xem tất cả →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {(news ?? []).map((post) => (
              <Link
                key={post.id}
                href={`/tin-tuc/${post.slug}`}
                className="overflow-hidden rounded-xl border border-zinc-200 hover:border-brand-orange/50"
              >
                {post.cover_image_url && (
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={post.cover_image_url}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 640px) 33vw, 100vw"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-semibold text-brand-green-dark">{post.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600 line-clamp-3">{post.excerpt}</p>
                </div>
              </Link>
            ))}
            {!news?.length && (
              <p className="text-sm text-zinc-500">Chưa có bài viết nào được đăng.</p>
            )}
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section className="relative overflow-hidden px-6 py-20 text-center text-white">
        <LeafyBackground />
        <div className="relative">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Đăng Ký Tham Gia Thiện Nguyện &amp; Quyên Góp
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Mỗi sự đóng góp là mầm ánh sáng yêu thương gửi tới những người yếu thế.
          </p>
          <Link
            href="/tham-gia"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white hover:bg-brand-orange-dark"
          >
            <HeartIcon className="h-4 w-4" />
            Đăng ký ngay
          </Link>
        </div>
      </section>
    </div>
  );
}
