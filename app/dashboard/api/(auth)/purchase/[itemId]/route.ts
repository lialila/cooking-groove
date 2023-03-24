// import { cookies } from 'next/headers';
// import router from 'next/router';
// import { NextResponse } from 'next/server';
// import { getUserBySessionToken, User } from '../../../../../../database/users';

// export type PurchaseResponseBodyPost =
//   | {
//       error: string;
//     }
//   | {
//       user: User;
//     };

// export async function POST() {
//   const cookieStore = cookies();
//   const token = cookieStore.get('sessionToken');

//   const user = token && (await getUserBySessionToken(token.value));

//   if (!user) {
//     return NextResponse.json({ error: 'user not found' });
//   }

//   console.log(
//     `Insert a purchase from a very expensive item in database for the user ${user.username} `,
//   );
//   console.log(`you are hacked!!! this is very insecure `);

//   return NextResponse.json(user: user);
// }
