type CheckoutOrder = {
  id: string;
  orderNumber: string;
  totalCents: number;
};

type SquarePaymentLinkResponse = {
  payment_link?: {
    id?: string;
    order_id?: string;
    url?: string;
  };
  related_resources?: {
    orders?: Array<{ id?: string }>;
  };
  errors?: Array<{ detail?: string; field?: string; code?: string }>;
};

export const hasSquareConfig = () =>
  Boolean(process.env.SQUARE_ACCESS_TOKEN && process.env.SQUARE_LOCATION_ID);

export const createSquarePaymentLink = async (_order: CheckoutOrder) => {
  if (!hasSquareConfig()) {
    return null;
  }

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  const endpoint =
    process.env.SQUARE_ENVIRONMENT === "production"
      ? "https://connect.squareup.com/v2/online-checkout/payment-links"
      : "https://connect.squareupsandbox.com/v2/online-checkout/payment-links";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      "Square-Version": "2026-04-16"
    },
    body: JSON.stringify({
      idempotency_key: _order.id,
      description: `Hylander Mobile order ${_order.orderNumber}`,
      payment_note: `Hylander Mobile order ${_order.orderNumber}`,
      quick_pay: {
        location_id: process.env.SQUARE_LOCATION_ID,
        name: `Hylander Mobile ${_order.orderNumber}`,
        price_money: {
          amount: _order.totalCents,
          currency: "USD"
        }
      },
      checkout_options: {
        redirect_url: `${siteUrl}/order?order=${encodeURIComponent(_order.orderNumber)}`
      }
    })
  });

  const data = (await response.json()) as SquarePaymentLinkResponse;
  if (!response.ok || !data.payment_link?.url) {
    const message = data.errors?.map((error) => error.detail || error.code).filter(Boolean).join(" ") || "Unable to create Square checkout link.";
    throw new Error(message);
  }

  return {
    mode: "square",
    checkoutUrl: data.payment_link.url,
    orderId: _order.id,
    orderNumber: _order.orderNumber,
    paymentLinkId: data.payment_link.id,
    squareOrderId: data.payment_link.order_id || data.related_resources?.orders?.[0]?.id
  };
};
