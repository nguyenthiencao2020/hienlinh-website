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
        Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="full_name"
          required
          placeholder="Họ và tên *"
          className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-brand-green focus:bg-white focus:ring-2 focus:ring-brand-green/15"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email *"
          className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-brand-green focus:bg-white focus:ring-2 focus:ring-brand-green/15"
        />
      </div>
      <input
        name="subject"
        required
        placeholder="Tiêu đề *"
        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-brand-green focus:bg-white focus:ring-2 focus:ring-brand-green/15"
      />
      <textarea
        name="message"
        rows={6}
        required
        placeholder="Nội dung tin nhắn *"
        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-brand-green focus:bg-white focus:ring-2 focus:ring-brand-green/15"
      />
      {result === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-brand-orange-dark hover:shadow-lg disabled:opacity-60 disabled:hover:scale-100"
      >
        {isPending ? "Đang gửi..." : "Gửi tin nhắn"}
      </button>
    </form>
  );
}
