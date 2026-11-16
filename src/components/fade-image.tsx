"use client";

import NextImage, { type ImageProps } from "next/image";
import { useState } from "react";

// next/image hiện dần khi tải xong thay vì "nháy" vào.
export default function FadeImage({ className = "", onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <NextImage
      {...props}
      data-loaded={loaded}
      className={`fade-img ${className}`}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
    />
  );
}
