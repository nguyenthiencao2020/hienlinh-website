import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { NewsPost } from "@/lib/types";
import { updateNews } from "../actions";
import { NewsForm } from "../news-form";

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: news } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .maybeSingle<NewsPost>();

  if (!news) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">Sửa bài viết</h1>
      <div className="mt-6">
        <NewsForm action={updateNews.bind(null, id)} news={news} />
      </div>
    </div>
  );
}
