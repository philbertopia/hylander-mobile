import Link from "next/link";
import { InstagramIcon } from "@/components/InstagramIcon";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-black pb-8 text-white">
      <div className="footer-checker" aria-hidden="true" />
      <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 pt-5 text-center sm:grid-cols-[1.4fr_0.8fr_1fr] sm:items-center sm:text-left">
        <div>
          <strong className="block text-lg text-hyPurple">Hylander Mobile {"\u00a9"} 2026</strong>
          <span className="text-sm font-bold">Little cart. Big flavor.</span>
          <a className="mt-1 block text-sm font-black text-hyPink underline decoration-hyGreen underline-offset-4" href="https://www.instagram.com/hylander.mobile" target="_blank" rel="noopener noreferrer">
            @hylander.mobile
          </a>
        </div>
        <div className="flex justify-center">
          <a className="grid h-10 w-10 place-items-center rounded-full border border-hyPink bg-gradient-to-br from-hyDeepPurple to-hyHotPink text-white shadow-sticker" href="https://www.instagram.com/hylander.mobile" target="_blank" rel="noopener" aria-label="Hylander Mobile on Instagram at @hylander.mobile">
            <InstagramIcon />
          </a>
        </div>
        <div className="grid gap-1 text-sm font-bold">
          <span>Cash preferred</span>
          <span>PayPal: hylanrappaport1</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-3 sm:col-span-3" aria-label="Footer navigation">
          <Link className="rounded-full border border-white/20 px-3 py-2 text-sm font-bold" href="/">Home</Link>
          <Link className="rounded-full border border-white/20 px-3 py-2 text-sm font-bold" href="/#menu">Salt Box Bar Menu</Link>
          <Link className="rounded-full border border-white/20 px-3 py-2 text-sm font-bold" href="/catering">Catering</Link>
          <Link className="rounded-full border border-white/20 px-3 py-2 text-sm font-bold" href="/contact">Contact</Link>
          <Link className="rounded-full border border-white/20 px-3 py-2 text-sm font-bold" href="/careers">Careers</Link>
          <Link className="rounded-full border border-white/20 px-3 py-2 text-sm font-bold" href="/legal">Legal</Link>
          <a className="rounded-full border border-white/20 px-3 py-2 text-sm font-bold" href="https://www.thesaltbox.bar/" target="_blank" rel="noopener noreferrer">Salt Box Bar</a>
          <a className="rounded-full border border-white/20 px-3 py-2 text-sm font-bold" href="https://www.nightswimkingston.com/" target="_blank" rel="noopener noreferrer">Night Swim</a>
        </nav>
        <div className="text-center text-xs font-bold sm:col-span-3">
          Made by <a className="underline decoration-hyPurple underline-offset-4" href="https://tree-rouge.vercel.app/" target="_blank" rel="noopener">TREE</a>
        </div>
      </div>
    </footer>
  );
}
