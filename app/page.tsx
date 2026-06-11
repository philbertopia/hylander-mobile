import { HoursLocations } from "@/components/HoursLocations";
import { RandomMenuImage } from "@/components/RandomMenuImage";
import { SauceRoulette } from "@/components/SauceRoulette";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: "Hylander Mobile",
  description:
    "Hylander Mobile is a Kingston, NY food truck serving chop cheese, chop chicken, wings, sliders, pierogis, sides, desserts, mango drinks, water, Gatorade, and Sauce Roulette flavors.",
  email: "mailto:h.rappaportculinary@gmail.com",
  areaServed: {
    "@type": "City",
    name: "Kingston",
    addressRegion: "NY",
    addressCountry: "US"
  },
  servesCuisine: ["American", "Food truck", "Street food"],
  paymentAccepted: ["Cash", "PayPal"],
  sameAs: ["https://www.instagram.com/hylander.mobile"]
};

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="grid min-h-screen place-items-center gap-5 px-3 pb-10 pt-4" aria-label="Hylander Mobile menu">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <HoursLocations />
        <RandomMenuImage />
        <section className="sr-only" aria-label="Hylander Mobile menu details">
          <h1>Hylander Mobile Food Truck Menu in Kingston, NY</h1>
          <p>
            Hylander Mobile serves chop cheese, chop chicken, wings, sliders, pierogis, sides, desserts, mango drinks, water, and Gatorade.
            Sauce Roulette flavors include Plain, Jerk, Buffalo, Curry, BBQ, Lemon Pepper, and Mango Pepper.
          </p>
        </section>
        <section className="grid w-full max-w-[760px] gap-3" aria-label="Sauce Roulette title">
          <h2 className="w-full rounded-lg border-2 border-black bg-hyGreen px-4 py-3 text-center text-3xl font-black uppercase leading-none text-black shadow-[4px_4px_0_#ec4899] sm:text-5xl" data-animate="title">
            Sauce Roulette
          </h2>
        </section>
        <SauceRoulette />
      </main>
      <SiteFooter />
    </>
  );
}
