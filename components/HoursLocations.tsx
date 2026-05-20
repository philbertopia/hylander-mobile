"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Venue = {
  id: string;
  name: string;
  hours: string;
  address: string;
  href: string;
  menuHref: string;
  menuLabel: string;
  menuExternal?: boolean;
  menuDisabled?: boolean;
  openDays: number[];
  openHour: number;
  closeHour: number;
};

const venues: Venue[] = [
  {
    id: "salt-box",
    name: "Salt Box Bar",
    hours: "Tuesday-Sunday, 8 PM-3 AM",
    address: "10 Crown St, Kingston, NY 12401",
    href: "https://www.thesaltbox.bar/",
    menuHref: "/order?venue=salt-box",
    menuLabel: "Order Salt Box",
    openDays: [2, 3, 4, 5, 6, 0],
    openHour: 20,
    closeHour: 3
  },
  {
    id: "night-swim",
    name: "Night Swim Pop-Up",
    hours: "Tuesdays, 7 PM-4 AM",
    address: "744 Broadway, Kingston, NY 12401",
    href: "https://www.nightswimkingston.com/",
    menuHref: "#",
    menuLabel: "Order Night Swim",
    menuDisabled: true,
    openDays: [2],
    openHour: 19,
    closeHour: 4
  }
];

const isVenueOpen = (venue: Venue, now: Date) => {
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  const previousDay = (day + 6) % 7;
  const openTonight = venue.openDays.includes(day) && hour >= venue.openHour;
  const stillOpenFromYesterday = venue.openDays.includes(previousDay) && hour < venue.closeHour;
  return openTonight || stillOpenFromYesterday;
};

export function HoursLocations() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const venueStatuses = useMemo(() => venues.map((venue) => ({ ...venue, isOpen: now ? isVenueOpen(venue, now) : null })), [now]);
  const anyVenueOpen = venueStatuses.some((venue) => venue.isOpen);
  const imageSrc = anyVenueOpen ? "/img/hylander-mobile-open.png?v=20260519b" : "/img/hylander-mobile-closed.png?v=20260519b";
  const imageAlt = anyVenueOpen ? "Hylander Mobile is open" : "Hylander Mobile is closed";

  return (
    <section className="grid w-full max-w-[980px] gap-4" aria-label="Hylander Mobile hours of operation and locations">
      <figure className="overflow-hidden rounded-lg border-2 border-hyPink bg-black shadow-[4px_4px_0_#ec4899]" data-animate="image">
        <Image className="block h-auto w-full" src={imageSrc} alt={imageAlt} width={1536} height={1024} priority={false} unoptimized />
      </figure>
      <div className="grid gap-4 sm:grid-cols-2">
        {venueStatuses.map((venue) => (
          <article key={venue.name} className="relative grid gap-1.5 overflow-hidden rounded-lg border-2 border-hyPurple bg-black p-3 text-white shadow-[3px_3px_0_#7c3aed]" data-animate="card">
            {venue.menuDisabled ? (
              <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center bg-black/68 p-3 backdrop-brightness-50">
                <div className="-rotate-3 rounded-lg border-2 border-hyGreen bg-hyHotPink px-5 py-3 text-center text-white shadow-[4px_4px_0_#12b76a,0_0_26px_rgba(236,72,153,0.75)] ring-2 ring-white/30">
                  <span className="block text-[0.62rem] font-black uppercase tracking-[0.22em] text-hyGreen [text-shadow:1px_1px_0_#000]">Night Swim</span>
                  <span className="block text-2xl font-black uppercase leading-none [text-shadow:2px_2px_0_#000] sm:text-3xl">Coming Soon!</span>
                </div>
              </div>
            ) : null}
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h2 className="text-xl font-black uppercase leading-tight text-hyGreen sm:text-2xl">{venue.name}</h2>
              <span className={`rounded-full px-2.5 py-0.5 text-[0.68rem] font-black uppercase ${venue.isOpen ? "bg-hyGreen text-black" : "bg-white/15 text-white"}`}>
                {venue.isOpen === null ? "Checking" : venue.isOpen ? "Open" : "Closed"}
              </span>
            </div>
            <p className="text-sm font-black uppercase text-hyPurple">{venue.hours}</p>
            <address className="text-sm not-italic font-bold text-white/80">{venue.address}</address>
            <div className="mt-0.5 flex flex-wrap gap-1.5">
              {venue.id === "salt-box" ? (
                <a className="w-fit rounded-full bg-hyGreen px-3 py-1.5 text-xs font-black uppercase text-black shadow-[inset_0_-3px_0_#087443]" href="#menu" data-animate="button">
                  Menu
                </a>
              ) : (
                <span className="w-fit cursor-not-allowed rounded-full bg-hyGreen px-3 py-1.5 text-xs font-black uppercase text-black opacity-60 shadow-[inset_0_-3px_0_#087443]" aria-disabled="true">
                  Menu
                </span>
              )}
              {venue.menuDisabled ? (
                <span className="w-fit cursor-not-allowed rounded-full bg-hyPink/60 px-3 py-1.5 text-xs font-black uppercase text-white shadow-[inset_0_-3px_0_rgba(190,24,93,0.72)]" aria-disabled="true">
                  {venue.menuLabel}
                </span>
              ) : (
                <a className="w-fit rounded-full bg-hyPink px-3 py-1.5 text-xs font-black uppercase text-white shadow-[inset_0_-3px_0_#be185d]" href={venue.menuHref} target={venue.menuExternal ? "_blank" : undefined} rel={venue.menuExternal ? "noopener noreferrer" : undefined} data-animate="button">
                  {venue.menuLabel}
                </a>
              )}
              <a className="w-fit rounded-full bg-hyDeepPurple px-3 py-1.5 text-xs font-black uppercase text-white shadow-[inset_0_-3px_0_#7c3aed]" href={venue.href} target="_blank" rel="noopener noreferrer" data-animate="button">
                Visit Website
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
