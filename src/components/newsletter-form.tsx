"use client";

import { useState, useTransition } from "react";
import { subscribeNewsletter } from "./newsletter-actions";
import { SendIcon } from "./icons";

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
    return <p className="text-sm text-brand-brown-light">Đã đăng ký nhận tin, cảm ơn bạn!</p>;
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
        className="flex shrink-0 items-center justify-center rounded-full bg-brand-brown p-2.5 text-white hover:bg-brand-brown-dark disabled:opacity-60"
      >
        <SendIcon className="h-4 w-4" />
      </button>
    </form>
  );
}
