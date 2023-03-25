import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createGroove } from '../../../../../database/grooves';
import { createIngredient } from '../../../../../database/ingredients';
import { getUserBySessionToken } from '../../../../../database/users';
import { validateTokenAgainstSecret } from '../../../../../utils/csrf';

const grooveSchema = z.object({
  name: z.string(),
  offer: z.string(),
  description: z.string(),
  location: z.string(),
  label: z.string(),
  imgUrl: z.string(),
  userId: z.number(),
  time: z.string(),
  date: z.string(),
  language: z.string(),
  csrfToken: z.string(),
  ingredientName: z.string(),
});

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  const user = token && (await getUserBySessionToken(token.value));
  if (!user) {
    return NextResponse.json({ error: 'User not found' });
  }

  const body = await request.json();

  const result = grooveSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        errors: 'Request body is missing some properties',
      },
      { status: 400 },
    );
  }

  // validate csrf token to make sure it's the same as the one in the cookie
  if (!validateTokenAgainstSecret(user.csrfSecret, result.data.csrfToken)) {
    return NextResponse.json(
      {
        error: 'CSRF token is not valid',
      },
      { status: 400 },
    );
  }
  const newGroove = await createGroove(
    result.data.name,
    result.data.offer,
    result.data.description,
    result.data.location,
    result.data.label,
    result.data.imgUrl,
    result.data.userId,
    result.data.time,
    result.data.date,
    result.data.language,
    // token.value,
  );

  // if (!newGroove) {
  //   return NextResponse.json(
  //     {
  //       error: 'Groove creation failed',
  //     },
  //     { status: 400 },
  //   );
  // }

  if (!result.data.ingredientName) {
    return NextResponse.json({
      groove: newGroove,
      id: newGroove.id,
    });
  }
  //   // create ingredients

  const newIngredient = await createIngredient(
    result.data.ingredientName,
    newGroove.id,
  );

  return NextResponse.json({
    groove: newGroove,
    id: newGroove.id,
    ingredient: newIngredient,
  });
}
