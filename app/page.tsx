'use client';

import Link from 'next/link';
import { McLaren } from 'next/font/google';
import { motion } from 'framer-motion';

const mclaren = McLaren({ subsets: ['latin'], weight: '400' });

export default function Home() {
  return (
    <main className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-6">
      <motion.div
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="text-5xl font-bold text-primary flex items-center justify-center gap-2">
          🏆 <span className={mclaren.className}>ELGVotes</span>
        </div>
        <p className="text-lg text-secondary">Final Year Dinner Awards 2025</p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="mt-4"
        >
          <Link href="/vote">
            <button className="btn btn-primary px-10 text-lg">
              Start Voting →
            </button>
          </Link>
        </motion.div>

        <Link href="/admin/login" className="block mt-6 text-sm text-accent hover:underline">
          Login as Admin
        </Link>
      </motion.div>
    </main>
  );
}
