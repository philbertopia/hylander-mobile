import type { Metadata } from "next";
import { SiteAnimations } from "@/components/SiteAnimations";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Hylander Mobile Food Truck Menu | Kingston, NY",
    template: "%s | Hylander Mobile"
  },
  description:
    "Hylander Mobile food truck menu in Kingston, NY with chop cheese, chop chicken, wings, sliders, pierogis, desserts, drinks, and Sauce Roulette flavors.",
  icons: {
    icon: [
      {
        url: "/favicon.png?v=20260520",
        type: "image/png"
      }
    ],
    shortcut: "/favicon.png?v=20260520",
    apple: "/favicon.png?v=20260520"
  },
  robots: "index, follow",
  openGraph: {
    title: "Hylander Mobile Food Truck Menu",
    description:
      "View the Hylander Mobile food truck menu for Kingston, NY, including chop cheese, chop chicken, wings, sliders, pierogis, drinks, desserts, and Sauce Roulette.",
    images: ["/img/random-menus/ChatGPT Image May 16, 2026, 04_20_26 PM.png"],
    siteName: "Hylander Mobile",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Hylander Mobile Food Truck Menu",
    description: "Kingston, NY food truck menu with chop cheese, chop chicken, wings, sliders, pierogis, drinks, desserts, and Sauce Roulette.",
    images: ["/img/random-menus/ChatGPT Image May 16, 2026, 04_20_26 PM.png"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <SiteAnimations />
        {children}
      </body>
    </html>
  );
}
