import type { NextConfig } from "next";

let supabaseHostname: string | undefined;
try {
  supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
    ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
    : undefined;
} catch {
  supabaseHostname = undefined;
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseHostname
      ? [{ protocol: "https", hostname: supabaseHostname }]
      : [],
    // Next's built-in re-encoder mis-handles orientation on some source
    // photos when serving WebP to the browser (JPEG fallback is fine,
    // WebP isn't) — images here are already resized/compressed upstream,
    // so skip the runtime transform entirely rather than risk it.
    unoptimized: true,
  },
};

export default nextConfig;
