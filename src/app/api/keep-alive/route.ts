import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Gọi định kỳ bởi Vercel Cron (xem vercel.json) chỉ để tạo 1 request
// thật tới Supabase — free tier tự pause project sau ~1 tuần không
// có hoạt động nào.
export async function GET() {
  const supabase = await createClient();
  const { error } = await supabase.from("programs").select("id").limit(1);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, pingedAt: new Date().toISOString() });
}
