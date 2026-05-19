import { weeklyHours } from "@/lib/constants";

type Fulfillment = "PICKUP" | "DELIVERY";

const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"] as const;

const minutesFromTime = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export const getHoursFor = (fulfillmentType: Fulfillment, now = new Date()) => {
  const day = dayNames[now.getDay()];
  return weeklyHours[fulfillmentType === "DELIVERY" ? "delivery" : "pickup"][day];
};

export const isOrderingOpen = (fulfillmentType: Fulfillment, now = new Date()) => {
  const hours = getHoursFor(fulfillmentType, now);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  return currentMinutes >= minutesFromTime(hours.open) && currentMinutes <= minutesFromTime(hours.close);
};

export const describeHours = (fulfillmentType: Fulfillment) => {
  const hours = getHoursFor(fulfillmentType);
  return `${hours.open} - ${hours.close}`;
};

