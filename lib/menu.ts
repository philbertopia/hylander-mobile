export type Modifier = {
  id: string;
  name: string;
  priceCents: number;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  category: "Mains" | "Wings" | "Sides" | "Desserts" | "Drinks";
  modifiers?: Modifier[];
};

export const sauceModifiers: Modifier[] = [
  { id: "plain", name: "Plain", priceCents: 0 },
  { id: "jerk", name: "Jerk", priceCents: 0 },
  { id: "buffalo", name: "Buffalo", priceCents: 0 },
  { id: "curry", name: "Curry", priceCents: 0 },
  { id: "bbq", name: "BBQ", priceCents: 0 },
  { id: "lemon-pepper", name: "Lemon Pepper", priceCents: 0 },
  { id: "mango-pepper", name: "Mango Pepper", priceCents: 0 }
];

export const addOnModifiers: Modifier[] = [
  { id: "extra-cheese", name: "Extra cheese", priceCents: 100 },
  { id: "bacon", name: "Bacon", priceCents: 200 },
  { id: "extra-sauce", name: "Extra sauce", priceCents: 75 }
];

export const menuItems: MenuItem[] = [
  {
    id: "chop-cheese",
    name: "Chop Cheese",
    description: "A hot, messy, beautiful chopped sandwich built for serious hunger.",
    priceCents: 900,
    category: "Mains",
    modifiers: addOnModifiers
  },
  {
    id: "chop-chicken",
    name: "Chop Chicken",
    description: "Chopped chicken with your choice of Sauce Roulette flavor.",
    priceCents: 900,
    category: "Mains",
    modifiers: [...sauceModifiers, ...addOnModifiers]
  },
  {
    id: "wings",
    name: "Wings",
    description: "Saucy wings with your flavor pick.",
    priceCents: 1000,
    category: "Wings",
    modifiers: sauceModifiers
  },
  {
    id: "sliders",
    name: "Sliders",
    description: "Small but loud little sandwiches.",
    priceCents: 800,
    category: "Mains",
    modifiers: addOnModifiers
  },
  {
    id: "pierogis",
    name: "Pierogis",
    description: "Crispy, soft, comforting, and ready for sauce decisions.",
    priceCents: 700,
    category: "Sides",
    modifiers: sauceModifiers
  },
  {
    id: "dessert",
    name: "Dessert",
    description: "Ask what sweet thing is causing trouble today.",
    priceCents: 500,
    category: "Desserts"
  },
  {
    id: "mango",
    name: "Mango Drink",
    description: "Cold mango energy.",
    priceCents: 300,
    category: "Drinks"
  },
  {
    id: "water",
    name: "Water",
    description: "Hydration, the undefeated side quest.",
    priceCents: 200,
    category: "Drinks"
  },
  {
    id: "gatorade",
    name: "Gatorade",
    description: "For flavor recovery and heroic electrolytes.",
    priceCents: 300,
    category: "Drinks"
  }
];

export const getMenuItem = (id: string) => menuItems.find((item) => item.id === id);

