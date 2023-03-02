import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'user not found' });
  }
  return NextResponse.json(user);
}
