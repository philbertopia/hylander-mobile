import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = {
  title: "Careers",
  description: "Career and collaboration opportunities with Hylander Mobile in Kingston, NY."
};

export default function CareersPage() {
  return (
    <>
      <SiteHeader />
      <main className="grid justify-items-center px-4 pb-8 pt-4 sm:pt-6">
        <section className="grid w-full max-w-3xl gap-4 rounded-lg border-2 border-hyPurple bg-black p-4 text-center text-white shadow-[6px_6px_0_#ec4899] sm:p-6" data-animate="card">
          <h1 className="text-4xl font-black uppercase text-hyGreen sm:text-5xl" data-animate="title">Careers</h1>
          <figure className="overflow-hidden rounded-lg border-2 border-hyPink bg-black shadow-[4px_4px_0_#ec4899]" data-animate="image">
            <Image className="h-auto w-full" src="/img/dev.png" alt="Hylander Mobile careers page under development" width={1536} height={1024} priority unoptimized />
          </figure>
          <p className="mx-auto w-full rounded-lg border-2 border-hyGreen bg-hyHotPink px-4 py-3 text-4xl font-black uppercase leading-none text-white shadow-[5px_5px_0_#12b76a,0_0_28px_rgba(236,72,153,0.7)] [text-shadow:3px_3px_0_#000] sm:text-7xl">
            Under Development
          </p>
          <p className="mx-auto mt-3 max-w-xl font-bold text-white/80">
            Interested in working with Hylander Mobile, helping with deliveries, or collaborating on pop-ups? Send us a note on the contact page.
          </p>
          <div className="mx-auto flex flex-wrap justify-center gap-3">
            <Link className="rounded-full bg-hyGreen px-5 py-3 text-sm font-black uppercase text-black shadow-[4px_4px_0_#ec4899]" href="/contact" data-animate="button">
              Contact Us
            </Link>
            <a className="rounded-full bg-hyHotPink px-5 py-3 text-sm font-black uppercase text-white shadow-[4px_4px_0_#12b76a]" href="https://www.instagram.com/hylander.mobile" target="_blank" rel="noopener noreferrer" data-animate="button">
              Instagram @hylander.mobile
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
