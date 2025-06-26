'use client';

import { useEffect, useState } from 'react';
import { McLaren } from 'next/font/google';
import Link from 'next/link';
import PageWrapper from '@/component/PageWrapper';
import categoriesData from '@/data/categories.json';
import confetti from 'canvas-confetti';
import { Toaster, toast } from 'react-hot-toast';

const mclaren = McLaren({
  subsets: ['latin'],
  weight: '400',
});

function ThemeToggle() {
  const [theme, setTheme] = useState('elgVotes');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <button
      className="btn btn-sm btn-outline hover:scale-105 hover:brightness-110 transition"
      onClick={() => setTheme((prev) => (prev === 'dark' ? 'elgVotes' : 'dark'))}
    >
      {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}

export default function VotePage() {
  const [currentCategory, setCurrentCategory] = useState(Object.keys(categoriesData)[0]);
  const [selectedNominee, setSelectedNominee] = useState('');
  const [votedCategories, setVotedCategories] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const categoryKeys = Object.keys(categoriesData);
  const currentIndex = categoryKeys.indexOf(currentCategory);
  const isAllVoted = votedCategories.length === categoryKeys.length;
  const progressPercent = (votedCategories.length / categoryKeys.length) * 100;

  const handleVote = async () => {
    if (!selectedNominee) return;
    setLoading(true);
    try {
      await fetch('/api/vote', {
        method: 'POST',
        body: JSON.stringify({
          category: currentCategory,
          nominee: selectedNominee,
        }),
      });

      confetti({
        particleCount: 200,
        spread: 100,
        angle: 90,
        origin: { y: 0.6 },
        colors: ['#6B21A8', '#EAB308', '#22C55E'],
      });

      setVotedCategories([...votedCategories, currentCategory]);
      setSelectedNominee('');
      toast.success('✅ Vote submitted!');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const fetchResults = async () => {
    const res = await fetch('/api/vote');
    const data = await res.json();
    setResults(data);
  };

  useEffect(() => {
    fetchResults();
  }, [votedCategories]);

  return (
    <PageWrapper>
      <main className="min-h-screen bg-base-200 p-4 flex flex-col items-center justify-center relative">
        <Toaster position="top-center" />

        {/* Header */}
        <div className="w-full max-w-md flex justify-between items-center mb-4">
          <Link href="/">
            <button className="btn btn-sm btn-outline hover:scale-105 transition">
              ← Back Home
            </button>
          </Link>
          <ThemeToggle />
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mb-4">
          <progress className="progress progress-primary w-full" value={progressPercent} max={100} />
          <p className="text-center text-sm mt-1">
            {votedCategories.length}/{categoryKeys.length} categories completed
          </p>
        </div>

        {/* Voting Card */}
        <div className="card w-full max-w-md bg-base-100 shadow-xl p-4">
          <div className="card-body">
            <h2 className="card-title text-xl text-center mb-4">🗳️ FYB DINNER VOTING.</h2>

            {isAllVoted ? (
              <>
                <h3 className="text-lg font-bold text-center">🎉 Voting Complete!</h3>
                <p className="text-center mb-2">Here are the live results:</p>

                {results.map((cat: any) => (
                  <div key={cat._id} className="mb-4">
                    <h4 className="font-semibold">{cat._id}</h4>
                    <ul className="pl-4 list-disc">
                      {cat.nominees.map((n: any) => (
                        <li key={n.nominee}>
                          {n.nominee} - {n.votes} vote(s)
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <button
                  className="btn btn-secondary mt-4 hover:scale-105 hover:brightness-110 transition"
                  onClick={() => location.reload()}
                >
                  Reset
                </button>
              </>
            ) : (
              <>
                <h3 className={`text-2xl text-center mb-4 ${mclaren.className}`}>
                  {currentCategory}
                </h3>

                <div className="form-control mb-4 space-y-2">
                  {categoriesData[currentCategory].map((nominee) => (
                    <label
                      key={nominee}
                      className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-all ${
                        selectedNominee === nominee
                          ? 'bg-primary text-primary-content'
                          : 'bg-base-200 hover:bg-base-300'
                      }`}
                    >
                      <span className="text-md font-medium">{nominee}</span>
                      <input
                        type="radio"
                        name="nominee"
                        className="checkbox checkbox-success"
                        checked={selectedNominee === nominee}
                        onChange={() => setSelectedNominee(nominee)}
                      />
                    </label>
                  ))}
                </div>

                <button
                  className="btn btn-primary w-full hover:scale-105 hover:brightness-110 transition"
                  onClick={handleVote}
                  disabled={!selectedNominee || loading}
                >
                  {loading ? 'Submitting...' : 'Submit Vote'}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Prev/Next Navigation */}
        {!isAllVoted && (
          <div className="flex justify-between w-full max-w-md mt-6">
            <button
              className="btn btn-sm btn-outline hover:scale-105 hover:brightness-110 transition"
              disabled={currentIndex === 0}
              onClick={() => {
                const prev = categoryKeys[currentIndex - 1];
                if (prev) setCurrentCategory(prev);
              }}
            >
              ⏮️ Prev
            </button>

            <button
              className="btn btn-sm btn-outline hover:scale-105 hover:brightness-110 transition"
              disabled={currentIndex === categoryKeys.length - 1}
              onClick={() => {
                const next = categoryKeys[currentIndex + 1];
                if (next) setCurrentCategory(next);
              }}
            >
              Next ⏭️
            </button>
          </div>
        )}
      </main>
    </PageWrapper>
  );
}
