import { NextResponse } from "next/server";
import { setAdminCookie, verifyAdminPassword } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const { password } = await request.json();
  if (!verifyAdminPassword(String(password || ""))) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  setAdminCookie();
  return NextResponse.json({ ok: true });
}

