import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Facility } from "@/lib/types";
import { deleteFacility } from "./actions";

export default async function AdminFacilitiesPage() {
  const supabase = await createClient();
  const { data: facilities } = await supabase
    .from("facilities")
    .select("*")
    .order("sort_order", { ascending: true })
    .returns<Facility[]>();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">Cơ sở</h1>
        <Link
          href="/admin/co-so/moi"
          className="rounded-full bg-amber-800 px-4 py-2 text-sm font-medium text-white hover:bg-amber-900"
        >
          + Cơ sở mới
        </Link>
      </div>
      <div className="mt-6 divide-y divide-zinc-200 rounded-xl border border-zinc-200">
        {(facilities ?? []).map((facility) => (
          <div key={facility.id} className="flex items-center justify-between gap-4 p-4">
            <div>
              <p className="font-medium text-zinc-900">{facility.name}</p>
              <p className="text-xs text-zinc-500">/{facility.slug}</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Link href={`/admin/co-so/${facility.id}`} className="text-amber-800 underline">
                Sửa
              </Link>
              <form action={deleteFacility.bind(null, facility.id)}>
                <button className="text-red-600 underline" type="submit">
                  Xoá
                </button>
              </form>
            </div>
          </div>
        ))}
        {!facilities?.length && <p className="p-4 text-sm text-zinc-500">Chưa có cơ sở nào.</p>}
      </div>
    </div>
  );
}
