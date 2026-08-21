import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Program } from "@/lib/types";

export const revalidate = 60;

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: program } = await supabase
    .from("programs")
    .select("*")
    .eq("slug", slug)
    .maybeSingle<Program>();

  if (!program) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-amber-800">
        Hệ sinh thái Hiển Linh
      </p>
      <h1 className="mt-2 text-3xl font-bold text-zinc-900">{program.name}</h1>
      <p className="mt-4 text-lg text-zinc-600">{program.summary}</p>
      {program.content && (
        <div className="prose prose-zinc mt-8 whitespace-pre-wrap">
          {program.content}
        </div>
      )}
    </article>
  );
}
