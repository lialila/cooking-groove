import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createIngredient,
  deleteIngredientById,
  getIngredientByGrooveId,
  Ingredient,
} from '../../../../../../../../database/ingredients';

const ingredientSchema = z.object({
  ingredientName: z.string(),
  grooveId: z.number(),
});

export type IngredientResponseBodyGet =
  | {
      error: string;
    }
  | {
      ingredients: Ingredient;
    };

export type IngredientResponseBodyPost =
  | {
      error: string;
    }
  | {
      ingredient: Ingredient;
    };

export type IngredientResponseBodyDelete =
  | {
      error: string;
    }
  | {
      ingredient: Ingredient;
    };

// get ingredients from data base
export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<IngredientResponseBodyGet>> {
  const grooveId = Number(params.grooveId);
  const ingredients = await getIngredientByGrooveId(grooveId);

  if (!grooveId) {
    return NextResponse.json(
      {
        errors: 'Request body is missing some properties',
      },
      { status: 400 },
    );
  }

  return NextResponse.json({ ingredients: ingredients });
}

// create ingredient
export async function POST(
  request: NextRequest,
): Promise<NextResponse<IngredientResponseBodyPost>> {
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

// not sure that this is correct in meaning of getting the ingredientId this way
export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<IngredientResponseBodyDelete>> {
  // const grooveId = Number(params.grooveId);
  const ingredientId = Number(params.id);
  const singleIngredient = await deleteIngredientById(ingredientId);

  // const ingredient = await getIngredientByGrooveId(grooveId);

  if (!ingredientId) {
    return NextResponse.json(
      {
        errors: 'Ingredient does not exist',
      },
      { status: 400 },
    );
  }

  if (!singleIngredient) {
    return NextResponse.json(
      {
        errors: 'Ingredient does not exist',
      },
      { status: 400 },
    );
  }
  return NextResponse.json({ ingredient: singleIngredient });
}
