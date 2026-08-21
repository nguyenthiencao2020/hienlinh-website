"use client";

import { useState, useTransition } from "react";
import { submitVolunteer } from "./actions";

const AREAS = ["Giáo dục", "Y tế", "Lưu trú", "Tâm lý", "Thiện nguyện", "Khác"];

export function VolunteerForm() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await submitVolunteer(formData);
      if (res.ok) {
        setState("success");
      } else {
        setState("error");
        setError(res.error);
      }
    });
  }

  if (state === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-green-800">
        Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ lại sớm nhất.
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
          className="rounded-lg border border-zinc-300 px-3 py-2"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email *"
          className="rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>
      <input
        name="phone"
        required
        placeholder="Điện thoại *"
        className="w-full rounded-lg border border-zinc-300 px-3 py-2"
      />
      <select
        name="interest"
        defaultValue=""
        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-700"
      >
        <option value="" disabled>
          Chọn lĩnh vực bạn quan tâm
        </option>
        {AREAS.map((area) => (
          <option key={area} value={area}>
            {area}
          </option>
        ))}
      </select>
      {state === "error" && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-brand-brown px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-brand-brown-dark hover:shadow-lg disabled:opacity-60 disabled:hover:scale-100"
      >
        {isPending ? "Đang gửi..." : "Đăng ký ngay"}
      </button>
    </form>
  );
}
