"use server";

import { createClient } from "@/lib/supabase/server";

export type SubmitMessageResult = { ok: true } | { ok: false; error: string };

export async function submitContactMessage(
  formData: FormData,
): Promise<SubmitMessageResult> {
  const full_name = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!full_name || !email) {
    return { ok: false, error: "Vui lòng nhập họ tên và email." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    kind: "contact",
    full_name,
    email,
    interest: subject || null,
    message: message || null,
  });

  if (error) {
    return { ok: false, error: "Có lỗi xảy ra, vui lòng thử lại." };
  }

  return { ok: true };
}
