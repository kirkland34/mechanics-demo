import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Mechanics — Demo",
  description: "Helps car owners quickly find trusted local mechanics, book repairs, and pay online."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-white/10">
          <div className="container flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <Image src="/logo.svg" alt="logo" width={32} height={32} />
              <span className="font-semibold">Mechanics</span>
            </div>
            <nav className="flex items-center gap-4 text-sm text-white/80">
              <Link href="/">Home</Link>
              <Link href="/book">Book</Link>
              <a href="https://example.com" target="_blank" rel="noreferrer">Contact</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-white/10 mt-12">
          <div className="container py-8 text-sm text-white/60">
            © {new Date().getFullYear()} Mechanics — Demo
          </div>
        </footer>
      </body>
    </html>
  );
}
