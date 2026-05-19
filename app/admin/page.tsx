import { AdminDashboard } from "@/components/AdminDashboard";
import { AdminLogin } from "@/components/AdminLogin";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard",
  description: "Hylander Mobile local delivery admin dashboard."
};

export default function AdminPage() {
  const isAuthed = isAdminAuthenticated();
  return (
    <>
      <SiteHeader />
      <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8 pb-24">
        {isAuthed ? <AdminDashboard /> : <AdminLogin />}
      </main>
      <SiteFooter />
    </>
  );
}

