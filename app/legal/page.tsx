import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = {
  title: "Legal",
  description: "Legal information, privacy notes, and site terms for Hylander Mobile."
};

export default function LegalPage() {
  return (
    <>
      <SiteHeader />
      <main className="grid min-h-screen place-items-center px-4 py-10">
        <section className="grid w-full max-w-3xl gap-4 rounded-lg border-2 border-hyPurple bg-black p-6 text-white shadow-[6px_6px_0_#ec4899]" data-animate="card">
          <h1 className="text-center text-4xl font-black uppercase text-hyGreen" data-animate="title">Legal</h1>
          <div className="grid gap-3 text-sm font-bold leading-relaxed text-white/80">
            <p>
              Hylander Mobile uses this website to share menu, location, contact, and ordering information. Menu availability, pricing, hours, and venue details may change.
            </p>
            <p>
              Online ordering is still in development. Do not submit sensitive payment information through this site unless an official hosted checkout is active.
            </p>
            <p>
              For privacy or site questions, contact Hylander Mobile through the contact page.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
