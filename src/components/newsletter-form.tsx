"use client";

import { useState, useTransition } from "react";
import { subscribeNewsletter } from "./newsletter-actions";

export function NewsletterForm() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await subscribeNewsletter(formData);
      setState(res.ok ? "success" : "error");
    });
  }

  if (state === "success") {
    return <p className="text-sm text-amber-200">Đã đăng ký nhận tin, cảm ơn bạn!</p>;
  }

  return (
    <form action={handleSubmit} className="flex gap-2">
      <input
        type="email"
        name="email"
        required
        placeholder="Nhập email của bạn"
        className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-zinc-400 focus:outline-none"
      />
      <button
        type="submit"
        disabled={isPending}
        aria-label="Đăng ký nhận tin"
        className="shrink-0 rounded-full bg-brand-orange px-4 py-2 text-sm font-medium text-white hover:bg-brand-orange-dark disabled:opacity-60"
      >
        ➤
      </button>
    </form>
  );
}
