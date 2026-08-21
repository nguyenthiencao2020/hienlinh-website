"use client";

import { ImageUploadField } from "@/components/image-upload-field";
import type { NewsPost } from "@/lib/types";

export function NewsForm({
  action,
  news,
}: {
  action: (formData: FormData) => void;
  news?: NewsPost;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-4">
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
        <input
          name="category"
          defaultValue={news?.category ?? ""}
          placeholder="Giáo dục, Y tế, Thiện nguyện..."
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
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
        <textarea
          name="content"
          rows={10}
          defaultValue={news?.content}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
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
        className="rounded-full bg-brand-brown px-6 py-3 text-sm font-medium text-white hover:bg-brand-brown-dark"
      >
        Lưu
      </button>
    </form>
  );
}
