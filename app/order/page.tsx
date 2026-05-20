import Image from "next/image";
import { OrderApp } from "@/components/OrderApp";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { describeHours } from "@/lib/hours";
import { activeVenue } from "@/lib/venues";

export const metadata = {
  title: "Salt Box Pickup or Delivery",
  description: "Salt Box local Hylander Mobile pickup and delivery ordering for Kingston, NY."
};

export default function OrderPage({ searchParams }: { searchParams?: { order?: string } }) {
  const returnedOrderNumber = typeof searchParams?.order === "string" ? searchParams.order : "";

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 pb-24">
        <figure className="mx-auto mb-5 w-full max-w-4xl overflow-hidden rounded-lg border-2 border-hyPink bg-black shadow-[5px_5px_0_#ec4899]" data-animate="image">
          <Image className="h-auto w-full" src="/img/dev.png" alt="Hylander Mobile online ordering is under construction" width={1536} height={1024} priority unoptimized />
        </figure>
        <section className="mb-6 rounded-lg border-2 border-black bg-white p-5 shadow-black" data-animate="card">
          <p className="mb-2 w-fit rounded-full bg-hyHotPink px-3 py-2 text-xs font-black uppercase text-white">Still in development</p>
          <h1 className="text-4xl font-black uppercase leading-none text-hyInk" data-animate="title">{activeVenue.name} Menu</h1>
          <p className="mt-3 rounded-lg border-2 border-black bg-hyGreen p-3 text-lg font-black uppercase text-black shadow-[4px_4px_0_#ec4899]">
            Online ordering, pickups, and deliveries coming soon!
          </p>
          <p className="mt-2 max-w-3xl font-bold text-black/70">
            Build a test order from the {activeVenue.name} menu for pickup or local delivery. Delivery is local only and adds a fixed $5 fee.
            Salt Box pickup hours: {describeHours("PICKUP")}. Salt Box delivery hours: {describeHours("DELIVERY")}.
          </p>
        </section>
        <OrderApp returnedOrderNumber={returnedOrderNumber} />
      </main>
      <SiteFooter />
    </>
  );
}
