import './globals.css';
import type { Metadata } from 'next';
import { McLaren } from 'next/font/google';
import { ThemeToggle } from '@/component/ThemeToggle'; // ✅ import client toggle

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
            <img
              src="/logo.png"
              alt="ELGVotes Logo"
              className="w-9 h-9 rounded-full border border-primary shadow"
            />
            <h1 className="text-xl font-bold tracking-wide text-primary">
              ELGVotes
            </h1>
          </div>

          {/* ✅ Use the client-side toggle */}
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
