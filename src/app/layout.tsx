import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "DNXH Hiển Linh — Nơi ánh sáng chạm trái tim",
  description:
    "Doanh Nghiệp Xã Hội Hiển Linh đồng hành cùng người yếu thế qua Giáo dục, Y tế, Lưu trú, Tâm lý và các hoạt động thiện nguyện.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
