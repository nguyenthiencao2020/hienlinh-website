"use client";

import { ImageUploadField } from "@/components/image-upload-field";
import { RichTextEditor } from "@/components/rich-text-editor";
import type { NewsPost } from "@/lib/types";

const NEWS_CATEGORIES = [
  "Giáo dục",
  "Y tế",
  "Lưu trú",
  "Tâm lý",
  "Thiện nguyện",
  "Sự kiện",
  "Câu chuyện thành công",
];

export function NewsForm({
  action,
  news,
}: {
  action: (formData: FormData) => void;
  news?: NewsPost;
}) {
  // Giữ lại danh mục cũ (gõ tay trước đây) nếu không nằm trong danh sách.
  const categoryOptions =
    news?.category && !NEWS_CATEGORIES.includes(news.category)
      ? [...NEWS_CATEGORIES, news.category]
      : NEWS_CATEGORIES;

  return (
    <form action={action} className="max-w-4xl space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-700">Tiêu đề *</label>
        <input
          name="title"
          required
          defaultValue={news?.title}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700">
          Slug (đường dẫn, để trống để tự tạo từ tiêu đề)
        </label>
        <input
          name="slug"
          defaultValue={news?.slug}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700">Danh mục</label>
        <select
          name="category"
          defaultValue={news?.category ?? ""}
          className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2"
        >
          <option value="">— Không chọn —</option>
          {categoryOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <ImageUploadField
        name="cover_image_url"
        label="Ảnh bìa"
        defaultValue={news?.cover_image_url}
        folder="news"
      />
      <div>
        <label className="block text-sm font-medium text-zinc-700">Tóm tắt</label>
        <textarea
          name="excerpt"
          rows={2}
          defaultValue={news?.excerpt}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700">Nội dung</label>
        <RichTextEditor name="content" defaultValue={news?.content} uploadFolder="news/content" />
      </div>
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-zinc-700">
          <input type="checkbox" name="is_featured" defaultChecked={news?.is_featured} />
          Hiển thị ở tab &quot;Hoạt Động Nổi Bật&quot;
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-700">
          <input type="checkbox" name="is_success_story" defaultChecked={news?.is_success_story} />
          Hiển thị ở tab &quot;Câu Chuyện Thành Công&quot;
        </label>
      </div>
      <label className="flex items-center gap-2 text-sm text-zinc-700">
        <input type="checkbox" name="published" defaultChecked={news?.published} />
        Đăng bài (hiển thị công khai)
      </label>
      <button
        type="submit"
        className="rounded-full bg-brand-orange px-6 py-3 text-sm font-medium text-white hover:bg-brand-orange-dark"
      >
        Lưu
      </button>
    </form>
  );
}
