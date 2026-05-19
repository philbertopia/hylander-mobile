import { NextResponse } from "next/server";

export async function POST() {
  // Placeholder until Square sandbox keys and webhook signature key are available.
  return NextResponse.json({ ok: true, mode: "not_configured" });
}

