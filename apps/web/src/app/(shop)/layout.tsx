import { Container } from "@/components/layout/Container";
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
      <main id="main-content">
        <Container className="py-8 sm:py-10 lg:py-14">{children}</Container>
      </main>
      <Footer />
      <MobileNav />
      <StashDrawer />
    </>
  );
}
