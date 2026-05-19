import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { orderStatuses, paymentStatuses } from "@/lib/constants";
import { checkoutSchema, calculateOrder, createOrderNumber, validateDeliveryArea } from "@/lib/orders";
import { isOrderingOpen } from "@/lib/hours";
import { createSquarePaymentLink } from "@/lib/square";
import { activeVenue } from "@/lib/venues";

export async function POST(request: Request) {
  try {
    const input = checkoutSchema.parse(await request.json());
    validateDeliveryArea(input);

    if (!isOrderingOpen(input.fulfillmentType)) {
      return NextResponse.json({ error: "Ordering is currently closed for that fulfillment type." }, { status: 400 });
    }

    const totals = calculateOrder(input);
    const order = await prisma.order.create({
      data: {
        orderNumber: createOrderNumber(),
        venueId: activeVenue.id,
        fulfillmentType: input.fulfillmentType,
        status: orderStatuses.pendingPayment,
        paymentStatus: paymentStatuses.pending,
        subtotalCents: totals.subtotalCents,
        deliveryFeeCents: totals.deliveryFeeCents,
        taxCents: totals.taxCents,
        totalCents: totals.totalCents,
        customerName: input.customerName,
        customerPhone: input.customerPhone,
        customerEmail: input.customerEmail || null,
        deliveryAddress: input.deliveryAddress || null,
        deliveryCity: input.deliveryCity || null,
        deliveryState: input.deliveryState || null,
        deliveryZip: input.deliveryZip || null,
        customerNotes: input.customerNotes || null,
        items: {
          create: totals.lineItems.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            unitPriceCents: item.unitPriceCents,
            modifiersJson: JSON.stringify(item.modifiers),
            lineTotalCents: item.lineTotalCents
          }))
        }
      }
    });

    const paymentLink = await createSquarePaymentLink(order);
    if (paymentLink) {
      return NextResponse.json(paymentLink);
    }

    const paidOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        status: orderStatuses.paid,
        paymentStatus: paymentStatuses.paid
      }
    });

    return NextResponse.json({
      mode: "mock",
      orderId: paidOrder.id,
      orderNumber: paidOrder.orderNumber
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create order." }, { status: 400 });
  }
}
