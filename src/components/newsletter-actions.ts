"use server";

import { createClient } from "@/lib/supabase/server";

export type NewsletterResult = { ok: true } | { ok: false; error: string };

export async function subscribeNewsletter(formData: FormData): Promise<NewsletterResult> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email || !email.includes("@")) {
    return { ok: false, error: "Email không hợp lệ." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("newsletter_subscribers").insert({ email });

  if (error && error.code !== "23505") {
    return { ok: false, error: "Có lỗi xảy ra, vui lòng thử lại." };
  }

  return { ok: true };
}
