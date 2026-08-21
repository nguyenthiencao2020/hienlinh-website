import { createNews } from "../actions";
import { NewsForm } from "../news-form";

export default function NewNewsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">Bài viết mới</h1>
      <div className="mt-6">
        <NewsForm action={createNews} />
      </div>
    </div>
  );
}
