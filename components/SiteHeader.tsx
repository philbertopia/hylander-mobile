import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b-2 border-black bg-black px-3 pb-3 pt-0 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
      <nav className="mx-auto grid w-full max-w-[980px] justify-items-center gap-1" aria-label="Main navigation">
        <div className="relative aspect-[1910/688] w-[calc(100%-5rem)] max-w-[500px] overflow-visible bg-black bg-contain bg-top bg-no-repeat sm:w-full sm:max-w-[520px]" style={{ backgroundImage: "url('/img/navbar.png?v=20260520c')" }}>
          <Link href="/" className="absolute inset-0" aria-label="Hylander Mobile home" />
        </div>
        <div className="grid w-full grid-cols-4 gap-1.5">
          <Link className="rounded-full bg-hyDeepPurple px-2 py-1.5 text-center text-[0.68rem] font-black uppercase text-white shadow-[inset_0_-3px_0_#be185d] sm:px-3 sm:py-2 sm:text-sm" href="/#menu" data-animate="nav">
            Menu
          </Link>
          <Link className="rounded-full bg-hyDeepPurple px-2 py-1.5 text-center text-[0.68rem] font-black uppercase text-white shadow-[inset_0_-3px_0_#be185d] sm:px-3 sm:py-2 sm:text-sm" href="/order" data-animate="nav">
            Order
          </Link>
          <Link className="rounded-full bg-hyDeepPurple px-2 py-1.5 text-center text-[0.68rem] font-black uppercase text-white shadow-[inset_0_-3px_0_#be185d] sm:px-3 sm:py-2 sm:text-sm" href="/catering" data-animate="nav">
            Catering
          </Link>
          <Link className="rounded-full bg-hyDeepPurple px-2 py-1.5 text-center text-[0.68rem] font-black uppercase text-white shadow-[inset_0_-3px_0_#be185d] sm:px-3 sm:py-2 sm:text-sm" href="/contact" data-animate="nav">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
