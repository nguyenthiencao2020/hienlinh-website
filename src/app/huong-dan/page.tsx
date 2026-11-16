import { PageHero } from "@/components/page-hero";

export const metadata = {
  title: "Hướng Dẫn Sử Dụng Trang Quản Trị",
  robots: { index: false, follow: false },
};

const h2 = "mt-10 text-xl font-bold text-brand-green first:mt-0";
const p = "mt-3 text-sm text-zinc-600";
const ol = "mt-3 list-decimal space-y-2 pl-5 text-sm text-zinc-600";
const ul = "mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600";
const subUl = "mt-2 list-disc space-y-1 pl-5";
const label = "font-semibold text-brand-brown";
const code = "rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-700";

export default function HuongDanPage() {
  return (
    <div>
      <PageHero title="Hướng Dẫn Sử Dụng Trang Quản Trị" crumbLabel="Hướng Dẫn" />

      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-zinc-600">
          Tài liệu này hướng dẫn cách quản lý nội dung website (tin tức, cơ
          sở, tin nhắn) qua trang quản trị <code className={code}>/admin</code>,
          dành cho người không biết lập trình. Trang này không hiện trong
          menu — chỉ truy cập được qua đường dẫn trực tiếp này.
        </p>

        <article>
          <h2 className={h2}>1. Đăng nhập vào trang quản trị</h2>
          <p className={p}>
            Truy cập: <code className={code}>/admin/login</code>
          </p>
          <ol className={ol}>
            <li>
              Nhập email và mật khẩu đã được tạo trong Supabase
              (Authentication → Users). Mỗi người quản trị nội dung nên có 1
              tài khoản riêng.
            </li>
            <li>
              Nếu quên mật khẩu, vào Supabase → Authentication → Users →
              chọn người dùng đó → <span className={label}>Reset password</span> (gửi
              lại link đặt mật khẩu qua email đã đăng ký), hoặc nhờ người
              quản trị kỹ thuật tạo tài khoản mới.
            </li>
            <li>
              Đăng xuất: nhấn <span className={label}>Đăng xuất</span> ở góc
              dưới bên trái menu quản trị.
            </li>
          </ol>
          <p className={p}>
            Lưu ý: Trang <code className={code}>/admin</code> không cho đăng
            ký công khai — chỉ người được tạo sẵn tài khoản trong Supabase
            mới vào được, để tránh người lạ tự tạo tài khoản quản trị.
          </p>

          <h2 className={h2}>2. Quản lý Tin Tức</h2>
          <p className={p}>
            Vào menu <span className={label}>Tin tức</span> trong{" "}
            <code className={code}>/admin</code>.
          </p>
          <p className={`${p} ${label}`}>Thêm bài mới</p>
          <ol className={ol}>
            <li>
              Nhấn <span className={label}>Thêm bài viết</span>.
            </li>
            <li>
              Điền các trường:
              <ul className={subUl}>
                <li>
                  <span className={label}>Tiêu đề</span> — bắt buộc.
                </li>
                <li>
                  <span className={label}>Slug</span> (đường dẫn URL) —
                  thường tự sinh từ tiêu đề, có thể sửa tay (chỉ dùng chữ
                  thường, số, dấu gạch ngang, không dấu).
                </li>
                <li>
                  <span className={label}>Danh mục</span> (ví dụ: Thiện
                  nguyện, Câu chuyện thành công) — tuỳ chọn, hiện thành nhãn
                  trên bài.
                </li>
                <li>
                  <span className={label}>Tóm tắt (excerpt)</span> — 1–2 câu
                  hiện ở trang danh sách tin tức.
                </li>
                <li>
                  <span className={label}>Nội dung</span> — toàn bộ bài
                  viết, có thể xuống dòng để tách đoạn.
                </li>
                <li>
                  <span className={label}>Ảnh bìa</span> — xem mục 5 (Tải
                  ảnh lên) bên dưới.
                </li>
              </ul>
            </li>
            <li>
              Tick <span className={label}>Xuất bản (published)</span> nếu
              muốn bài hiện công khai ngay; để trống thì bài ở dạng nháp,
              chỉ người đăng nhập mới thấy.
            </li>
            <li>
              Tick <span className={label}>Nổi bật</span> và/hoặc{" "}
              <span className={label}>Câu chuyện thành công</span> nếu muốn
              bài xuất hiện ở các tab tương ứng trên trang Tin Tức.
            </li>
            <li>
              Nhấn <span className={label}>Lưu</span>.
            </li>
          </ol>
          <p className={`${p} ${label}`}>Sửa / Xoá bài viết đã có</p>
          <ul className={ul}>
            <li>
              Trong danh sách tin tức, nhấn vào bài viết để sửa; nhấn{" "}
              <span className={label}>Lưu</span> để cập nhật.
            </li>
            <li>
              Để ẩn một bài đã đăng mà không xoá hẳn: bỏ tick{" "}
              <span className={label}>Xuất bản</span>.
            </li>
            <li>
              Xoá hẳn: dùng nút <span className={label}>Xoá</span> trong
              trang sửa bài (thao tác không thể hoàn tác).
            </li>
          </ul>

          <h2 className={h2}>3. Quản lý Cơ Sở</h2>
          <p className={p}>
            Vào menu <span className={label}>Cơ sở</span> trong{" "}
            <code className={code}>/admin</code>.
          </p>
          <p className={`${p} ${label}`}>Thêm cơ sở mới</p>
          <ol className={ol}>
            <li>
              Nhấn <span className={label}>Thêm cơ sở</span>.
            </li>
            <li>
              Điền các trường:
              <ul className={subUl}>
                <li>
                  <span className={label}>Tên cơ sở</span> — bắt buộc.
                </li>
                <li>
                  <span className={label}>Slug</span> — đường dẫn URL, tự
                  sinh từ tên, có thể sửa tay.
                </li>
                <li>
                  <span className={label}>Lĩnh vực hoạt động</span> — chọn 1
                  trong 5 lĩnh vực (Giáo dục, Y tế, Lưu trú, Tâm lý, Thiện
                  nguyện) để cơ sở hiện đúng chỗ liên quan.
                </li>
                <li>
                  <span className={label}>Địa chỉ</span> — tuỳ chọn, hiện
                  dưới tiêu đề trang chi tiết cơ sở.
                </li>
                <li>
                  <span className={label}>Mô tả</span> — nội dung giới
                  thiệu, có thể dài nhiều đoạn.
                </li>
                <li>
                  <span className={label}>Ảnh bìa</span> — xem mục 5 (Tải
                  ảnh lên).
                </li>
                <li>
                  <span className={label}>Thứ tự hiển thị (sort order)</span>{" "}
                  — số nhỏ hơn hiện trước.
                </li>
              </ul>
            </li>
            <li>
              Nhấn <span className={label}>Lưu</span>.
            </li>
          </ol>
          <p className={`${p} ${label}`}>Sửa / Xoá</p>
          <ul className={ul}>
            <li>
              Nhấn vào tên cơ sở trong danh sách để sửa,{" "}
              <span className={label}>Lưu</span> để cập nhật.
            </li>
            <li>
              Xoá cơ sở dùng nút <span className={label}>Xoá</span> trong
              trang sửa (không thể hoàn tác).
            </li>
          </ul>
          <p className={p}>
            Lưu ý: nếu cơ sở chưa có địa chỉ/mô tả thật, cứ để trống — trang
            chi tiết sẽ tự hiện dòng &quot;Nội dung giới thiệu chi tiết sẽ
            được cập nhật sau&quot; thay vì hiện trống trơn.
          </p>

          <h2 className={h2}>4. Quản lý Tin Nhắn &amp; Đăng Ký</h2>
          <p className={p}>
            Vào menu <span className={label}>Tin nhắn / Đăng ký</span> trong{" "}
            <code className={code}>/admin</code>. Đây là nơi tập trung mọi
            form người dùng gửi từ website công khai:
          </p>
          <ul className={ul}>
            <li>Form Liên hệ (trang Liên Hệ)</li>
            <li>Đăng ký Tình nguyện viên (trang Tham Gia)</li>
            <li>
              Đăng ký Quyên góp (trang Tham Gia — chỉ ghi nhận ý định, không
              xử lý thanh toán thật)
            </li>
          </ul>
          <p className={p}>
            Mỗi tin nhắn hiện: loại (liên hệ / tình nguyện / quyên góp), họ
            tên, email, số điện thoại, nội dung, thời gian gửi.
          </p>
          <p className={p}>Trạng thái tin nhắn:</p>
          <ul className={ul}>
            <li>
              <span className={label}>Mới</span> — chưa xem.
            </li>
            <li>
              <span className={label}>Đã đọc</span> — đánh dấu sau khi đã xử
              lý/liên hệ lại người gửi.
            </li>
            <li>
              <span className={label}>Lưu trữ</span> — tin cũ không cần theo
              dõi nữa.
            </li>
          </ul>
          <p className={p}>
            Nên kiểm tra mục này thường xuyên (ít nhất vài ngày/lần) để
            không bỏ sót người muốn làm tình nguyện viên hoặc quyên góp.
          </p>

          <h2 className={h2}>5. Tải ảnh lên</h2>
          <p className={p}>
            Trong form thêm/sửa Tin tức hoặc Cơ sở, ô{" "}
            <span className={label}>Ảnh bìa</span> có nút tải ảnh trực tiếp:
          </p>
          <ol className={ol}>
            <li>Nhấn nút tải ảnh, chọn file ảnh từ máy tính/điện thoại.</li>
            <li>
              Ảnh được tải thẳng lên kho lưu trữ (Supabase Storage), sau vài
              giây sẽ hiện bản xem trước (thumbnail) ngay trong form.
            </li>
            <li>
              Ô đường dẫn ảnh (URL) tự động được điền — không cần copy/paste
              tay. Vẫn có thể sửa tay nếu muốn dùng ảnh từ nguồn ngoài.
            </li>
            <li>
              Nhấn <span className={label}>Lưu</span> form để hoàn tất.
            </li>
          </ol>
          <p className={`${p} ${label}`}>Lưu ý khi chọn ảnh:</p>
          <ul className={ul}>
            <li>Định dạng: JPG, PNG, WebP đều dùng được.</li>
            <li>
              Ảnh quá to (trên khoảng 5–10MB) sẽ tải chậm — nên dùng ảnh đã
              nén/resize hợp lý trước khi tải lên.
            </li>
            <li>
              Tỉ lệ ảnh đẹp nhất cho ảnh bìa: ngang (ví dụ 16:9 hoặc 4:3),
              tránh ảnh dọc bị cắt xấu khi hiển thị.
            </li>
          </ul>

          <h2 className={h2}>6. Lưu ý kỹ thuật</h2>
          <p className={`${p} ${label}`}>
            Chỉ cần dùng trang Admin (không đụng Supabase) khi:
          </p>
          <ul className={ul}>
            <li>
              Thêm/sửa/xoá tin tức, cơ sở, trả lời/đánh dấu tin nhắn — tất cả
              làm được qua <code className={code}>/admin</code>.
            </li>
          </ul>
          <p className={`${p} ${label}`}>Cần vào Supabase SQL Editor khi:</p>
          <ul className={ul}>
            <li>
              Thêm một loại nội dung mới hẳn chưa có sẵn form admin (ví dụ
              thêm bảng mới) — việc này cần sửa code + chạy file SQL, nên
              nhờ người làm kỹ thuật.
            </li>
            <li>
              Cập nhật hàng loạt dữ liệu cùng lúc (ví dụ sửa 10 cơ sở cùng
              lúc) — có thể dùng file SQL mẫu thay vì sửa tay từng cái trong
              admin.
            </li>
          </ul>
          <p className={`${p} ${label}`}>Khi gặp lỗi:</p>
          <ul className={ul}>
            <li>
              Lỗi đăng nhập / không vào được{" "}
              <code className={code}>/admin</code> → kiểm tra email/mật
              khẩu, hoặc nhờ tạo lại tài khoản trong Supabase →
              Authentication → Users.
            </li>
            <li>
              Lỗi không lưu được bài viết/cơ sở, hoặc ảnh không tải lên được
              → chụp màn hình lỗi, gửi cho người phụ trách kỹ thuật kèm mô
              tả đã làm gì trước khi lỗi xảy ra.
            </li>
            <li>
              Trang công khai hiện dữ liệu cũ sau khi vừa sửa trong admin →
              đợi khoảng 1 phút (trang có cơ chế làm mới nội dung định kỳ)
              rồi tải lại trang.
            </li>
          </ul>
        </article>
      </div>
    </div>
  );
}
