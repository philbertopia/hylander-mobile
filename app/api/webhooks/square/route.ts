import { createHmac, timingSafeEqual } from "crypto";
import { type NextRequest, NextResponse } from "next/server";
import { DatabaseUnavailableError, getPrisma } from "@/lib/db";
import { orderStatuses, paymentStatuses } from "@/lib/constants";

export const runtime = "nodejs";

const verifySignature = (body: string, signature: string, webhookUrl: string, key: string): boolean => {
  const hash = createHmac("sha256", key).update(webhookUrl + body).digest("base64");
  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(hash));
  } catch {
    return false;
  }
};

export async function POST(request: NextRequest) {
  const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
  if (!signatureKey) {
    return NextResponse.json({ ok: true, mode: "not_configured" });
  }

  const body = await request.text();
  const signature = request.headers.get("x-square-hmacsha256-signature") ?? "";
  const webhookUrl = `${(process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "")}/api/webhooks/square`;

  if (!signature || !verifySignature(body, signature, webhookUrl, signatureKey)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  let event: { type?: string; data?: { object?: { payment?: { order_id?: string } } } };
  try {
    event = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (event.type === "payment.completed") {
    const squareOrderId = event.data?.object?.payment?.order_id;
    if (squareOrderId) {
      try {
        const prisma = await getPrisma();
        await prisma.order.updateMany({
          where: { squareOrderId, paymentStatus: { not: paymentStatuses.paid } },
          data: { status: orderStatuses.paid, paymentStatus: paymentStatuses.paid }
        });
      } catch (error) {
        if (!(error instanceof DatabaseUnavailableError)) {
          console.error("Webhook DB error:", error);
          return NextResponse.json({ error: "Internal error." }, { status: 500 });
        }
      }
    }
  }

  return NextResponse.json({ ok: true });
}
