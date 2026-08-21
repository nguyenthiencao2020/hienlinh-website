"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function readFacilityForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  return {
    name,
    slug: slugify(String(formData.get("slug") || name)),
    program_slug: String(formData.get("program_slug") ?? "").trim() || null,
    address: String(formData.get("address") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim(),
    cover_image_url: String(formData.get("cover_image_url") ?? "").trim() || null,
  };
}

export async function createFacility(formData: FormData) {
  const values = readFacilityForm(formData);
  const supabase = await createClient();
  const { error } = await supabase.from("facilities").insert(values);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/hoat-dong");
  revalidatePath("/admin/co-so");
  redirect("/admin/co-so");
}

export async function updateFacility(id: string, formData: FormData) {
  const values = readFacilityForm(formData);
  const supabase = await createClient();
  const { error } = await supabase
    .from("facilities")
    .update({ ...values, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/hoat-dong");
  revalidatePath("/admin/co-so");
  redirect("/admin/co-so");
}

export async function deleteFacility(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("facilities").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/hoat-dong");
  revalidatePath("/admin/co-so");
}
