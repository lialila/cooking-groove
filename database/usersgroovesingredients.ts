import { cache } from 'react';
import { sql } from './connect';

export type Usersgroovesingredient = {
  id: number;
  ingredientId: number;
  usersgrooveId: number;
};

export const createUsersgroovesingredient = cache(
  async (ingredientId: number, usersgrooveId: number) => {
    const [usersgroovesingredient] = await sql<Usersgroovesingredient[]>`

   INSERT INTO
    usersgroovesingredients
( ingredient_id, usersgroove_id )

    VALUES
(${ingredientId}, ${usersgrooveId})
    RETURNING
      *
      `;
    return usersgroovesingredient;
  },
);

export const getUsersgroovesingredients = cache(async () => {
  const usersgroovesingredients = await sql<Usersgroovesingredient[]>`
  SELECT * FROM usersgroovesingredients
  `;
  return usersgroovesingredients;
});

export const getUsersgroovesingredientByUsersgroovesId = cache(
  async (usersgrooveId: number) => {
    const [usersgroovesingredient] = await sql<Usersgroovesingredient[]>`
SELECT * FROM usersgroovesingredients
WHERE usersgroove_id = ${usersgrooveId}
`;
    return usersgroovesingredient;
  },
);

export const updateUsersgroovesingredientById = cache(
  async (id: number, ingredientId: number, usersgrooveId: number) => {
    const [usersgroovesingredient] = await sql<Usersgroovesingredient[]>`
  UPDATE
  usersgroovesingredients
  SET
  ingredient_id = ${ingredientId},
  usersgroove_id = ${usersgrooveId}
  WHERE
  id=${id}
  RETURNING *
  `;
    return usersgroovesingredient;
  },
);

export const deleteUsersgroovesingredientByUsersgroovesId = cache(
  async (usersgrooveId: number) => {
    const [usersgroovesingredient] = await sql<Usersgroovesingredient[]>`
  DELETE FROM
    usersgroovesingredients
  WHERE
    usersgroove_id = ${usersgrooveId}
  RETURNING *
  `;
    return usersgroovesingredient;
  },
);
