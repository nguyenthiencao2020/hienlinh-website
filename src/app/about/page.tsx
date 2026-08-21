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

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <section>
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-800">
          Our Story
        </p>
        <h1 className="mt-2 text-3xl font-bold text-zinc-900">Câu Chuyện Hiển Linh</h1>
        <p className="mt-4 text-zinc-600">
          Khởi đi từ tinh thần lắng nghe những dấu chỉ của thời đại, chúng tôi
          nhận ra rằng có rất nhiều người cần một môi trường an toàn để được
          phát triển toàn diện. Tại môi trường này, không chỉ cần lòng nhiệt
          thành của những người phục vụ, mà còn đòi hỏi một hướng đi bền vững
          của một tổ chức, cung cấp dịch vụ chuyên nghiệp và minh bạch. Vì thế,
          lấy tinh thần Kitô giáo làm nền tảng, DNXH Hiển Linh hình thành hầu
          kết nối các lĩnh vực Giáo dục, Y tế, Tâm lý và Lưu trú; tạo nên một
          hệ sinh thái nhằm đồng hành toàn diện với con người, ưu tiên phục vụ
          trẻ em, người trẻ và những người dễ bị tổn thương đang ở bên lề xã
          hội.
        </p>
      </section>

      <section className="mt-14">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-800">Vision</p>
        <h2 className="mt-2 text-2xl font-bold text-zinc-900">Tầm Nhìn</h2>
        <p className="mt-4 text-zinc-600">
          Một xã hội nơi mỗi người đều được sống trong phẩm giá, tình thương,
          và hy vọng; ưu tiên người dễ bị tổn thương.
        </p>
      </section>

      <section className="mt-14">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-800">Mission</p>
        <h2 className="mt-2 text-2xl font-bold text-zinc-900">Sứ Mệnh</h2>
        <p className="mt-4 text-zinc-600">
          DNXH Hiển Linh lan tỏa tinh thần FMM qua giáo dục, đồng hành, chăm
          sóc toàn diện cho trẻ em, người trẻ; đặc biệt người dễ bị tổn thương
          — thông qua hệ sinh thái Giáo dục, Y tế, Tâm lý và Lưu trú — để khơi
          dậy và phát triển tiềm năng, thắp sáng hy vọng và kiến tạo một xã
          hội hòa nhập, bền vững.
        </p>
      </section>

      <section className="mt-14">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-800">
          Core Values
        </p>
        <h2 className="mt-2 text-2xl font-bold text-zinc-900">Giá Trị Cốt Lõi</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {CORE_VALUES.map((value) => (
            <div key={value.vi} className="rounded-xl border border-zinc-200 p-5">
              <h3 className="font-semibold text-zinc-900">
                {value.vi} <span className="text-zinc-400">· {value.en}</span>
              </h3>
              <p className="mt-2 text-sm text-zinc-600">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
