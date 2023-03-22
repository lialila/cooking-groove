import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../../database/sessions';
import {
  getUserByUserIdWithPasswordHash,
  getUserByUsernameWithPasswordHash,
} from '../../../../../database/users';
import { createSerializedRegisterSessionTokenCookie } from '../../../../../utils/cookies';
import { createCsrfSecret } from '../../../../../utils/csrf';

const userSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | {
      user: {
        id: number;
        username: string;
      };
    };

export async function POST(request: NextRequest) {
  // 1. validate the data
  const body = await request.json();

  const result = userSchema.safeParse(body);

  if (!result.success) {
    // Inside of result.error.issues you are going to have more granular information about what is failing allowing you to create more specific error massages
    // console.log(result.error.issues);

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
      { errors: [{ message: 'username or password is empty' }] },
      { status: 400 },
    );
  }

  // 2. check if the user exist
  const userWithPasswordHash = await getUserByUsernameWithPasswordHash(
    result.data.username,
  );
  console.log('userWithPasswordHash: ', userWithPasswordHash);

  if (!userWithPasswordHash) {
    // consider using the same output for user or password not valid
    return NextResponse.json(
      { errors: [{ message: 'user not found' }] },
      { status: 401 },
    );
  }

  // 3. validate the password
  const isPasswordValid = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  ); // Boolean

  if (!isPasswordValid) {
    // consider using the same output for user or password not valid
    return NextResponse.json(
      { errors: [{ message: 'password is not valid' }] },
      { status: 401 },
    );
  }

  // 4. create a session
  // - create a token
  const token = crypto.randomBytes(80).toString('base64');
  // base64 is an object created by node.js
  const csrfSecret = createCsrfSecret();
  // - create a session
  const session = await createSession(
    token,
    userWithPasswordHash.id,
    csrfSecret,
  );

  // console.log(session);
  // - attach a new cookie
  // serialize to the header of the response
  if (!session) {
    return NextResponse.json(
      {
        errors: [{ message: 'session creation failed' }],
      },
      { status: 500 },
    );
  }

  const serializedCookie = createSerializedRegisterSessionTokenCookie(
    session.token,
  );
  // add hte new header

  return NextResponse.json(
    {
      user: {
        username: userWithPasswordHash.username,
        id: userWithPasswordHash.id,
      },
    },
    {
      status: 200,
      //   //  Attach serialized new cookie  to the header of the response(?)
      headers: { 'Set-Cookie': serializedCookie },
    },
  );
}
