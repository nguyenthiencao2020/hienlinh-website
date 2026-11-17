"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { submitVolunteer } from "./actions";
import { INPUT_CLASS, SUBMIT_CLASS, SUCCESS_CLASS } from "@/lib/form-styles";

export type AreaOption = { slug: string; name: string };

export function VolunteerForm({ areas }: { areas: AreaOption[] }) {
  // Đến từ trang lĩnh vực/cơ sở (?linh-vuc=y-te) thì chọn sẵn lĩnh vực đó.
  const searchParams = useSearchParams();
  const preset = areas.find((a) => a.slug === searchParams.get("linh-vuc"))?.name ?? "";
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
    return <div className={SUCCESS_CLASS}>Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ lại sớm nhất.</div>;
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="full_name" required placeholder="Họ và tên *" autoComplete="name" className={INPUT_CLASS} />
        <input name="phone" type="tel" required placeholder="Điện thoại *" autoComplete="tel" pattern="[0-9 +().-]{8,}" title="Số điện thoại gồm ít nhất 8 chữ số" className={INPUT_CLASS} />
      </div>
      <input name="email" type="email" required placeholder="Email *" autoComplete="email" className={INPUT_CLASS} />
      <select key={preset} name="interest" defaultValue={preset} className={INPUT_CLASS}>
        <option value="">Chọn lĩnh vực bạn quan tâm</option>
        {areas.map((a) => (
          <option key={a.slug} value={a.name}>
            {a.name}
          </option>
        ))}
        <option value="Khác">Khác</option>
      </select>
      {state === "error" && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={isPending} className={SUBMIT_CLASS}>
        {isPending ? "Đang gửi..." : "Đăng ký tình nguyện"}
      </button>
    </form>
  );
}
