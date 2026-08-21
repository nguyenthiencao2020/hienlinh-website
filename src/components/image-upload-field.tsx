"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function ImageUploadField({
  name,
  label,
  defaultValue,
  folder,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  folder: string;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    const supabase = createClient();
    const path = `${folder}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from("media").upload(path, file);

    if (uploadError) {
      setError("Tải ảnh lên thất bại: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setValue(data.publicUrl);
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div>
      <label className="block text-sm font-medium text-zinc-700">{label}</label>
      {value && (
        <div className="relative mt-2 h-32 w-48 overflow-hidden rounded-lg bg-zinc-100">
          <Image src={value} alt="" fill className="object-cover" sizes="192px" />
        </div>
      )}
      <div className="mt-2 flex items-center gap-2">
        <input
          type="text"
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="URL ảnh, hoặc chọn ảnh để tải lên"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
        />
        <label className="shrink-0 cursor-pointer rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50">
          {uploading ? "Đang tải..." : "Chọn ảnh"}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
