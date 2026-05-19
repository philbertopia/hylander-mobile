import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b-2 border-black bg-black px-8 pb-5 pt-0 shadow-[0_8px_24px_rgba(0,0,0,0.22)] sm:px-12 md:px-48 md:pb-0 lg:px-72 xl:px-96 2xl:px-[28rem]">
      <nav className="relative mx-auto aspect-[2048/878] w-full max-w-[540px] overflow-visible bg-black bg-contain bg-top bg-no-repeat" style={{ backgroundImage: "url('/img/navbar.png?v=20260519')" }} aria-label="Main navigation">
        <Link href="/" className="absolute inset-0" aria-label="Hylander Mobile home" />
        <div className="absolute inset-x-2 bottom-0 z-10 grid translate-y-1/2 grid-cols-3 gap-1.5 sm:inset-x-auto sm:right-4 sm:bottom-2 sm:flex sm:translate-y-0 sm:gap-2">
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
