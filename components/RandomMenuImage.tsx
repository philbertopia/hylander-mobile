"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const menuImages = [
  "/img/random-menus/ChatGPT Image May 16, 2026, 04_20_26 PM.png",
  "/img/random-menus/ChatGPT Image May 16, 2026, 04_40_20 PM.png",
  "/img/random-menus/ChatGPT Image May 16, 2026, 04_45_59 PM.png",
  "/img/random-menus/ChatGPT Image May 16, 2026, 04_48_11 PM.png",
  "/img/random-menus/ChatGPT Image May 16, 2026, 04_50_01 PM.png",
  "/img/random-menus/ChatGPT Image May 18, 2026, 11_28_57 AM.png",
  "/img/random-menus/ChatGPT Image May 18, 2026, 11_42_38 AM.png"
];

export function RandomMenuImage() {
  const [randomMenu, setRandomMenu] = useState(menuImages[0]);

  useEffect(() => {
    setRandomMenu(menuImages[Math.floor(Math.random() * menuImages.length)]);
  }, []);

  return (
    <section className="grid w-full max-w-[980px] gap-3" id="menu" aria-label="Salt Box Menu">
      <h2 className="mx-auto w-fit rounded-lg border-2 border-black bg-hyGreen px-4 py-2 text-center text-3xl font-black uppercase leading-none text-black shadow-[4px_4px_0_#ec4899] sm:text-5xl" data-animate="title">
        Salt Box Menu
      </h2>
      <figure className="m-0 overflow-hidden rounded-lg border-2 border-hyPurple bg-white leading-none shadow-[4px_4px_0_#7c3aed]" data-animate="image">
        <Image
          className="block h-auto w-full select-none"
          src={randomMenu}
          alt="Hylander Mobile food truck menu with prices for chop cheese, chop chicken, pierogis, wings, sliders, sides, desserts, mango, water, and Gatorade."
          width={1536}
          height={1024}
          priority
          unoptimized
        />
      </figure>
    </section>
  );
}
