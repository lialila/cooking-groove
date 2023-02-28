import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const userSchema = z.object({
  username: z.string(),
  name: z.string(),
  email: z.string(),
  eating_experience: z.string(),
  cooking_experience: z.string(),
  favourite_food: z.string(),
  language: z.string(),
  password_hash: z.string(),
});

export type RegiesterResponseBody =
  | { error: { message: string }[] }
  | { user: { username: string } };

export const Post = async (request: NextRequest) => {
  // 1. check if the data is correct: validate the data
  const body = await request.json();

  const result = userSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: result.error.issues,
      },
      { status: 400 },
    );
  }

  // check if the string is empty
  //  2. check if the user already exists
  // 3.hash the password
  // 4. create the user role
  // 5. return the new username
};
