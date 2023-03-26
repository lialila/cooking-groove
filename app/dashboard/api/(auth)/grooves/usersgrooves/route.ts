import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createUsersgrooves,
  getUsersgrooves,
} from '../../../../../../database/usersgrooves';

const usersgrooveSchema = z.object({
  // id: z.string(),
  userId: z.number(),
  grooveId: z.number(),
});
export type UsersgrooveResponseBodyGet =
  | {
      error: string;
    }
  | {
      usersgrooves: Usersgroove;
    };

export type UsersgrooveResponseBodyPost =
  | {
      error: string;
    }
  | {
      usersgroove: Usersgroove;
    };

export async function GET(): Promise<NextResponse<UsersgrooveResponseBodyGet>> {
  // const { searchParams } = new URL(request.url);

  const usersgrooves = await getUsersgrooves();

  return NextResponse.json({ usersgrooves: usersgrooves });
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<UsersgrooveResponseBodyPost>> {
  const body = await request.json();

  const result = usersgrooveSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        errors: 'Request body is missing some properties',
      },
      { status: 400 },
    );
  }

  const newUsersgroove = await createUsersgrooves(
    result.data.userId,
    result.data.grooveId,
  );
  // if (!newUsersgroove) {
  //   return NextResponse.json(
  //     {
  //       error: [{ message: 'user creation failed' }],
  //     },
  //     { status: 500 },
  //   );
  // }
  return NextResponse.json({ usersgrooves: newUsersgroove });
}
