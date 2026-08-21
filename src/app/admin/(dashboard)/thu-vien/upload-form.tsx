"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function GalleryUploadForm() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("file") as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError("");
    const supabase = createClient();
    const path = `thu-vien/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    setIsUploading(false);

    if (error) {
      setError("Tải lên thất bại: " + error.message);
      return;
    }
    input.value = "";
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <input type="file" name="file" accept="image/*" required className="text-sm" />
      <button
        type="submit"
        disabled={isUploading}
        className="rounded-full bg-brand-orange px-4 py-2 text-sm font-medium text-white hover:bg-brand-orange-dark disabled:opacity-60"
      >
        {isUploading ? "Đang tải lên..." : "Tải ảnh lên"}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
