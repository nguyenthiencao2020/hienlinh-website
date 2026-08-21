export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-zinc-600">
        <p className="font-medium text-zinc-800">Doanh Nghiệp Xã Hội Hiển Linh</p>
        <p className="mt-1">Nơi ánh sáng chạm trái tim.</p>
        <p className="mt-4">
          © {new Date().getFullYear()} DNXH Hiển Linh. Mọi quyền được bảo lưu.
        </p>
      </div>
    </footer>
  );
}
