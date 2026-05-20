import Image from "next/image";
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
        <section className="grid w-full max-w-3xl gap-4 rounded-lg border border-hyGreen bg-black p-4 text-center text-white shadow-sticker sm:p-6" data-animate="card">
          <figure className="overflow-hidden rounded-lg border-2 border-hyPink bg-black shadow-[4px_4px_0_#ec4899]" data-animate="image">
            <Image className="h-auto w-full" src="/img/dev.png" alt="Hylander Mobile catering is under construction" width={1536} height={1024} priority unoptimized />
          </figure>
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
