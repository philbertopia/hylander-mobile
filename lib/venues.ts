export type Venue = {
  id: string;
  name: string;
  menuId: string;
  pickupEnabled: boolean;
  deliveryEnabled: boolean;
  orderingEnabled: boolean;
};

export const saltBoxVenue: Venue = {
  id: "salt-box",
  name: "Salt Box Bar",
  menuId: "salt-box",
  pickupEnabled: true,
  deliveryEnabled: true,
  orderingEnabled: true
};

export const activeVenue = saltBoxVenue;

export const venues: Venue[] = [saltBoxVenue];

export const getVenue = (id: string) => venues.find((venue) => venue.id === id);
