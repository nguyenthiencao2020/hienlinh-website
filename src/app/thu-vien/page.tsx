import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

export default async function GalleryPage() {
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
      <PageHero title="Thư Viện" subtitle="Hình ảnh & video hoạt động" crumbLabel="Thư Viện" />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          {images.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {images.map((img) => (
                <div key={img.name} className="relative aspect-square overflow-hidden rounded-xl">
                  <Image src={img.url} alt={img.name} fill className="object-cover" sizes="25vw" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-500">
              Chưa có hình ảnh/video nào trong thư viện. Quản trị viên có thể tải
              lên qua trang <code>/admin/thu-vien</code>.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
