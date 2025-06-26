'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

type Props = {
  data: {
    nominee: string;
    votes: number;
    category: string;
  }[];
};

export default function VoteBarChart({ data }: Props) {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nominee" angle={-10} interval={0} height={60} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="votes" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
