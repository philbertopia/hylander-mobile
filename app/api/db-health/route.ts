import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const databaseSource = process.env.DATABASE_URL ? "DATABASE_URL" : process.env.POSTGRES_PRISMA_URL ? "POSTGRES_PRISMA_URL" : "missing";
    const prisma = await getPrisma();
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, databaseSource });
  } catch (error) {
    const errorName = error instanceof Error ? error.name : "DatabaseError";
    const errorCode = typeof error === "object" && error && "code" in error && typeof error.code === "string" ? error.code : null;
    const message =
      error instanceof Error
        ? error.message.replace(/postgres(?:ql)?:\/\/[^\s"'`]+/g, "postgresql://[redacted]").slice(0, 220)
        : null;
    return NextResponse.json({ ok: false, error: errorName, code: errorCode, message }, { status: 503 });
  }
}
