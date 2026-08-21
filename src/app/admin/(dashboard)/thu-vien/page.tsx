import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { GalleryUploadForm } from "./upload-form";

export default async function AdminGalleryPage() {
  const supabase = await createClient();
  const { data: files } = await supabase.storage.from("media").list("thu-vien", {
    limit: 100,
    sortBy: { column: "created_at", order: "desc" },
  });

  const images = (files ?? [])
    .filter((f) => f.name && !f.name.endsWith("/"))
    .map((f) => {
      const { data } = supabase.storage.from("media").getPublicUrl(`thu-vien/${f.name}`);
      return { name: f.name, url: data.publicUrl };
    });

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">Thư viện</h1>
      <div className="mt-6">
        <GalleryUploadForm />
      </div>
      <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4">
        {images.map((img) => (
          <div key={img.name} className="relative aspect-square overflow-hidden rounded-lg">
            <Image src={img.url} alt={img.name} fill className="object-cover" sizes="200px" />
          </div>
        ))}
        {!images.length && <p className="text-sm text-zinc-500">Chưa có ảnh nào.</p>}
      </div>
    </div>
  );
}
