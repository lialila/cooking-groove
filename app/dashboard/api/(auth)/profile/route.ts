import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { getUserBySessionToken } from '../../../../../database/users';

export async function GET(request: NextRequest, params) {
  const { searchParams } = new URL(request.url);
  const router = useRouter();

  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  const user = token && (await getUserBySessionToken(token.value));

  const userId = user?.id;
  if (!user) {
    return NextResponse.json({ error: 'user not found' });
  }
  router.refresh();

  return NextResponse.json(user);
}
