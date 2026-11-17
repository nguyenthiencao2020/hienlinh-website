import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata = {
  title: "Hướng Dẫn Sử Dụng Trang Quản Trị",
  robots: { index: false, follow: false },
};

const TOC = [
  { id: "dang-nhap", label: "Đăng nhập" },
  { id: "man-hinh", label: "Màn hình quản trị" },
  { id: "tin-tuc", label: "Đăng bài tin tức" },
  { id: "soan-noi-dung", label: "Soạn nội dung với thanh công cụ" },
  { id: "co-so", label: "Quản lý cơ sở" },
  { id: "tin-nhan", label: "Tin nhắn & đăng ký" },
  { id: "su-co", label: "Khi gặp sự cố" },
];

function N({ n }: { n: number }) {
  return (
    <span className="mr-2 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-orange text-xs font-bold text-white">
      {n}
    </span>
  );
}

function Shot({
  src,
  width,
  height,
  alt,
  className = "",
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
}) {
  return (
    <figure className={`mt-5 ${className}`}>
      <Image
        src={`/images/huong-dan/${src}.webp`}
        width={width}
        height={height}
        alt={alt}
        sizes="(min-width: 768px) 720px, 100vw"
        className="h-auto w-full rounded-xl border border-zinc-200 shadow-sm"
      />
      <figcaption className="mt-2 text-center text-xs text-zinc-400">Ảnh minh hoạ — {alt}</figcaption>
    </figure>
  );
}

function Steps({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-4 space-y-3 text-sm text-zinc-600">
      {items.map((item, i) => (
        <li key={i} className="flex items-start">
          <N n={i + 1} />
          <span className="pt-0.5">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 rounded-lg border-l-4 border-brand-green bg-brand-green/5 px-4 py-3 text-sm text-zinc-700">
      {children}
    </p>
  );
}

const h2 = "scroll-mt-24 text-xl font-bold text-brand-green";
const h3 = "mt-8 font-semibold text-zinc-900";
const p = "mt-3 text-sm text-zinc-600";
const b = "font-semibold text-zinc-800";

const TOOLS = [
  { name: "Hoàn tác / Làm lại", desc: "Quay lại thao tác vừa làm (phím tắt Ctrl+Z) hoặc làm lại (Ctrl+Y)." },
  { name: "Kiểu đoạn", desc: "Chọn Đoạn văn, Tiêu đề lớn, Tiêu đề vừa hoặc Tiêu đề nhỏ. Dùng tiêu đề để chia bài dài thành nhiều mục." },
  { name: "Kiểu chữ", desc: "In đậm (Ctrl+B), in nghiêng (Ctrl+I), gạch chân (Ctrl+U), gạch ngang." },
  { name: "Màu chữ & tô nền", desc: "Đổi màu chữ hoặc tô nền nổi bật cho chữ. Chọn \"Màu mặc định\" / \"Bỏ tô nền\" để bỏ." },
  { name: "Căn lề", desc: "Căn trái, căn giữa, căn phải, căn đều 2 bên." },
  { name: "Danh sách & trích dẫn", desc: "Danh sách chấm, danh sách số, khung trích dẫn, đường kẻ ngang ngăn cách." },
  { name: "Liên kết, ảnh, video", desc: "Gắn link vào chữ, chèn ảnh hoặc video vào giữa bài." },
  { name: "Xoá định dạng", desc: "Đưa đoạn đang chọn về chữ thường (bỏ đậm, màu, tiêu đề…)." },
];

export default function HuongDanPage() {
  return (
    <div>
      <PageHero title="Hướng Dẫn Sử Dụng Trang Quản Trị" crumbs={[{ label: "Hướng Dẫn" }]} />

      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-zinc-600">
          Hướng dẫn từng bước cách đăng tin tức, cập nhật cơ sở và xem tin nhắn trên
          website Hiển Linh. Không cần biết kỹ thuật — chỉ cần làm theo ảnh minh hoạ.
          Các số màu cam trong ảnh tương ứng với các bước bên dưới.
        </p>

        <nav className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm font-semibold text-zinc-800">Nội dung</p>
          <ol className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
            {TOC.map((t, i) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="text-brand-green hover:underline">
                  {i + 1}. {t.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section className="mt-14">
          <h2 id="dang-nhap" className={h2}>1. Đăng nhập</h2>
          <p className={p}>
            Mở trình duyệt, vào trang{" "}
            <Link href="/admin/login" className="text-brand-green underline">
              /admin/login
            </Link>{" "}
            của website.
          </p>
          <Shot src="login" width={588} height={552} alt="trang đăng nhập" className="max-w-xs" />
          <Steps
            items={[
              <>Nhập <span className={b}>email</span> được cấp.</>,
              <>Nhập <span className={b}>mật khẩu</span>.</>,
              <>Bấm <span className={b}>Đăng nhập</span>.</>,
            ]}
          />
          <Note>
            Tài khoản do người phụ trách kỹ thuật cấp. Nếu quên mật khẩu, hãy liên hệ người
            phụ trách kỹ thuật để được đặt lại.
          </Note>
        </section>

        <section className="mt-14">
          <h2 id="man-hinh" className={h2}>2. Màn hình quản trị</h2>
          <Shot src="dashboard" width={1400} height={395} alt="màn hình tổng quan" />
          <Steps
            items={[
              <>
                <span className={b}>Menu bên trái</span>: Tổng quan (số bài viết, số tin nhắn chưa
                đọc), Tin tức, Cơ sở, Tin nhắn / Đăng ký.
              </>,
              <>
                <span className={b}>Đăng xuất</span> — nhớ đăng xuất khi dùng máy tính chung.
              </>,
            ]}
          />
        </section>

        <section className="mt-14">
          <h2 id="tin-tuc" className={h2}>3. Đăng bài tin tức</h2>

          <h3 className={h3}>3.1. Danh sách bài viết</h3>
          <p className={p}>Bấm <span className={b}>Tin tức</span> ở menu bên trái.</p>
          <Shot src="news-list" width={1400} height={438} alt="danh sách bài viết" />
          <Steps
            items={[
              <><span className={b}>+ Bài viết mới</span> — tạo bài mới.</>,
              <><span className={b}>Sửa</span> — mở bài để chỉnh sửa.</>,
              <><span className={b}>Xoá</span> — xoá hẳn bài viết, <span className={b}>không khôi phục được</span>.</>,
              <>Trạng thái: <span className={b}>Đã đăng</span> (đang hiện trên web) hoặc <span className={b}>Bản nháp</span> (chưa hiện).</>,
            ]}
          />

          <h3 className={h3}>3.2. Điền thông tin bài viết</h3>
          <Shot src="news-form-fields" width={1400} height={1158} alt="form viết bài" />
          <Steps
            items={[
              <><span className={b}>Tiêu đề</span> — bắt buộc. Ô &quot;Slug&quot; bên dưới cứ để trống, hệ thống tự tạo.</>,
              <><span className={b}>Danh mục</span> — chọn trong danh sách.</>,
              <><span className={b}>Ảnh bìa</span> — bấm &quot;Chọn ảnh&quot;, chọn ảnh trong máy. Ảnh hiện xem trước ngay phía trên.</>,
              <><span className={b}>Tóm tắt</span> — 1–2 câu giới thiệu, hiện ở trang danh sách tin tức.</>,
              <><span className={b}>Nội dung</span> — viết bài và định dạng bằng thanh công cụ (xem mục 4).</>,
            ]}
          />

          <h3 className={h3}>3.3. Đăng bài</h3>
          <Shot src="news-form-publish" width={1400} height={299} alt="đăng bài" />
          <Steps
            items={[
              <>Tuỳ chọn: cho bài hiện thêm ở tab <span className={b}>Hoạt Động Nổi Bật</span> hoặc <span className={b}>Câu Chuyện Thành Công</span> trên trang Tin Tức.</>,
              <>Tick <span className={b}>Đăng bài</span> để bài hiện trên web. Không tick = lưu thành bản nháp.</>,
              <>Bấm <span className={b}>Lưu</span>.</>,
            ]}
          />
          <Note>
            Muốn ẩn một bài đã đăng mà không xoá: mở bài, bỏ tick <b>Đăng bài</b>, rồi bấm Lưu.
          </Note>
        </section>

        <section className="mt-14">
          <h2 id="soan-noi-dung" className={h2}>4. Soạn nội dung với thanh công cụ</h2>
          <p className={p}>
            Cách dùng chung: <span className={b}>bôi đen chữ</span> rồi bấm nút để định dạng; bấm
            lại nút đó để bỏ. Rê chuột lên nút để xem tên nút.
          </p>
          <Shot src="toolbar" width={1383} height={134} alt="thanh công cụ soạn thảo" />
          <ul className="mt-4 space-y-3 text-sm text-zinc-600">
            {TOOLS.map((t, i) => (
              <li key={t.name} className="flex items-start">
                <N n={i + 1} />
                <span className="pt-0.5">
                  <span className={b}>{t.name}</span> — {t.desc}
                </span>
              </li>
            ))}
          </ul>

          <h3 className={h3}>Đổi màu chữ / tô nền</h3>
          <p className={p}>
            Bôi đen chữ → bấm nút màu chữ (chữ <b>A</b>) hoặc nút tô nền → chọn màu. Nên ưu
            tiên màu xanh và nâu của Hiển Linh, tránh dùng quá nhiều màu trong một bài.
          </p>
          <Shot src="toolbar-color" width={1359} height={317} alt="chọn màu chữ" />

          <h3 className={h3}>Chèn ảnh vào giữa bài</h3>
          <p className={p}>
            Đặt con trỏ ở chỗ muốn chèn → bấm nút <span className={b}>Chèn ảnh</span> → chọn ảnh
            trong máy. Ảnh nên nhỏ hơn 5MB để tải nhanh.
          </p>

          <h3 className={h3}>Chèn video</h3>
          <p className={p}>Bấm nút <span className={b}>Chèn video</span>, chọn một trong hai cách:</p>
          <Shot src="toolbar-video" width={1359} height={257} alt="chèn video" />
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-600">
            <li>
              <span className={b}>Dán link YouTube</span> (khuyên dùng) — đăng video lên YouTube
              trước, rồi dán link vào. Không giới hạn độ dài video.
            </li>
            <li>
              <span className={b}>Tải file video</span> — tải video trong máy lên, tối đa 50MB.
              Video lớn hơn hãy đăng lên YouTube.
            </li>
          </ul>

          <h3 className={h3}>Gắn link vào chữ</h3>
          <p className={p}>
            Bôi đen chữ → bấm nút <span className={b}>Chèn liên kết</span> → dán địa chỉ trang
            web. Muốn bỏ link: đặt con trỏ vào chữ có link và bấm lại nút đó.
          </p>

          <Note>
            Khi chèn ảnh hoặc video, đừng bôi đen chữ — phần chữ đang bôi đen sẽ bị thay thế
            bằng ảnh/video. Lỡ tay thì bấm <b>Hoàn tác</b>.
          </Note>

          <h3 className={h3}>Bài viết sau khi định dạng</h3>
          <p className={p}>
            Nội dung trên website hiển thị giống như trong khung soạn thảo. Nếu dán chữ từ Word
            hoặc Facebook mà bị lẫn màu/kiểu chữ lạ, bôi đen đoạn đó rồi bấm{" "}
            <span className={b}>Xoá định dạng</span>.
          </p>
          <Shot src="editor-sample" width={1353} height={720} alt="nội dung đã định dạng" />
        </section>

        <section className="mt-14">
          <h2 id="co-so" className={h2}>5. Quản lý cơ sở</h2>
          <p className={p}>
            Bấm <span className={b}>Cơ sở</span> ở menu bên trái. Danh sách cơ sở có nút{" "}
            <span className={b}>+ Cơ sở mới</span>, <span className={b}>Sửa</span>,{" "}
            <span className={b}>Xoá</span> giống như danh sách tin tức.
          </p>
          <Shot src="facility-form" width={1400} height={1026} alt="form cơ sở" />
          <Steps
            items={[
              <><span className={b}>Tên cơ sở</span> — bắt buộc. Ô &quot;Slug&quot; cứ để trống.</>,
              <><span className={b}>Thuộc lĩnh vực</span> — để cơ sở hiện đúng trong trang lĩnh vực đó (Giáo dục, Y tế, Lưu trú, Tâm lý, Thiện nguyện).</>,
              <><span className={b}>Địa chỉ</span>.</>,
              <><span className={b}>Ảnh bìa</span> — bấm &quot;Chọn ảnh&quot;.</>,
              <><span className={b}>Giới thiệu</span> — có thể viết nhiều đoạn, cách nhau bằng một dòng trống.</>,
              <>Bấm <span className={b}>Lưu</span>.</>,
            ]}
          />
          <Note>
            Chưa có địa chỉ hoặc giới thiệu thật thì cứ để trống — trang cơ sở sẽ tự ghi
            &quot;Nội dung giới thiệu chi tiết sẽ được cập nhật sau&quot;.
          </Note>
        </section>

        <section className="mt-14">
          <h2 id="tin-nhan" className={h2}>6. Tin nhắn & đăng ký</h2>
          <p className={p}>
            Bấm <span className={b}>Tin nhắn / Đăng ký</span> ở menu bên trái. Đây là nơi nhận
            mọi form khách gửi từ website: liên hệ, đăng ký tình nguyện viên, đăng ký quyên góp.
          </p>
          <Shot src="messages" width={1400} height={476} alt="tin nhắn và đăng ký" />
          <Steps
            items={[
              <>Loại tin: <span className={b}>Liên hệ</span>, <span className={b}>Tình nguyện viên</span> hoặc <span className={b}>Quyên góp</span>. Nhãn đỏ <span className={b}>Mới</span> = chưa xem.</>,
              <><span className={b}>Đánh dấu đã đọc</span> — sau khi đã liên hệ lại người gửi.</>,
              <><span className={b}>Lưu trữ</span> — cất các tin cũ không cần theo dõi nữa.</>,
            ]}
          />
          <Note>
            Đăng ký quyên góp chỉ là người gửi báo ý định ủng hộ, chưa phải tiền đã chuyển — cần
            liên hệ lại để xác nhận. Nên kiểm tra mục này vài ngày một lần.
          </Note>
        </section>

        <section className="mt-14">
          <h2 id="su-co" className={h2}>7. Khi gặp sự cố</h2>
          <ul className="mt-4 space-y-4 text-sm text-zinc-600">
            <li>
              <span className={b}>Không đăng nhập được</span> — kiểm tra lại email, mật khẩu (chú ý
              phím Caps Lock). Vẫn không được thì liên hệ người phụ trách kỹ thuật.
            </li>
            <li>
              <span className={b}>Không lưu được bài, hoặc không tải được ảnh/video</span> — chụp
              màn hình thông báo lỗi, gửi cho người phụ trách kỹ thuật kèm mô tả bạn vừa làm gì.
            </li>
            <li>
              <span className={b}>Đã lưu nhưng trên web chưa thấy thay đổi</span> — tải lại trang
              (phím F5). Nếu vẫn chưa thấy, đợi khoảng 1 phút rồi thử lại.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
