import { cache } from 'react';
import { sql } from './connect';

export type Usersgroove = {
  id: number;
  userId: number;
  grooveId: number;
};

export const createUsersgrooves = cache(
  async (userId: number, grooveId: number) => {
    const [usersgroove] = await sql<
      {
        id: number;
        userId: number;
        grooveId: number;
      }[]
    >`
  INSERT INTO usersgrooves
    (user_id, groove_id)
  VALUES
    (${userId}, ${grooveId})
  RETURNING
id,
  user_id,
    groove_id
    `;
    return usersgroove;
  },
);

export const getUsersgrooves = cache(async () => {
  const usersgroove = await sql<Usersgroove[]>`
  SELECT * FROM usersgrooves
  `;
  return usersgroove;
});

export const getUsersgroovesById = cache(async (id: number) => {
  const [usersgroove] = await sql<Usersgroove[]>`
  SELECT * FROM usersgrooves
  WHERE id = ${id}
  `;
  return usersgroove;
});

export const getUsersgroovesByUserId = cache(async (userId: number) => {
  const usersgroove = await sql<Usersgroove[]>`
  SELECT * FROM usersgrooves
  WHERE user_id = ${userId}
  `;
  return usersgroove;
});

export const getUsersgroovesByGrooveId = cache(async (grooveId: number) => {
  const usersgroove = await sql<Usersgroove[]>`
  SELECT * FROM usersgrooves
  WHERE groove_id = ${grooveId}
  `;
  return usersgroove;
});

export const deleteUsersgroovesByGrooveId = cache(async (grooveId: number) => {
  const [usersgroove] = await sql<Usersgroove[]>`
  DELETE FROM
    usersgrooves
  WHERE
    groove_id = ${grooveId}
  RETURNING *
  `;
  return usersgroove;
});

// DELETE FROM
// usersgrooves
// WHERE
//   user_id = 32
//   AND
//   groove_id = 3
