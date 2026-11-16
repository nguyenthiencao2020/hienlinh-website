export default function Loading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center" aria-busy="true">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-green/20 border-t-brand-green" />
      <span className="sr-only">Đang tải…</span>
    </div>
  );
}
