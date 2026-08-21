"use server";

import { createClient } from "@/lib/supabase/server";

export type SubmitResult = { ok: true } | { ok: false; error: string };

export async function submitVolunteer(formData: FormData): Promise<SubmitResult> {
  const full_name = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const interest = String(formData.get("interest") ?? "").trim();

  if (!full_name || !email || !phone) {
    return { ok: false, error: "Vui lòng nhập đầy đủ họ tên, email và số điện thoại." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    kind: "volunteer",
    full_name,
    email,
    phone,
    interest: interest || null,
  });

  if (error) {
    return { ok: false, error: "Có lỗi xảy ra, vui lòng thử lại." };
  }
  return { ok: true };
}

export async function submitDonationIntent(formData: FormData): Promise<SubmitResult> {
  const full_name = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const frequency = String(formData.get("frequency") ?? "one_time");
  const amountRaw = String(formData.get("amount") ?? "").replace(/\D/g, "");
  const amount = amountRaw ? Number(amountRaw) : null;

  if (!full_name || (!email && !phone)) {
    return { ok: false, error: "Vui lòng nhập họ tên và email hoặc số điện thoại." };
  }
  if (!["one_time", "monthly"].includes(frequency)) {
    return { ok: false, error: "Hình thức ủng hộ không hợp lệ." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    kind: "donation",
    full_name,
    email: email || null,
    phone: phone || null,
    donation_amount: amount,
    donation_frequency: frequency,
  });

  if (error) {
    return { ok: false, error: "Có lỗi xảy ra, vui lòng thử lại." };
  }
  return { ok: true };
}
