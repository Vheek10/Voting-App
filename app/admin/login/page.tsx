'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Link from 'next/link';
import PageWrapper from '@/component/PageWrapper';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      toast.success('✅ Logged in!');
      router.push('/admin');
    } else {
      toast.error('❌ Incorrect password');
    }
  };

  return (
   <PageWrapper>
   <main className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4">
      <Toaster />
      
      {/* Card form */}
      <form
        onSubmit={handleLogin}
        className="card bg-base-100 shadow-xl p-6 w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">🔐 Admin Login</h1>

        <input
          type={showPassword ? 'text' : 'password'}
          className="input input-bordered w-full"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            className="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
          <span className="label-text">Show Password</span>
        </label>

        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>

      {/* 🔙 Back to Home - clearly below the card */}
      <Link href="/" className="mt-4 btn btn-sm btn-outline hover:scale-105 transition">
        ← Back to Home
      </Link>
    </main>
    </PageWrapper>
  );
}
