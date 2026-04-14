import { MobileNav } from "@/components/layout/MobileNav";
import { Navbar } from "@/components/layout/Navbar";
import { LockerMobileNav } from "@/components/locker/LockerMobileNav";
import { LockerSidebar } from "@/components/locker/LockerSidebar";
import { StashDrawer } from "@/components/stash/StashDrawer";

export default function LockerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="page-shell py-8" id="main-content">
        <div className="mb-6 space-y-4 lg:hidden">
          <div className="section-heading">
            <p className="eyebrow">Your Locker</p>
            <h1 className="font-[var(--font-heading)] text-[var(--text-h1)] font-bold">
              Claims, Clout, Vault, and settings in one place.
            </h1>
          </div>
          <LockerMobileNav />
        </div>
        <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
          <aside className="glass-panel hidden h-fit rounded-[var(--radius-xl)] p-6 lg:block lg:sticky lg:top-24">
            <LockerSidebar />
          </aside>
          <section className="space-y-8">{children}</section>
        </div>
      </main>
      <MobileNav />
      <StashDrawer />
    </>
  );
}
