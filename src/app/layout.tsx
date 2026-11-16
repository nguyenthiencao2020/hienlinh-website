import type { Metadata } from "next";
import { ViewTransition } from "react";
import "./globals.css";
import { BackToTop } from "@/components/back-to-top";
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
        <noscript>
          <style>{`.reveal, .fade-img { opacity: 1 !important; }`}</style>
        </noscript>
        <SiteHeader />
        <main className="flex-1">
          <ViewTransition>{children}</ViewTransition>
        </main>
        <SiteFooter />
        <BackToTop />
      </body>
    </html>
  );
}
