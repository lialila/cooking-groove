import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createUsersgrooves,
  deleteUsersgroovesByGrooveId,
  getUsersgrooves,
  Usersgroove,
} from '../../../../../../../database/usersgrooves';

const usersgrooveSchema = z.object({
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

export type UsersgrooveResponseBodyDelete =
  | {
      error: string;
    }
  | {
      usersgroove: Usersgroove;
    };

export async function GET(
  request: NextRequest,
): Promise<NextResponse<UsersgrooveResponseBodyGet>> {
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
  if (!newUsersgroove) {
    return NextResponse.json(
      {
        error: [{ message: 'user creation failed' }],
      },
      { status: 500 },
    );
  }
  return NextResponse.json({ usersgroove: newUsersgroove });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<UsersgrooveResponseBodyDelete>> {
  const grooveId = Number(params.grooveId);

  if (!grooveId) {
    return NextResponse.json(
      {
        errors: 'Request body is missing some properties',
      },
      { status: 400 },
    );
  }
  const singleUsersgroove = await deleteUsersgroovesByGrooveId(grooveId);

  if (!singleUsersgroove) {
    return NextResponse.json(
      {
        error: 'User not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ usersgroove: singleUsersgroove });
}
