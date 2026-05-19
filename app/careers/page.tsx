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
      <main className="grid min-h-screen place-items-center px-4 py-10">
        <section className="w-full max-w-3xl rounded-lg border-2 border-hyPurple bg-black p-6 text-center text-white shadow-[6px_6px_0_#ec4899]" data-animate="card">
          <p className="mx-auto mb-3 w-fit rounded-full bg-hyGreen px-3 py-2 text-xs font-black uppercase text-black">Coming Soon</p>
          <h1 className="text-4xl font-black uppercase text-hyHotPink" data-animate="title">Careers</h1>
          <p className="mx-auto mt-3 max-w-xl font-bold text-white/80">
            Interested in working with Hylander Mobile, helping with deliveries, or collaborating on pop-ups? Send us a note on the contact page.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
