import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

const ADMIN_PASSWORD = 'Victorgp@10';

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.password === ADMIN_PASSWORD) {
    const response = NextResponse.json({ success: true });

    response.headers.set(
      'Set-Cookie',
      serialize('admin-auth', 'true', {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 4, // 4 hours
      })
    );

    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
