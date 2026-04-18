import { Container } from "@/components/layout/Container";
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
      <main id="main-content">
        <Container className="py-8 sm:py-10 lg:py-14">
          <div className="mb-6 space-y-4 xl:hidden">
            <div className="section-heading">
              <p className="eyebrow">My Locker</p>
              <h1 className="font-[var(--font-heading)] text-[var(--text-h1)] font-bold">
                Claims, Clout, saved picks, and account settings in one place.
              </h1>
            </div>
            <LockerMobileNav />
          </div>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
            <aside className="hidden xl:sticky xl:top-24 xl:block xl:self-start">
              <div className="surface-panel rounded-[var(--radius-lg)] p-6">
                <LockerSidebar />
              </div>
            </aside>
            <section className="space-y-8">{children}</section>
          </div>
        </Container>
      </main>
      <MobileNav />
      <StashDrawer />
    </>
  );
}
