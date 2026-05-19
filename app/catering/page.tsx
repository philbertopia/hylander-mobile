import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = {
  title: "Catering",
  description: "Hylander Mobile catering inquiries for future events."
};

export default function CateringPage() {
  return (
    <>
      <SiteHeader />
      <main className="grid min-h-screen place-items-center px-4 py-10">
        <section className="w-full max-w-3xl rounded-lg border border-hyGreen bg-black p-6 text-center text-white shadow-sticker" data-animate="card">
          <p className="mx-auto mb-3 w-fit rounded-full bg-hyHotPink px-3 py-2 text-xs font-black uppercase">Coming Soon!</p>
          <h1 className="text-4xl font-black uppercase text-hyGreen" data-animate="title">Catering</h1>
          <p className="mx-auto mt-3 max-w-xl font-bold text-white/80">
            Catering will be a separate inquiry and quote page. For now, use the contact page for event questions.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
