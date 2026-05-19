import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { orderStatuses } from "@/lib/constants";
import { prisma } from "@/lib/db";

const allowedStatuses = new Set([
  orderStatuses.accepted,
  orderStatuses.preparing,
  orderStatuses.ready,
  orderStatuses.outForDelivery,
  orderStatuses.delivered,
  orderStatuses.canceled
]);

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { status } = await request.json();
  if (!allowedStatuses.has(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const order = await prisma.order.update({
    where: { id: params.id },
    data: { status },
    include: { items: true }
  });

  return NextResponse.json({ order });
}
