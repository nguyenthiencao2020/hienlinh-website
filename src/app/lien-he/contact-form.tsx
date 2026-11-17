"use client";

import { useState, useTransition } from "react";
import { submitContactMessage } from "./actions";
import { INPUT_CLASS, SUBMIT_CLASS, SUCCESS_CLASS } from "@/lib/form-styles";

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
      <div className={SUCCESS_CLASS}>
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
          className={INPUT_CLASS}
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email *"
          className={INPUT_CLASS}
        />
      </div>
      <input
        name="subject"
        required
        placeholder="Tiêu đề *"
        className={INPUT_CLASS}
      />
      <textarea
        name="message"
        rows={6}
        required
        placeholder="Nội dung tin nhắn *"
        className={INPUT_CLASS}
      />
      {result === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}
      <button
        type="submit"
        disabled={isPending}
        className={SUBMIT_CLASS}
      >
        {isPending ? "Đang gửi..." : "Gửi tin nhắn"}
      </button>
    </form>
  );
}
