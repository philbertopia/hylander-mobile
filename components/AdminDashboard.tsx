"use client";

import { useEffect, useState } from "react";
import { formatMoney } from "@/lib/money";
import { getVenue } from "@/lib/venues";

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  modifiersJson: string;
  lineTotalCents: number;
};

type Order = {
  id: string;
  orderNumber: string;
  venueId: string;
  fulfillmentType: "PICKUP" | "DELIVERY";
  status: string;
  paymentStatus: string;
  totalCents: number;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string | null;
  deliveryCity: string | null;
  deliveryState: string | null;
  deliveryZip: string | null;
  customerNotes: string | null;
  createdAt: string;
  items: OrderItem[];
};

const nextStatuses = ["ACCEPTED", "PREPARING", "READY", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELED"];

export function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [message, setMessage] = useState("");

  const loadOrders = async () => {
    const response = await fetch("/api/admin/orders", { cache: "no-store" });
    if (!response.ok) {
      setMessage("Could not load orders.");
      return;
    }
    const data = await response.json();
    setOrders(data.orders);
  };

  useEffect(() => {
    loadOrders();
    const timer = window.setInterval(loadOrders, 15000);
    return () => window.clearInterval(timer);
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const response = await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    if (!response.ok) {
      setMessage("Status update failed.");
      return;
    }
    await loadOrders();
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  };

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border-2 border-black bg-white p-4 shadow-black">
        <div>
          <h1 className="text-3xl font-black uppercase">Delivery Dashboard</h1>
          <p className="font-bold text-black/70">Paid pickup and delivery orders appear here.</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-full bg-hyDeepGreen px-4 py-2 font-black text-white" type="button" onClick={loadOrders}>Refresh</button>
          <button className="rounded-full bg-black px-4 py-2 font-black text-white" type="button" onClick={logout}>Logout</button>
        </div>
      </div>
      {message ? <p className="rounded-lg bg-white p-3 font-bold">{message}</p> : null}
      <div className="grid gap-4">
        {orders.length ? orders.map((order) => (
          <article key={order.id} className="rounded-lg border-2 border-black bg-white p-4 shadow-black">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="mb-2 flex flex-wrap gap-2">
                  <span className="rounded-full bg-hyGreen px-3 py-1 text-xs font-black uppercase text-black">{getVenue(order.venueId)?.name || order.venueId}</span>
                  <span className="rounded-full bg-hyHotPink px-3 py-1 text-xs font-black uppercase text-white">{order.fulfillmentType} / {order.status}</span>
                </div>
                <h2 className="text-2xl font-black">{order.orderNumber}</h2>
                <p className="font-bold">{order.customerName} / {order.customerPhone}</p>
                {order.fulfillmentType === "DELIVERY" ? (
                  <p className="font-bold text-black/70">{order.deliveryAddress}, {order.deliveryCity}, {order.deliveryState} {order.deliveryZip}</p>
                ) : null}
              </div>
              <strong className="text-2xl text-hyDeepGreen">{formatMoney(order.totalCents)}</strong>
            </div>
            <div className="mt-3 grid gap-2">
              {order.items.map((item) => {
                const modifiers = JSON.parse(item.modifiersJson || "[]") as Array<{ name: string }>;
                return (
                  <div key={item.id} className="rounded-lg bg-black/5 p-3">
                    <div className="flex justify-between gap-3 font-black">
                      <span>{item.quantity}x {item.name}</span>
                      <span>{formatMoney(item.lineTotalCents)}</span>
                    </div>
                    {modifiers.length ? <p className="text-sm font-bold text-black/60">{modifiers.map((modifier) => modifier.name).join(", ")}</p> : null}
                  </div>
                );
              })}
            </div>
            {order.customerNotes ? <p className="mt-3 rounded-lg bg-yellow-100 p-3 font-bold">Notes: {order.customerNotes}</p> : null}
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {nextStatuses.map((status) => (
                <button key={status} className="rounded-lg border-2 border-black bg-hyPurple px-3 py-3 text-xs font-black uppercase text-white disabled:bg-black/30" disabled={order.status === status} type="button" onClick={() => updateStatus(order.id, status)}>
                  {status.replaceAll("_", " ")}
                </button>
              ))}
            </div>
          </article>
        )) : <p className="rounded-lg border-2 border-black bg-white p-5 text-center font-black shadow-black">No paid orders yet.</p>}
      </div>
    </section>
  );
}
