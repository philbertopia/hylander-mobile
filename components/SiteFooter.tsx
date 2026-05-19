import Link from "next/link";
import { InstagramIcon } from "@/components/InstagramIcon";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-black px-4 pb-8 pt-5 text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-4 text-center sm:grid-cols-[1.4fr_0.8fr_1fr] sm:items-center sm:text-left">
        <div>
          <strong className="block text-lg text-hyPurple">Hylander Mobile</strong>
          <span className="text-sm font-bold">Little cart. Big flavor.</span>
        </div>
        <div className="flex justify-center">
          <a className="grid h-10 w-10 place-items-center rounded-full border border-hyPink bg-gradient-to-br from-hyDeepPurple to-hyHotPink text-white shadow-sticker" href="https://www.instagram.com/hylandermobile" target="_blank" rel="noopener" aria-label="Hylander Mobile on Instagram">
            <InstagramIcon />
          </a>
        </div>
        <div className="grid gap-1 text-sm font-bold">
          <span>Cash preferred</span>
          <span>PayPal: hylanrappaport1</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-3 sm:col-span-3" aria-label="Footer navigation">
          <Link className="rounded-full border border-white/20 px-3 py-2 text-sm font-bold" href="/order">Order</Link>
          <Link className="rounded-full border border-white/20 px-3 py-2 text-sm font-bold" href="/contact">Contact</Link>
          <Link className="rounded-full border border-white/20 px-3 py-2 text-sm font-bold" href="/admin">Admin</Link>
        </nav>
        <div className="text-center text-xs font-bold sm:col-span-3">
          Made by <a className="underline decoration-hyPurple underline-offset-4" href="https://tree-rouge.vercel.app/" target="_blank" rel="noopener">TREE</a>
        </div>
      </div>
    </footer>
  );
}
