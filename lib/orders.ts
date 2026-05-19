import { z } from "zod";
import { allowedDeliveryZips, deliveryFeeCents, taxRate } from "@/lib/constants";
import { getMenuItem } from "@/lib/menu";

export const checkoutItemSchema = z.object({
  itemId: z.string(),
  quantity: z.number().int().min(1).max(20),
  modifierIds: z.array(z.string()).default([])
});

export const checkoutSchema = z.object({
  fulfillmentType: z.enum(["PICKUP", "DELIVERY"]),
  customerName: z.string().min(2),
  customerPhone: z.string().min(7),
  customerEmail: z.string().email().optional().or(z.literal("")),
  deliveryAddress: z.string().optional(),
  deliveryCity: z.string().optional(),
  deliveryState: z.string().optional(),
  deliveryZip: z.string().optional(),
  customerNotes: z.string().max(600).optional(),
  items: z.array(checkoutItemSchema).min(1)
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export const calculateOrder = (input: CheckoutInput) => {
  const lineItems = input.items.map((inputItem) => {
    const item = getMenuItem(inputItem.itemId);
    if (!item) {
      throw new Error(`Unknown menu item: ${inputItem.itemId}`);
    }

    const modifiers = inputItem.modifierIds.map((modifierId) => {
      const modifier = item.modifiers?.find((option) => option.id === modifierId);
      if (!modifier) {
        throw new Error(`Invalid modifier for ${item.name}: ${modifierId}`);
      }
      return modifier;
    });

    const modifierTotal = modifiers.reduce((sum, modifier) => sum + modifier.priceCents, 0);
    const unitPriceCents = item.priceCents + modifierTotal;
    return {
      name: item.name,
      quantity: inputItem.quantity,
      unitPriceCents,
      modifiers,
      lineTotalCents: unitPriceCents * inputItem.quantity
    };
  });

  const subtotalCents = lineItems.reduce((sum, item) => sum + item.lineTotalCents, 0);
  const deliveryCents = input.fulfillmentType === "DELIVERY" ? deliveryFeeCents : 0;
  const taxCents = Math.round(subtotalCents * taxRate);
  const totalCents = subtotalCents + deliveryCents + taxCents;

  return {
    lineItems,
    subtotalCents,
    deliveryFeeCents: deliveryCents,
    taxCents,
    totalCents
  };
};

export const validateDeliveryArea = (input: CheckoutInput) => {
  if (input.fulfillmentType !== "DELIVERY") {
    return;
  }

  if (!input.deliveryAddress || !input.deliveryCity || !input.deliveryState || !input.deliveryZip) {
    throw new Error("Delivery address is required.");
  }

  if (!allowedDeliveryZips.includes(input.deliveryZip.trim())) {
    throw new Error("That ZIP code is outside the local delivery area.");
  }
};

export const createOrderNumber = () => {
  const datePart = new Date().toISOString().slice(2, 10).replaceAll("-", "");
  const randomPart = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `HY-${datePart}-${randomPart}`;
};

