"use client";

import { useState, useTransition } from "react";
import { submitDonationIntent } from "./actions";
import { INPUT_CLASS, SUBMIT_CLASS, SUCCESS_CLASS } from "@/lib/form-styles";

const PRESET_AMOUNTS = ["100000", "200000", "500000", "1000000"];

export function DonationForm() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [amount, setAmount] = useState("100000");
  const [customAmount, setCustomAmount] = useState("");

  function handleSubmit(formData: FormData) {
    const value = amount === "custom" ? customAmount : amount;
    if (amount === "custom" && !(Number(value) > 0)) {
      setState("error");
      setError("Vui lòng nhập số tiền bạn muốn ủng hộ.");
      return;
    }
    formData.set("amount", value);
    startTransition(async () => {
      const res = await submitDonationIntent(formData);
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
      <div className={SUCCESS_CLASS}>
        Cảm ơn tấm lòng của bạn! Chúng tôi sẽ liên hệ để xác nhận và hướng dẫn cách đóng góp.
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
        <input name="email" type="email" placeholder="Email" autoComplete="email" className={INPUT_CLASS} />
      </div>
      <input name="phone" type="tel" autoComplete="tel" placeholder="Điện thoại" className={INPUT_CLASS} />

      <div>
        <p className="text-sm font-medium text-zinc-700">Hình thức ủng hộ</p>
        <div className="mt-2 flex gap-3 text-sm">
          <label className="flex items-center gap-2">
            <input type="radio" name="frequency" value="one_time" defaultChecked className="accent-brand-orange" /> Một lần
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="frequency" value="monthly" className="accent-brand-orange" /> Định kỳ hàng tháng
          </label>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-zinc-700">Chọn mức ủng hộ</p>
        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          {PRESET_AMOUNTS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAmount(preset)}
              className={`rounded-full border px-4 py-2 font-medium transition-colors ${
                amount === preset
                  ? "border-brand-orange bg-brand-orange text-white"
                  : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-brand-orange/50"
              }`}
            >
              {Number(preset).toLocaleString("vi-VN")}đ
            </button>
          ))}
          <button
            type="button"
            onClick={() => setAmount("custom")}
            className={`rounded-full border px-4 py-2 font-medium transition-colors ${
              amount === "custom"
                ? "border-brand-orange bg-brand-orange text-white"
                : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-brand-orange/50"
            }`}
          >
            Khác
          </button>
        </div>
        {amount === "custom" && (
          <input
            type="number"
            min={1000}
            step={1000}
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Nhập số tiền (đ)"
            className={`mt-2 ${INPUT_CLASS}`}
          />
        )}
      </div>

      {state === "error" && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className={SUBMIT_CLASS}
      >
        {isPending ? "Đang gửi..." : "Ủng hộ ngay"}
      </button>
    </form>
  );
}
