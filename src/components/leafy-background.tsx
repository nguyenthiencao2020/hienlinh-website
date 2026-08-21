function Leaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 160" fill="none" className={className} aria-hidden="true">
      <path
        d="M50 4C74 30 88 62 88 92c0 34-17 60-38 64-21-4-38-30-38-64 0-30 14-62 38-88Z"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path d="M50 20V150" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function LeafyBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 85% 10%, rgba(212,175,55,0.28), transparent 45%), linear-gradient(135deg, #0b2f24 0%, #123a2e 55%, #1c4d3b 100%)",
        }}
      />
      <Leaf className="absolute -left-6 -top-10 h-64 w-40 rotate-[18deg] text-white/10" />
      <Leaf className="absolute -bottom-16 left-10 h-56 w-36 -rotate-[12deg] text-white/10" />
      <Leaf className="absolute -bottom-20 right-8 h-72 w-44 rotate-[150deg] text-white/10" />
      <Leaf className="absolute -right-10 top-1/3 h-48 w-28 rotate-[70deg] text-white/[0.06]" />
    </div>
  );
}
