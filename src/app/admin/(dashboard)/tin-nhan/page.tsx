import { createClient } from "@/lib/supabase/server";
import type { ContactMessage } from "@/lib/types";
import { markMessageStatus } from "./actions";

const KIND_LABEL: Record<ContactMessage["kind"], string> = {
  volunteer: "Tình nguyện viên",
  donation: "Quyên góp",
  contact: "Liên hệ",
};

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<ContactMessage[]>();

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">Tin nhắn / Đăng ký</h1>
      <div className="mt-6 divide-y divide-zinc-200 rounded-xl border border-zinc-200">
        {(messages ?? []).map((msg) => (
          <div key={msg.id} className="flex items-start justify-between gap-4 p-4">
            <div>
              <p className="font-medium text-zinc-900">
                {msg.full_name}{" "}
                <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                  {KIND_LABEL[msg.kind]}
                </span>
                {msg.status === "new" && (
                  <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700">
                    Mới
                  </span>
                )}
              </p>
              <p className="text-xs text-zinc-500">
                {[msg.email, msg.phone].filter(Boolean).join(" · ")}
              </p>
              {msg.message && <p className="mt-2 text-sm text-zinc-700">{msg.message}</p>}
              <p className="mt-1 text-xs text-zinc-400">
                {new Date(msg.created_at).toLocaleString("vi-VN")}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2 text-sm">
              {msg.status !== "read" && (
                <form action={markMessageStatus.bind(null, msg.id, "read")}>
                  <button className="text-amber-800 underline" type="submit">
                    Đánh dấu đã đọc
                  </button>
                </form>
              )}
              {msg.status !== "archived" && (
                <form action={markMessageStatus.bind(null, msg.id, "archived")}>
                  <button className="text-zinc-500 underline" type="submit">
                    Lưu trữ
                  </button>
                </form>
              )}
            </div>
          </div>
        ))}
        {!messages?.length && (
          <p className="p-4 text-sm text-zinc-500">Chưa có tin nhắn nào.</p>
        )}
      </div>
    </div>
  );
}
