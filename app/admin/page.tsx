'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import VoteBarChart from '@/component/Charts/VoteBarChart';

export default function AdminDashboard() {
  const router = useRouter();
  const [results, setResults] = useState<any[]>([]);
  const [checkedAuth, setCheckedAuth] = useState(false); // Prevent duplicate toasts

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch('/api/vote', {
          credentials: 'include', // ✅ include cookies
        });
        if (!res.ok) throw new Error('Unauthorized');
        const data = await res.json();
        setResults(data);
        setCheckedAuth(true);
      } catch (err) {
        if (checkedAuth) {
          toast.error('⚠️ Access denied. Please log in.');
          setCheckedAuth(true);
          router.push('/admin/login');
        }
      }
    };

    fetchResults();
  }, [router, checkedAuth]);

  const chartData = results.flatMap((cat) =>
    cat.nominees.map((n: any) => ({
      category: cat._id,
      nominee: `${n.nominee} (${cat._id})`,
      votes: n.votes,
    }))
  );

  const handleLogout = async () => {
    await fetch('/api/admin/logout', {
      method: 'POST',
      credentials: 'include',
    });
    toast.success('Logged out successfully');
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-base-200 p-6">
      <Toaster />
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold">📊 Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="btn btn-sm btn-error hover:scale-105 transition"
          >
            Logout
          </button>
        </div>

        {/* Voting Results */}
        <div className="bg-base-100 shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Live Voting Results</h2>
          {results.length === 0 ? (
            <p>No votes submitted yet.</p>
          ) : (
            results.map((cat) => (
              <div key={cat._id} className="mb-4">
                <h3 className="font-semibold">{cat._id}</h3>
                <ul className="pl-4 list-disc">
                  {cat.nominees.map((n: any) => (
                    <li key={n.nominee}>
                      {n.nominee} - {n.votes} vote(s)
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>

        {/* Chart */}
        <div className="bg-base-100 shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Vote Distribution</h2>
          {chartData.length > 0 ? (
            <VoteBarChart data={chartData} />
          ) : (
            <p className="text-sm text-gray-500">No chart data yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}
