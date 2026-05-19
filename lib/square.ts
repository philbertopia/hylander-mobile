import type { Order } from "@prisma/client";

export const hasSquareConfig = () =>
  Boolean(process.env.SQUARE_ACCESS_TOKEN && process.env.SQUARE_LOCATION_ID);

export const createSquarePaymentLink = async (_order: Order) => {
  if (!hasSquareConfig()) {
    return null;
  }

  // Square hosted checkout will be wired here once API keys are available.
  // V1 keeps the route shape stable and falls back to local mock checkout.
  return null;
};

