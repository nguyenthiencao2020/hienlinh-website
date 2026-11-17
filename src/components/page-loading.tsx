export function PageLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" aria-busy="true">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-green/20 border-t-brand-green" />
      <span className="sr-only">Đang tải…</span>
    </div>
  );
}
