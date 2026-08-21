import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { createClient } from "@/lib/supabase/server";
import type { TeamMember } from "@/lib/types";

export const revalidate = 60;

const CORE_VALUES = [
  {
    vi: "Nhân Vị",
    en: "Human Dignity",
    desc: "Mỗi người đều có phẩm giá bất khả xâm phạm. Chúng tôi lắng nghe, tôn trọng và phục vụ từng cá nhân bằng sự thấu hiểu sâu sắc — không phân biệt hoàn cảnh hay xuất thân.",
  },
  {
    vi: "Liên Đới",
    en: "Solidarity",
    desc: "Kết nối cộng đồng, ân-thân nhân và người được phục vụ trong mối tương quan tin cậy. Cùng nhau lớn lên, cùng nhau kiến tạo một xã hội nhân ái và hòa nhập.",
  },
  {
    vi: "Tận Tâm",
    en: "Wholehearted Dedication",
    desc: "Phục vụ bằng cả trí tâm với sự nhạy bén. Không ngừng học hỏi, nâng cao chuyên môn để mỗi người được chăm sóc với chất lượng tốt nhất có thể.",
  },
  {
    vi: "Minh Bạch",
    en: "Integrity & Accountability",
    desc: "Trách nhiệm rõ ràng trong quản trị và sử dụng nguồn lực. Trung tín với các cam kết, xây dựng niềm tin bền vững với đối tác, ân-thân nhân và cộng đồng.",
  },
];

export default async function AboutPage() {
  const supabase = await createClient();
  const { data: team } = await supabase
    .from("team_members")
    .select("*")
    .order("sort_order", { ascending: true })
    .returns<TeamMember[]>();

  return (
    <div>
      <PageHero title="Về Chúng Tôi" crumbLabel="Giới Thiệu" />

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 sm:items-center">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/about-story.webp"
              alt="Đồng hành cùng cộng đồng"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(min-width: 640px) 50vw, 100vw"
            />
          </Reveal>
          <Reveal delay={150}>
            <h1 className="text-2xl font-bold text-brand-green-dark">Câu Chuyện Của Chúng Tôi</h1>
            <p className="mt-4 text-zinc-600">
              Khởi đi từ tinh thần lắng nghe những dấu chỉ của thời đại, chúng
              tôi nhận ra rằng có rất nhiều người cần một môi trường an toàn để
              được phát triển toàn diện. Tại môi trường này, không chỉ cần
              lòng nhiệt thành của những người phục vụ, mà còn đòi hỏi một
              hướng đi bền vững của một tổ chức, cung cấp dịch vụ chuyên
              nghiệp và minh bạch.
            </p>
            <p className="mt-4 text-zinc-600">
              Vì thế, lấy tinh thần Kitô giáo làm nền tảng, DNXH Hiển Linh hình
              thành hầu kết nối các lĩnh vực Giáo dục, Y tế, Tâm lý và Lưu trú;
              tạo nên một hệ sinh thái nhằm đồng hành toàn diện với con người,
              ưu tiên phục vụ trẻ em, người trẻ và những người dễ bị tổn
              thương đang ở bên lề xã hội.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-brand-cream px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2">
          <Reveal className="rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-xl font-bold text-brand-green-dark">Tầm Nhìn</h2>
            <p className="mt-3 text-zinc-600">
              Một xã hội nơi mỗi người đều được sống trong phẩm giá, tình
              thương, và hy vọng; ưu tiên người dễ bị tổn thương.
            </p>
          </Reveal>
          <Reveal
            delay={120}
            className="rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-xl font-bold text-brand-green-dark">Sứ Mệnh</h2>
            <p className="mt-3 text-zinc-600">
              DNXH Hiển Linh lan tỏa tinh thần FMM qua giáo dục, đồng hành,
              chăm sóc toàn diện cho trẻ em, người trẻ; đặc biệt người dễ bị
              tổn thương — thông qua hệ sinh thái Giáo dục, Y tế, Tâm lý và
              Lưu trú — để khơi dậy và phát triển tiềm năng, thắp sáng hy vọng
              và kiến tạo một xã hội hòa nhập, bền vững.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-center text-2xl font-bold text-brand-green-dark">
              Giá Trị Cốt Lõi
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_VALUES.map((value, i) => (
              <Reveal key={value.vi} delay={i * 80}>
                <div className="h-full rounded-2xl border border-zinc-200 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-brown/30 hover:shadow-lg">
                  <h3 className="font-semibold text-brand-green-dark">{value.vi}</h3>
                  <p className="text-xs italic text-brand-brown">{value.en}</p>
                  <p className="mt-3 text-sm text-zinc-600">{value.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-center text-2xl font-bold text-brand-green-dark">
              Đội Ngũ Của Chúng Tôi
            </h2>
          </Reveal>
          {team?.length ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member, i) => (
                <Reveal
                  key={member.id}
                  delay={i * 80}
                  className="rounded-2xl bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full bg-zinc-100">
                    {member.photo_url && (
                      <Image
                        src={member.photo_url}
                        alt={member.full_name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    )}
                  </div>
                  <h3 className="mt-4 font-semibold text-brand-green-dark">{member.full_name}</h3>
                  <p className="text-sm text-brand-brown">{member.role}</p>
                  {member.bio && <p className="mt-2 text-sm text-zinc-600">{member.bio}</p>}
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-center text-sm text-zinc-500">
              Thông tin đội ngũ sẽ được cập nhật sau.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
