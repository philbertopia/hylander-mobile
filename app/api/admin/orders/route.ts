import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { orderStatuses } from "@/lib/constants";
import { DatabaseUnavailableError, getPrisma } from "@/lib/db";

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const prisma = await getPrisma();
    const orders = await prisma.order.findMany({
      where: {
        status: {
          in: [
            orderStatuses.paid,
            orderStatuses.accepted,
            orderStatuses.preparing,
            orderStatuses.ready,
            orderStatuses.outForDelivery,
            orderStatuses.delivered,
            orderStatuses.canceled
          ]
        }
      },
      include: { items: true },
      orderBy: { createdAt: "desc" },
      take: 80
    });

    return NextResponse.json({ orders });
  } catch (error) {
    if (error instanceof DatabaseUnavailableError) {
      return NextResponse.json({ error: "Order database is not configured for this preview deployment.", orders: [] }, { status: 503 });
    }

    return NextResponse.json({ error: "Unable to load orders." }, { status: 500 });
  }
}
