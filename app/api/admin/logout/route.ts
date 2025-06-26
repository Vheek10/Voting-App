import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.headers.set(
    'Set-Cookie',
    serialize('admin-auth', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,
    })
  );

  return response;
}
