"use client";

import type { Facility } from "@/lib/types";

const PROGRAMS = [
  { slug: "giao-duc", name: "Giáo dục" },
  { slug: "y-te", name: "Y tế" },
  { slug: "luu-tru", name: "Lưu trú" },
  { slug: "tam-ly", name: "Tâm lý" },
  { slug: "thien-nguyen", name: "Thiện nguyện" },
];

export function FacilityForm({
  action,
  facility,
}: {
  action: (formData: FormData) => void;
  facility?: Facility;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-700">Tên cơ sở *</label>
        <input
          name="name"
          required
          defaultValue={facility?.name}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700">
          Slug (để trống để tự tạo từ tên)
        </label>
        <input
          name="slug"
          defaultValue={facility?.slug}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700">Thuộc lĩnh vực</label>
        <select
          name="program_slug"
          defaultValue={facility?.program_slug ?? ""}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        >
          <option value="">— Không chọn —</option>
          {PROGRAMS.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700">Địa chỉ</label>
        <input
          name="address"
          defaultValue={facility?.address ?? ""}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700">
          Ảnh bìa (URL từ Supabase Storage)
        </label>
        <input
          name="cover_image_url"
          defaultValue={facility?.cover_image_url ?? ""}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700">Giới thiệu</label>
        <textarea
          name="description"
          rows={8}
          defaultValue={facility?.description}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-amber-800 px-6 py-3 text-sm font-medium text-white hover:bg-amber-900"
      >
        Lưu
      </button>
    </form>
  );
}
