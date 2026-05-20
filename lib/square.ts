import https from "node:https";

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

const postJson = async (url: string, body: unknown) =>
  new Promise<{ ok: boolean; status: number; json: SquarePaymentLinkResponse }>((resolve, reject) => {
    const payload = JSON.stringify(body);
    const request = https.request(
      url,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload),
          "Square-Version": "2026-04-16"
        },
        timeout: 20000
      },
      (response) => {
        let responseBody = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          responseBody += chunk;
        });
        response.on("end", () => {
          try {
            resolve({
              ok: Boolean(response.statusCode && response.statusCode >= 200 && response.statusCode < 300),
              status: response.statusCode || 0,
              json: responseBody ? (JSON.parse(responseBody) as SquarePaymentLinkResponse) : {}
            });
          } catch (error) {
            reject(error);
          }
        });
      }
    );

    request.on("timeout", () => {
      request.destroy(new Error("Square checkout request timed out."));
    });
    request.on("error", reject);
    request.write(payload);
    request.end();
  });

export const createSquarePaymentLink = async (_order: CheckoutOrder) => {
  if (!hasSquareConfig()) {
    return null;
  }

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  const endpoint =
    process.env.SQUARE_ENVIRONMENT === "production"
      ? "https://connect.squareup.com/v2/online-checkout/payment-links"
      : "https://connect.squareupsandbox.com/v2/online-checkout/payment-links";

  const response = await postJson(endpoint, {
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
  });

  const data = response.json;
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
