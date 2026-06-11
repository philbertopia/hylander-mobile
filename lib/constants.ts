export const deliveryFeeCents = 500;
export const taxRate = 0;

export const orderStatuses = {
  draft: "DRAFT",
  pendingPayment: "PENDING_PAYMENT",
  paid: "PAID",
  accepted: "ACCEPTED",
  preparing: "PREPARING",
  ready: "READY",
  outForDelivery: "OUT_FOR_DELIVERY",
  delivered: "DELIVERED",
  canceled: "CANCELED"
} as const;

export const paymentStatuses = {
  unpaid: "UNPAID",
  pending: "PENDING",
  paid: "PAID",
  failed: "FAILED",
  refunded: "REFUNDED"
} as const;

export const allowedDeliveryZips = ["12401"];

export const businessConfig = {
  name: "Hylander Mobile",
  city: "Kingston",
  state: "NY",
  email: "h.rappaportculinary@gmail.com",
  instagram: "https://www.instagram.com/hylander.mobile",
  truckAddress: "Kingston, NY",
  pickupInstructions: "Pick up at the Hylander Mobile truck window.",
  deliveryInstructions: "Local delivery only. A Hylander Mobile delivery person will bring your order."
};

export const weeklyHours = {
  pickup: {
    monday: { open: "11:00", close: "20:00" },
    tuesday: { open: "11:00", close: "20:00" },
    wednesday: { open: "11:00", close: "20:00" },
    thursday: { open: "11:00", close: "20:00" },
    friday: { open: "11:00", close: "21:00" },
    saturday: { open: "11:00", close: "21:00" },
    sunday: { open: "12:00", close: "19:00" }
  },
  delivery: {
    monday: { open: "12:00", close: "19:30" },
    tuesday: { open: "12:00", close: "19:30" },
    wednesday: { open: "12:00", close: "19:30" },
    thursday: { open: "12:00", close: "19:30" },
    friday: { open: "12:00", close: "20:30" },
    saturday: { open: "12:00", close: "20:30" },
    sunday: { open: "12:00", close: "18:30" }
  }
} as const;
