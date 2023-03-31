import { z } from 'zod';
import { getIngredientByGrooveId } from '../../../../../../database/ingredients';
import {
  createUsersgroovesingredient,
  deleteUsersgroovesingredientByUsersgroovesId,
  getUsersgroovesingredientByUsersgroovesId,
  getUsersgroovesingredients,
  updateUsersgroovesingredientById,
} from '../../../../../../database/usersgroovesingredients';

export const UsersgroovesingredientSchema = z.object({
  ingredientId: z.number(),
  usersgrooveId: z.number(),
});

export type UsersgroovesingredientResponseBodyGet =
  | {
      error: string;
    }
  | {
      usersgroovesingredient: Usersgroovesingredient;
    };

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<UsersgroovesingredientResponseBodyGet>> {
  const usersgrooveId = Number(params.usersgrooveId);

  if (!usersgrooveId) {
    return NextResponse.json(
      {
        errors: 'Request body is missing some properties',
      },
      { status: 400 },
    );
  }

  const usersgroovesingredient =
    await deleteUsersgroovesingredientByUsersgroovesId(usersgrooveId);

  if (!usersgroovesingredient) {
    return NextResponse.json(
      {
        errors: 'Groove not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    usersgroovesingredient,
  });
}

export type UsersgroovesingredientResponseBodyPost =
  | {
      error: string;
    }
  | {
      usersgroovesingredient: Usersgroovesingredient;
    };

export async function POST(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<UsersgroovesingredientResponseBodyPost>> {
  const usersgrooveId = Number(params.usersgrooveId);

  if (!usersgrooveId) {
    return NextResponse.json(
      {
        errors: 'Request body is missing some properties',
      },
      { status: 400 },
    );
  }
  const ingredient = await getIngredientsByUsersgrovesId();

  const usersgroovesingredient = await createUsersgroovesingredient(
    usersgrooveId,
    ingredientId,
  );

  return NextResponse.json({
    usersgroovesingredient,
  });
}
