import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import express from 'express';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteUserByUsername,
  getUserById,
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
  password: z.string(),
});

// const router = express.Router();

// router.put('/', async (request, response) => {
//   try {
//     const { name, email, password } = request.body;

//     // Hash the new password
//     const passwordHash = await bcrypt.hash(password, 10);

//     // Update the user's information in the database
//     const updatedUser = await User.findOneAndUpdate(
//       { _id: request.user._id },
//       { name, email, passwordHash },
//       { new: true },
//     );

//     response.json(updatedUser);
//   } catch (error) {
//     console.error(error);
//     response.status(500).json({ message: 'Server Error' });
//   }
// });

export default router;

export async function GET(
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
  const singleUser = await getUserById(userId);

  return NextResponse.json({ user: singleUser });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const userUsername = String(params.userUsername);

  if (!userUsername) {
    return NextResponse.json(
      {
        errors: 'Request body is missing some properties',
      },
      { status: 400 },
    );
  }
  const singleUser = await deleteUserByUsername(userUsername);

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

  if (!userId) {
    return NextResponse.json(
      {
        errors: 'User is not found',
      },
      { status: 400 },
    );
  }
  const body = await request.json();

  const result = userSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request body is missing one of the needed properties',
      },
      { status: 400 },
    );
  }

  const passwordHash = await bcrypt.hash(result.data.password, 12);

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
    passwordHash,
  );

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
