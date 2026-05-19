import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { orderStatuses } from "@/lib/constants";
import { prisma } from "@/lib/db";

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

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
}
