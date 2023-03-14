import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteUserById,
  getUserById,
  getUserByUsername,
  updateUserById,
} from '../../../../../../database/users';

const userSchema = z.object({
  username: z.string(),
  name: z.string(),
  email: z.string(),
  profileImgUrl: z.string(),
  eatingExperience: z.string(),
  cookingExperience: z.string(),
  favouriteFood: z.string(),
  language: z.string(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const userId = Number(params.userId);
  console.log('userId from route: ', userId);

  if (!userId) {
    return NextResponse.json(
      {
        errors: 'Request body is missing some properties',
      },
      { status: 400 },
    );
  }
  const singleUser = await getUserById(userId);

  return NextResponse.json({ user: singleUser });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const userId = Number(params.userId);

  if (!userId) {
    return NextResponse.json(
      {
        errors: 'Request body is missing some properties',
      },
      { status: 400 },
    );
  }
  const singleUser = await deleteUserById(userId);

  if (!singleUser) {
    return NextResponse.json(
      {
        error: 'User not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ user: singleUser });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const userId = Number(params.userId);
  console.log('params.username : ', params.userId);

  console.log('params: ', params);
  console.log('userId: ', userId);
  console.log('params.username: ', params.username);

  if (!userId) {
    return NextResponse.json(
      {
        errors: 'User is not found',
      },
      { status: 400 },
    );
  }
  const body = await request.json();

  console.log('body: ', body);

  const result = userSchema.safeParse(body);

  console.log('result: ', result);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request body is missing one of the needed properties',
      },
      { status: 400 },
    );
  }

  //  const passwordHash = await bcrypt.hash(result.data.password, 12);
  // console.log('passwordHash: ', passwordHash);
  const newUser = await updateUserById(
    userId,
    result.data.username,
    result.data.name,
    result.data.email,
    result.data.profileImgUrl,
    result.data.eatingExperience,
    result.data.cookingExperience,
    result.data.favouriteFood,
    result.data.language,
  );

  console.log('newUser: ', newUser);

  if (!newUser) {
    return NextResponse.json(
      {
        error: 'User not found',
      },
      { status: 404 },
    );
  }
  return NextResponse.json({ user: newUser });
}
