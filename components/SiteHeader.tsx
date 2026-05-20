import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b-2 border-black bg-black pb-7 pt-0 shadow-[0_8px_24px_rgba(0,0,0,0.22)] sm:px-16 sm:pb-0 md:px-56 lg:px-80 xl:px-[26rem] 2xl:px-[34rem]">
      <nav className="relative mx-auto aspect-[2048/878] w-[calc(100%-5rem)] max-w-[500px] overflow-visible bg-black bg-contain bg-top bg-no-repeat sm:w-full sm:max-w-[520px]" style={{ backgroundImage: "url('/img/navbar.png?v=20260519')" }} aria-label="Main navigation">
        <Link href="/" className="absolute inset-0" aria-label="Hylander Mobile home" />
        <div className="absolute left-1/2 top-full z-10 grid w-screen -translate-x-1/2 -translate-y-2 grid-cols-4 gap-1.5 px-3 sm:top-auto sm:left-auto sm:right-4 sm:bottom-2 sm:flex sm:w-auto sm:translate-x-0 sm:translate-y-0 sm:px-0 sm:gap-2">
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
