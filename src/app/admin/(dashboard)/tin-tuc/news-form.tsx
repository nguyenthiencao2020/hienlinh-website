"use client";

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
      <div>
        <label className="block text-sm font-medium text-zinc-700">
          Ảnh bìa (URL từ Supabase Storage)
        </label>
        <input
          name="cover_image_url"
          defaultValue={news?.cover_image_url ?? ""}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>
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
      <label className="flex items-center gap-2 text-sm text-zinc-700">
        <input type="checkbox" name="published" defaultChecked={news?.published} />
        Đăng bài (hiển thị công khai)
      </label>
      <button
        type="submit"
        className="rounded-full bg-amber-800 px-6 py-3 text-sm font-medium text-white hover:bg-amber-900"
      >
        Lưu
      </button>
    </form>
  );
}
