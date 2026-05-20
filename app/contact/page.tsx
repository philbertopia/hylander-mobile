import Image from "next/image";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { InstagramIcon } from "@/components/InstagramIcon";

export const metadata = {
  title: "Contact Hylander Mobile",
  description: "Contact Hylander Mobile in Kingston, NY with food truck feedback, questions, ideas, or catering-style inquiries."
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="grid justify-items-center px-4 pb-8 pt-3 sm:pt-5 lg:pt-6">
        <section className="grid w-full max-w-[980px] gap-4 rounded-lg border border-hyPink/70 bg-black p-5 text-center text-white shadow-[0_18px_44px_rgba(7,7,12,0.26),4px_4px_0_#12b76a] sm:p-8" data-animate="card">
          <figure className="mx-auto w-full max-w-[760px] leading-none" data-animate="image">
            <Image className="h-auto w-full rounded-lg" src="/img/ChatGPT Image May 17, 2026, 08_54_41 PM.png" alt="Contact Us with kaiju artwork" width={1536} height={1024} unoptimized />
          </figure>
          <h1 className="text-3xl font-black leading-none sm:text-5xl" data-animate="title">We love to hear from <span className="text-hyGreen [text-shadow:3px_3px_0_#be185d]">you!</span></h1>
          <p className="mx-auto max-w-2xl rounded-lg border border-hyPurple/50 bg-hyPurple/20 p-4 font-bold text-white/85">
            Tell us what you loved, what we can do better, or what you want to see next.
          </p>
          <form className="grid gap-3 text-left sm:grid-cols-2" action="mailto:h.rappaportculinary@gmail.com" method="post" encType="text/plain">
            <label className="grid gap-1">
              <span className="text-xs font-black uppercase text-hyGreen">Name optional</span>
              <input className="rounded-lg border border-white/20 bg-white/10 p-3 text-white" type="text" name="name" autoComplete="name" />
            </label>
            <label className="grid gap-1">
              <span className="text-xs font-black uppercase text-hyGreen">Email optional</span>
              <input className="rounded-lg border border-white/20 bg-white/10 p-3 text-white" type="email" name="email" autoComplete="email" />
            </label>
            <label className="grid gap-1 sm:col-span-2">
              <span className="text-xs font-black uppercase text-hyGreen">Message</span>
              <textarea className="rounded-lg border border-white/20 bg-white/10 p-3 text-white" name="message" rows={5} required placeholder="Tell us what you loved, what we can improve, or what you want next." />
            </label>
            <button className="rounded-full bg-hyDeepGreen p-3 font-black uppercase text-white shadow-[4px_4px_0_#ec4899] sm:col-span-2" type="submit" data-animate="button">Send Feedback</button>
          </form>
          <a className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-hyPink bg-gradient-to-br from-hyDeepPurple to-hyHotPink text-white shadow-sticker" href="https://www.instagram.com/hylandermobile" target="_blank" rel="noopener" aria-label="Hylander Mobile on Instagram" data-animate="button">
            <InstagramIcon />
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
