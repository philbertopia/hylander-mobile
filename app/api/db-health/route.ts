import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const prisma = await getPrisma();
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true });
  } catch (error) {
    const errorName = error instanceof Error ? error.name : "DatabaseError";
    return NextResponse.json({ ok: false, error: errorName }, { status: 503 });
  }
}
