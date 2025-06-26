import './globals.css';
import type { Metadata } from 'next';
import { McLaren } from 'next/font/google';
import { ThemeToggle } from '@/component/ThemeToggle';
import Image from 'next/image'; // ✅ Import Image

const mclaren = McLaren({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FYB Dinner Voting',
  description: 'Vote anonymously for your final year dinner awards!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="elgvotes">
      <body className={mclaren.className}>
        <header className="flex items-center justify-between px-4 py-3 bg-base-100 shadow-md sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="ELGVotes Logo"
              width={36}
              height={36}
              className="rounded-full border border-primary shadow"
              priority // optional: improves loading
            />
            <h1 className="text-xl font-bold tracking-wide text-primary">
              ELGVotes
            </h1>
          </div>

          <ThemeToggle />
        </header>

        {children}

        <footer className="mt-12 p-4 text-center text-sm text-base-content/60">
          © {new Date().getFullYear()} ELGVotes. Designed for FYB Dinner 🎓
        </footer>
      </body>
    </html>
  );
}
