"use client";

import { useMemo, useState } from "react";
import { allowedDeliveryZips, deliveryFeeCents } from "@/lib/constants";
import { menuItems } from "@/lib/menu";
import { formatMoney } from "@/lib/money";
import { activeVenue } from "@/lib/venues";

type CartItem = {
  cartId: string;
  itemId: string;
  name: string;
  quantity: number;
  unitPriceCents: number;
  modifierIds: string[];
  modifierNames: string[];
};

const categories = ["Mains", "Wings", "Sides", "Desserts", "Drinks"];

export function OrderApp() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [fulfillmentType, setFulfillmentType] = useState<"PICKUP" | "DELIVERY">("PICKUP");
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, string[]>>({});
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotalCents = cart.reduce((sum, item) => sum + item.unitPriceCents * item.quantity, 0);
  const deliveryCents = fulfillmentType === "DELIVERY" ? deliveryFeeCents : 0;
  const totalCents = subtotalCents + deliveryCents;

  const groupedItems = useMemo(
    () => categories.map((category) => ({ category, items: menuItems.filter((item) => item.category === category) })).filter((group) => group.items.length),
    []
  );

  const addItem = (itemId: string) => {
    const item = menuItems.find((entry) => entry.id === itemId);
    if (!item) return;
    const modifierIds = selectedModifiers[itemId] || [];
    const modifiers = modifierIds.map((id) => item.modifiers?.find((modifier) => modifier.id === id)).filter(Boolean) as NonNullable<typeof item.modifiers>;
    const modifierTotal = modifiers.reduce((sum, modifier) => sum + modifier.priceCents, 0);
    setCart((current) => [
      ...current,
      {
        cartId: crypto.randomUUID(),
        itemId,
        name: item.name,
        quantity: 1,
        unitPriceCents: item.priceCents + modifierTotal,
        modifierIds,
        modifierNames: modifiers.map((modifier) => modifier.name)
      }
    ]);
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart((current) =>
      current
        .map((item) => (item.cartId === cartId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleModifier = (itemId: string, modifierId: string) => {
    setSelectedModifiers((current) => {
      const existing = current[itemId] || [];
      return {
        ...current,
        [itemId]: existing.includes(modifierId) ? existing.filter((id) => id !== modifierId) : [...existing, modifierId]
      };
    });
  };

  const submitOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    if (!cart.length) {
      setMessage("Add at least one item first.");
      return;
    }
    setIsSubmitting(true);
    const form = new FormData(event.currentTarget);
    const payload = {
      fulfillmentType,
      customerName: String(form.get("customerName") || ""),
      customerPhone: String(form.get("customerPhone") || ""),
      customerEmail: String(form.get("customerEmail") || ""),
      deliveryAddress: String(form.get("deliveryAddress") || ""),
      deliveryCity: String(form.get("deliveryCity") || "Kingston"),
      deliveryState: String(form.get("deliveryState") || "NY"),
      deliveryZip: String(form.get("deliveryZip") || ""),
      customerNotes: String(form.get("customerNotes") || ""),
      items: cart.map((item) => ({ itemId: item.itemId, quantity: item.quantity, modifierIds: item.modifierIds }))
    };

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Order failed.");
      }
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      setCart([]);
      setMessage(`Test order ${data.orderNumber} is paid and ready in the admin dashboard.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Order failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
      <section className="grid gap-5">
        <div className="rounded-lg border-2 border-black bg-black p-4 text-white shadow-black" data-animate="card">
          <p className="text-xs font-black uppercase text-hyHotPink">Active ordering location</p>
          <h2 className="text-2xl font-black uppercase text-hyGreen">{activeVenue.name}</h2>
          <p className="mt-1 text-sm font-bold text-white/70">This checkout is currently for the Salt Box menu only. Night Swim ordering will be added later when that menu is ready.</p>
        </div>
        {groupedItems.map((group) => (
          <div key={group.category} className="grid gap-3">
            <h2 className="text-xl font-black uppercase text-white [text-shadow:2px_2px_0_#000]" data-animate="title">{group.category}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {group.items.map((item) => (
                <article key={item.id} className="grid gap-3 rounded-lg border-2 border-black bg-white p-4 shadow-black" data-animate="card">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-black">{item.name}</h3>
                      <strong>{formatMoney(item.priceCents)}</strong>
                    </div>
                    <p className="mt-1 text-sm font-bold text-black/70">{item.description}</p>
                  </div>
                  {item.modifiers?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {item.modifiers.map((modifier) => {
                        const selected = selectedModifiers[item.id]?.includes(modifier.id);
                        return (
                          <button
                            key={modifier.id}
                            className={`rounded-full border-2 border-black px-3 py-1 text-xs font-black ${selected ? "bg-hyPink text-white" : "bg-white"}`}
                            type="button"
                            onClick={() => toggleModifier(item.id, modifier.id)}
                          >
                            {modifier.name}{modifier.priceCents ? ` +${formatMoney(modifier.priceCents)}` : ""}
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                  <button className="rounded-full bg-hyDeepGreen px-4 py-3 font-black uppercase text-white shadow-black" type="button" onClick={() => addItem(item.id)} data-animate="button">
                    Add
                  </button>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <aside className="h-fit min-w-0 overflow-hidden rounded-lg border-2 border-black bg-black p-4 text-white shadow-sticker lg:sticky lg:top-24" data-animate="card">
        <p className="mb-1 w-fit rounded-full bg-hyHotPink px-3 py-1 text-xs font-black uppercase">{activeVenue.name}</p>
        <h2 className="text-2xl font-black uppercase text-hyGreen">Your Order</h2>
        <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg bg-white/10 p-2">
          {(["PICKUP", "DELIVERY"] as const).map((type) => (
            <button key={type} className={`rounded-md px-3 py-2 text-sm font-black ${fulfillmentType === type ? "bg-hyPink text-white" : "bg-white text-black"}`} type="button" onClick={() => setFulfillmentType(type)} data-animate="button">
              {type === "PICKUP" ? "Pickup" : "Delivery"}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3">
          {cart.length ? cart.map((item) => (
            <div key={item.cartId} className="rounded-lg bg-white/10 p-3">
              <div className="flex justify-between gap-3">
                <strong>{item.name}</strong>
                <span>{formatMoney(item.unitPriceCents * item.quantity)}</span>
              </div>
              {item.modifierNames.length ? <p className="text-xs text-white/70">{item.modifierNames.join(", ")}</p> : null}
              <div className="mt-2 flex items-center gap-2">
                <button className="h-8 w-8 rounded-full bg-white text-black" type="button" onClick={() => updateQuantity(item.cartId, -1)}>-</button>
                <span className="font-black">{item.quantity}</span>
                <button className="h-8 w-8 rounded-full bg-white text-black" type="button" onClick={() => updateQuantity(item.cartId, 1)}>+</button>
              </div>
            </div>
          )) : <p className="rounded-lg bg-white/10 p-3 text-sm font-bold text-white/70">Cart is waiting for greatness.</p>}
        </div>

        <form className="mt-4 grid gap-3" onSubmit={submitOrder}>
          <input className="min-w-0 rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/50" name="customerName" placeholder="Name" required />
          <input className="min-w-0 rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/50" name="customerPhone" placeholder="Phone" required />
          <input className="min-w-0 rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/50" name="customerEmail" placeholder="Email optional" type="email" />
          {fulfillmentType === "DELIVERY" ? (
            <div className="grid gap-2">
              <input className="min-w-0 rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/50" name="deliveryAddress" placeholder="Street address" required />
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_74px_92px]">
                <input className="min-w-0 rounded-lg border border-white/20 bg-white/10 p-3 text-white" name="deliveryCity" defaultValue="Kingston" required />
                <input className="min-w-0 rounded-lg border border-white/20 bg-white/10 p-3 text-white" name="deliveryState" defaultValue="NY" required />
                <input className="min-w-0 rounded-lg border border-white/20 bg-white/10 p-3 text-white" name="deliveryZip" placeholder="ZIP" required />
              </div>
              <p className="text-xs font-bold text-white/70">Salt Box local delivery ZIPs: {allowedDeliveryZips.join(", ")}. Delivery fee: {formatMoney(deliveryFeeCents)}.</p>
            </div>
          ) : null}
          <textarea className="min-w-0 rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/50" name="customerNotes" placeholder="Notes optional" rows={3} />
          <div className="grid gap-1 border-t border-white/20 pt-3 font-bold">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatMoney(subtotalCents)}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>{formatMoney(deliveryCents)}</span></div>
            <div className="flex justify-between text-xl text-hyGreen"><span>Total</span><span>{formatMoney(totalCents)}</span></div>
          </div>
          <button className="rounded-full bg-hyPink px-4 py-3 font-black uppercase text-white shadow-black disabled:opacity-60" disabled={isSubmitting || !cart.length} type="submit" data-animate="button">
            {isSubmitting ? "Sending..." : "Checkout"}
          </button>
          {message ? <p className="rounded-lg bg-white/10 p-3 text-sm font-bold">{message}</p> : null}
        </form>
      </aside>
    </div>
  );
}
