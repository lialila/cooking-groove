// import { cookies } from 'next/headers';
// import { useRouter } from 'next/navigation';
// import { NextResponse } from 'next/server';
// import { getUserBySessionToken, User } from '../../../../../database/users';

// export type ProfileResponseBodyGet =
//   | {
//       error: string;
//     }
//   | {
//       user: User;
//     };

// export async function GET(): Promise<NextResponse<ProfileResponseBodyGet>> {
//   // const { searchParams } = new URL(request.url);
//   const router = useRouter();

//   const cookieStore = cookies();
//   const token = cookieStore.get('sessionToken');

//   const user = token && (await getUserBySessionToken(token.value));

//   const userId = user?.id;
//   if (!user) {
//     return NextResponse.json({ error: 'user not found' });
//   }
//   router.refresh();

//   return NextResponse.json(user);
// }
