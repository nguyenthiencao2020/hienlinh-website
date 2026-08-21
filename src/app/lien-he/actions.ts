"use server";

import { createClient } from "@/lib/supabase/server";

export type SubmitMessageResult = { ok: true } | { ok: false; error: string };

export async function submitContactMessage(
  formData: FormData,
): Promise<SubmitMessageResult> {
  const kind = String(formData.get("kind") ?? "");
  const full_name = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!["volunteer", "donation", "contact"].includes(kind)) {
    return { ok: false, error: "Loại yêu cầu không hợp lệ." };
  }
  if (!full_name) {
    return { ok: false, error: "Vui lòng nhập họ tên." };
  }
  if (!email && !phone) {
    return { ok: false, error: "Vui lòng nhập email hoặc số điện thoại." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    kind,
    full_name,
    email: email || null,
    phone: phone || null,
    message: message || null,
  });

  if (error) {
    return { ok: false, error: "Có lỗi xảy ra, vui lòng thử lại." };
  }

  return { ok: true };
}
