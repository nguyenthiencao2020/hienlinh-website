"use client";

import { useState, useTransition } from "react";
import { submitContactMessage } from "./actions";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await submitContactMessage(formData);
      if (res.ok) {
        setResult("success");
      } else {
        setResult("error");
        setErrorMessage(res.error);
      }
    });
  }

  if (result === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-green-800">
        Cảm ơn bạn! Chúng tôi đã nhận được thông tin và sẽ liên hệ lại sớm nhất.
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-700">Tôi muốn</label>
        <select
          name="kind"
          defaultValue="volunteer"
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        >
          <option value="volunteer">Đăng ký làm tình nguyện viên</option>
          <option value="donation">Quyên góp / Đồng hành</option>
          <option value="contact">Liên hệ khác</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700">Họ và tên *</label>
        <input
          name="full_name"
          required
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-zinc-700">Email</label>
          <input
            name="email"
            type="email"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700">Số điện thoại</label>
          <input
            name="phone"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700">Lời nhắn</label>
        <textarea
          name="message"
          rows={4}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>
      {result === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-amber-800 px-6 py-3 text-sm font-medium text-white hover:bg-amber-900 disabled:opacity-60"
      >
        {isPending ? "Đang gửi..." : "Gửi"}
      </button>
    </form>
  );
}
