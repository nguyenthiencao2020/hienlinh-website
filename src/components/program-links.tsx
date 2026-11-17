import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { LeafIcon } from "@/components/icons";
import { PROGRAM_ICONS } from "@/lib/program-images";
import type { Program } from "@/lib/types";

// Dải thẻ dẫn sang từng lĩnh vực — dùng chung cho trang lĩnh vực và Về Chúng Tôi.
export function ProgramLinks({ programs }: { programs: Pick<Program, "id" | "slug" | "name">[] }) {
  const width =
    programs.length >= 5
      ? "lg:w-[calc(20%-0.8rem)]"
      : "lg:w-[calc(25%-0.75rem)]";
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      {programs.map((p, i) => {
        const Icon = PROGRAM_ICONS[p.slug] ?? LeafIcon;
        return (
          <Reveal key={p.id} delay={i * 60} className={`w-full sm:w-[calc(50%-0.5rem)] ${width}`}>
            <Link
              href={`/hoat-dong/${p.slug}`}
              className="group flex h-full items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-green/15"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green text-white transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </span>
              <span className="flex-1 font-semibold text-brand-green">{p.name}</span>
              <span className="text-brand-green transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
