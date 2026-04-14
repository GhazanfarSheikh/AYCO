import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { Navbar } from "@/components/layout/Navbar";
import { StashDrawer } from "@/components/stash/StashDrawer";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="page-shell py-8" id="main-content">
        {children}
      </main>
      <Footer />
      <MobileNav />
      <StashDrawer />
    </>
  );
}
