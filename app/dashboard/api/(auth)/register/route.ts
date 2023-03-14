import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../../database/sessions';
import { createUser, getUserByUsername } from '../../../../../database/users';
import { createSerializedRegisterSessionTokenCookie } from '../../../../../utils/cookies';

// zod is library for input validation
const userSchema = z.object({
  username: z.string(),
  name: z.string(),
  email: z.string(),
  profileImgUrl: z.string(),
  eatingExperience: z.string(),
  cookingExperience: z.string(),
  favouriteFood: z.string(),
  language: z.string(),
  password: z.string(),
});

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | {
      user: {
        id: any;
        username: string;
      };
    };

export async function POST(request: NextRequest) {
  // 1. check if the data is correct: validate the data
  const body = await request.json();

  const result = userSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        errors: result.error.issues,
      },
      { status: 400 },
    );
  }

  // check if the string is empty
  if (!result.data.username || !result.data.password) {
    return NextResponse.json(
      {
        errors: [{ message: 'username or password are empty' }],
      },
      { status: 400 },
    );
  }
  //  2. check if the user already exists
  //  2a compare the username with the db
  const user = await getUserByUsername(result.data.username);

  if (user) {
    return NextResponse.json(
      {
        errors: [{ message: 'username is already taken' }],
      },
      { status: 400 },
    );
  }
  // 3.hash the password
  const passwordHash = await bcrypt.hash(result.data.password, 12);
  // try to use 'passsword 'as few as possible

  // 4. create the user role
  const newUser = await createUser(
    result.data.username,
    result.data.name,
    result.data.email,
    result.data.profileImgUrl,
    result.data.eatingExperience,
    result.data.cookingExperience,
    result.data.favouriteFood,
    result.data.language,
    passwordHash,
  );

  if (!newUser) {
    return NextResponse.json(
      {
        errors: [{ message: 'user creation failed' }],
      },
      { status: 500 },
    );
  }

  // 5. create a session (in the next chapter)
  // - create the token
  const token = crypto.randomBytes(80).toString('base64');

  const session = await createSession(token, newUser.id);

  if (!session) {
    return NextResponse.json(
      { errors: [{ message: 'session creation failed' }] },
      { status: 500 },
    );
  }

  const serializedCookie = createSerializedRegisterSessionTokenCookie(
    session.token,
  );

  // 6. return the new username
  return NextResponse.json(
    { user: { username: newUser.username } },
    {
      status: 200,
      // - Attach the new cookie serialized to the header of the response
      headers: { 'Set-Cookie': serializedCookie },
    },
  );
}
