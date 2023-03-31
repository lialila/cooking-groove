import { cache } from 'react';
import { sql } from './connect';

export type Ingredient = {
  id: number;
  ingredientName: string;
  grooveId: number;
};

export const createIngredient = cache(
  async (ingredientName: string, grooveId: number) => {
    const [ingredient] = await sql<Ingredient[]>`
     INSERT INTO ingredients
  ( ingredient_name, groove_id )
     VALUES
  (${ingredientName}, ${grooveId})
  RETURNING *
  `;
    return ingredient;
  },
);

export const getIngredients = cache(async () => {
  const ingredients = await sql<Ingredient[]>`
  SELECT * FROM ingredients
  `;
  return ingredients;
});

export const getIngredientByGrooveId = cache(async (grooveId: number) => {
  const [ingredient] = await sql<Ingredient[]>`
SELECT * FROM ingredients
WHERE groove_id = ${grooveId}
`;
  return ingredient;
});

export const updateIngredientById = cache(
  async (id: number, ingredientName: string) => {
    const [ingredient] = await sql<Ingredient[]>`
  UPDATE
  ingredients
  SET
  ingredient_name = ${ingredientName}
  WHERE
  id=${id}
  RETURNING *
  `;
    return ingredient;
  },
);

export const getIngredientsByUsersgrovesId = cache(
  async (usersgrooveId: number) => {
    const ingredients = await sql<Ingredient[]>`
SELECT * FROM ingredients
WHERE groove_id = ${usersgrooveId.grooveId}
`;
    return ingredients;
  },
);

export const deleteIngredientByGrooveId = cache(async (grooveId: number) => {
  const [ingredient] = await sql<Ingredient[]>`
  DELETE FROM
    ingredients
  WHERE
    groove_id = ${grooveId}
  RETURNING *
  `;
  return ingredient;
});

export const deleteIngredientById = cache(async (id: number) => {
  const [ingredient] = await sql<Ingredient[]>`
  DELETE FROM
    ingredients
  WHERE
   id = ${id}
  RETURNING *
  `;
  return ingredient;
});
