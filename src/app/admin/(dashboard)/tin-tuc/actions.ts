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

function readNewsForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  return {
    title,
    slug: slugify(String(formData.get("slug") || title)),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    content: String(formData.get("content") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim() || null,
    cover_image_url: String(formData.get("cover_image_url") ?? "").trim() || null,
    is_featured: formData.get("is_featured") === "on",
    is_success_story: formData.get("is_success_story") === "on",
    published: formData.get("published") === "on",
  };
}

export async function createNews(formData: FormData) {
  const values = readNewsForm(formData);
  const supabase = await createClient();
  const { error } = await supabase.from("news").insert({
    ...values,
    published_at: values.published ? new Date().toISOString() : null,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/tin-tuc");
  revalidatePath("/");
  revalidatePath("/admin/tin-tuc");
  redirect("/admin/tin-tuc");
}

export async function updateNews(id: string, formData: FormData) {
  const values = readNewsForm(formData);
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("news")
    .select("published, published_at")
    .eq("id", id)
    .maybeSingle();

  const published_at =
    values.published && !existing?.published_at
      ? new Date().toISOString()
      : existing?.published_at ?? null;

  const { error } = await supabase
    .from("news")
    .update({ ...values, published_at, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/tin-tuc");
  revalidatePath("/");
  revalidatePath("/admin/tin-tuc");
  redirect("/admin/tin-tuc");
}

export async function deleteNews(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("news").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/tin-tuc");
  revalidatePath("/");
  revalidatePath("/admin/tin-tuc");
}
