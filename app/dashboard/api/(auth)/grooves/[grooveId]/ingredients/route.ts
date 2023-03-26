import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createIngredient } from '../../../../../../../database/ingredients';

const ingredientSchema = z.object({
  ingredientName: z.string(),
  grooveId: z.number(),
});

export type IngredientResponseBodyPost =
  | {
      error: string;
    }
  | {
      ingredient: Ingredient;
    };

// create ingredient
export async function POST(request: NextRequest):
Promise<NextResponse<IngredientResponseBodyPost>> {
  const body = await request.json();

  const result = ingredientSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        errors: 'Request body is missing some properties',
      },
      { status: 400 },
    );
  }

  const newIngredient = await createIngredient(
    result.data.ingredientName,
    result.data.grooveId,
  );
  // if (!newIngredient) {
  //   return NextResponse.json(
  //     {
  //       error: [{ message: 'comment creation failed' }],
  //     },
  //     { status: 500 },
  //   );
  // }
  return NextResponse.json({ ingredient: newIngredient });
}
