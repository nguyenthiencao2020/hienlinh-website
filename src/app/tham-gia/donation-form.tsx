"use client";

import { useState, useTransition } from "react";
import { submitDonationIntent } from "./actions";

const PRESET_AMOUNTS = ["100000", "200000", "500000", "1000000"];

export function DonationForm() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [amount, setAmount] = useState("100000");
  const [customAmount, setCustomAmount] = useState("");

  function handleSubmit(formData: FormData) {
    formData.set("amount", amount === "custom" ? customAmount : amount);
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
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-green-800">
        Cảm ơn tấm lòng của bạn! Chúng tôi sẽ liên hệ để xác nhận đóng góp.
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
        <input name="email" type="email" placeholder="Email" className="rounded-lg border border-zinc-300 px-3 py-2" />
      </div>
      <input name="phone" placeholder="Điện thoại" className="w-full rounded-lg border border-zinc-300 px-3 py-2" />

      <div>
        <p className="text-sm font-medium text-zinc-700">Hình thức ủng hộ</p>
        <div className="mt-2 flex gap-3 text-sm">
          <label className="flex items-center gap-2">
            <input type="radio" name="frequency" value="one_time" defaultChecked /> Một lần
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="frequency" value="monthly" /> Định kỳ hàng tháng
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
              className={`rounded-lg border px-4 py-2 ${
                amount === preset
                  ? "border-brand-orange bg-brand-cream text-brand-orange"
                  : "border-zinc-300 text-zinc-700"
              }`}
            >
              {Number(preset).toLocaleString("vi-VN")}đ
            </button>
          ))}
          <button
            type="button"
            onClick={() => setAmount("custom")}
            className={`rounded-lg border px-4 py-2 ${
              amount === "custom"
                ? "border-brand-orange bg-brand-cream text-brand-orange"
                : "border-zinc-300 text-zinc-700"
            }`}
          >
            Khác
          </button>
        </div>
        {amount === "custom" && (
          <input
            type="number"
            min={0}
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Nhập số tiền (đ)"
            className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2"
          />
        )}
      </div>

      {state === "error" && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-brand-orange-dark hover:shadow-lg disabled:opacity-60 disabled:hover:scale-100"
      >
        {isPending ? "Đang gửi..." : "Ủng hộ ngay"}
      </button>
    </form>
  );
}
