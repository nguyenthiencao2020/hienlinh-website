import Image from "next/image";

export function LeafyBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-brand-green-dark">
      <Image
        src="/images/leafy-bg.webp"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
    </div>
  );
}
