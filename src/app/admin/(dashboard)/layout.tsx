import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./actions";

const NAV = [
  { href: "/admin", label: "Tổng quan" },
  { href: "/admin/tin-tuc", label: "Tin tức" },
  { href: "/admin/co-so", label: "Cơ sở" },
  { href: "/admin/tin-nhan", label: "Tin nhắn / Đăng ký" },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <div className="mx-auto flex max-w-6xl gap-8 px-6 py-10">
      <aside className="w-48 shrink-0">
        <nav className="space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 border-t border-zinc-200 pt-4 text-xs text-zinc-500">
          <p className="truncate">{data.user?.email}</p>
          <form action={signOut}>
            <button className="mt-2 text-amber-800 underline" type="submit">
              Đăng xuất
            </button>
          </form>
        </div>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}
