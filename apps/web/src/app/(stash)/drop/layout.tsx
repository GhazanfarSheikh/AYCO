export default function DropLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="min-h-[100svh] bg-[var(--ayco-bg-primary)] pb-10"
      id="main-content"
    >
      {children}
    </main>
  );
}
