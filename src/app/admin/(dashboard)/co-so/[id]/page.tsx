import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Facility } from "@/lib/types";
import { updateFacility } from "../actions";
import { FacilityForm } from "../facility-form";

export default async function EditFacilityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: facility } = await supabase
    .from("facilities")
    .select("*")
    .eq("id", id)
    .maybeSingle<Facility>();

  if (!facility) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">Sửa cơ sở</h1>
      <div className="mt-6">
        <FacilityForm action={updateFacility.bind(null, id)} facility={facility} />
      </div>
    </div>
  );
}
