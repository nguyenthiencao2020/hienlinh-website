import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { createClient } from "@/lib/supabase/server";
import type { Facility, NewsPost, Program } from "@/lib/types";

export const revalidate = 0;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  let programs: Program[] = [];
  let facilities: Facility[] = [];
  let news: NewsPost[] = [];

  if (query) {
    const supabase = await createClient();
    const like = `%${query}%`;
    const [programsRes, facilitiesRes, newsRes] = await Promise.all([
      supabase.from("programs").select("*").ilike("name", like).returns<Program[]>(),
      supabase.from("facilities").select("*").ilike("name", like).returns<Facility[]>(),
      supabase
        .from("news")
        .select("*")
        .eq("published", true)
        .ilike("title", like)
        .returns<NewsPost[]>(),
    ]);
    programs = programsRes.data ?? [];
    facilities = facilitiesRes.data ?? [];
    news = newsRes.data ?? [];
  }

  const totalResults = programs.length + facilities.length + news.length;

  return (
    <div>
      <PageHero title="Tìm Kiếm" crumbLabel="Tìm Kiếm" />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <form className="flex gap-2">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Nhập từ khoá tìm kiếm..."
              className="w-full rounded-full border border-zinc-300 px-5 py-3"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white hover:bg-brand-orange-dark"
            >
              Tìm
            </button>
          </form>

          {query && (
            <div className="mt-8">
              {totalResults === 0 ? (
                <p className="text-sm text-zinc-500">
                  Không tìm thấy kết quả nào cho &quot;{query}&quot;.
                </p>
              ) : (
                <div className="space-y-8">
                  {!!programs.length && (
                    <div>
                      <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-brown">
                        Lĩnh vực hoạt động
                      </h2>
                      <ul className="mt-2 space-y-1">
                        {programs.map((p) => (
                          <li key={p.id}>
                            <Link href={`/hoat-dong/${p.slug}`} className="text-brand-green hover:underline">
                              {p.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {!!facilities.length && (
                    <div>
                      <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-brown">
                        Cơ sở
                      </h2>
                      <ul className="mt-2 space-y-1">
                        {facilities.map((f) => (
                          <li key={f.id}>
                            <Link href={`/co-so/${f.slug}`} className="text-brand-green hover:underline">
                              {f.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {!!news.length && (
                    <div>
                      <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-brown">
                        Tin tức
                      </h2>
                      <ul className="mt-2 space-y-1">
                        {news.map((n) => (
                          <li key={n.id}>
                            <Link href={`/tin-tuc/${n.slug}`} className="text-brand-green hover:underline">
                              {n.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
