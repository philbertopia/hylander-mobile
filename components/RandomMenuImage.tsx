"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type MenuImage = {
  src: string;
  title: string;
  alt: string;
};

const randomMenuImages: MenuImage[] = [
  {
    src: "/img/random-menus/menu-01.png",
    title: "Salt Box Bar Menu",
    alt: "Hylander Mobile food truck menu with prices for chop cheese, chop chicken, pierogis, wings, sliders, sides, desserts, mango, water, and Gatorade."
  },
  {
    src: "/img/random-menus/menu-02.png",
    title: "Salt Box Bar Menu",
    alt: "Hylander Mobile food truck menu with prices for chop cheese, chop chicken, pierogis, wings, sliders, sides, desserts, mango, water, and Gatorade."
  },
  {
    src: "/img/random-menus/menu-03.png",
    title: "Salt Box Bar Menu",
    alt: "Hylander Mobile food truck menu with prices for chop cheese, chop chicken, pierogis, wings, sliders, sides, desserts, mango, water, and Gatorade."
  },
  {
    src: "/img/random-menus/menu-04.png",
    title: "Salt Box Bar Menu",
    alt: "Hylander Mobile food truck menu with prices for chop cheese, chop chicken, pierogis, wings, sliders, sides, desserts, mango, water, and Gatorade."
  },
  {
    src: "/img/random-menus/menu-05.png",
    title: "Salt Box Bar Menu",
    alt: "Hylander Mobile food truck menu with prices for chop cheese, chop chicken, pierogis, wings, sliders, sides, desserts, mango, water, and Gatorade."
  },
  {
    src: "/img/random-menus/menu-06.png",
    title: "Salt Box Bar Menu",
    alt: "Hylander Mobile food truck menu with prices for chop cheese, chop chicken, pierogis, wings, sliders, sides, desserts, mango, water, and Gatorade."
  },
  {
    src: "/img/random-menus/menu-07.png",
    title: "Salt Box Bar Menu",
    alt: "Hylander Mobile food truck menu with prices for chop cheese, chop chicken, pierogis, wings, sliders, sides, desserts, mango, water, and Gatorade."
  }
];

const eventMenuWindows: { start: string; end: string; image: MenuImage }[] = [
  {
    start: "2026-06-13T00:00:00-04:00",
    end: "2026-06-14T04:00:00-04:00",
    image: {
      src: "/img/knicks-menu-jun-13-2026-v3.png",
      title: "Knicks Night Menu",
      alt: "Hylander Mobile Knicks themed food truck menu for June 13, 2026."
    }
  }
];

const getActiveEventMenu = (now = new Date()) =>
  eventMenuWindows.find((eventMenu) => now >= new Date(eventMenu.start) && now < new Date(eventMenu.end))?.image;

export function RandomMenuImage() {
  const [menuImage, setMenuImage] = useState<MenuImage>(randomMenuImages[0]);

  useEffect(() => {
    setMenuImage(getActiveEventMenu() ?? randomMenuImages[Math.floor(Math.random() * randomMenuImages.length)]);
  }, []);

  return (
    <section className="grid w-full max-w-[980px] gap-3" id="menu" aria-label="Salt Box Bar Menu">
      <h2 className="w-full rounded-lg border-2 border-black bg-hyGreen px-4 py-3 text-center text-3xl font-black uppercase leading-none text-black shadow-[4px_4px_0_#ec4899] sm:text-5xl" data-animate="title">
        {menuImage.title}
      </h2>
      <figure className="m-0 overflow-hidden rounded-lg border-2 border-black bg-white leading-none shadow-[4px_4px_0_#ec4899]" data-animate="image">
        <Image
          className="block h-auto w-full select-none"
          src={menuImage.src}
          alt={menuImage.alt}
          width={1536}
          height={1024}
          priority
          unoptimized
        />
      </figure>
    </section>
  );
}
