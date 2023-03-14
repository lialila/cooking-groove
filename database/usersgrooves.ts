import { cache } from 'react';
import { sql } from './connect';

export type Usersgrooves = {
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
  const usersgrooves = await sql<Usersgrooves[]>`
  SELECT * FROM usersgrooves
  `;
  return usersgrooves;
});

export const getUsersgroovesById = cache(async (id: number) => {
  const [usersgrooves] = await sql<Usersgrooves[]>`
  SELECT * FROM usersgrooves
  WHERE id = ${id}
  `;
  return usersgrooves;
});

export const getUsersgroovesByUserId = cache(async (userId: number) => {
  const usersgrooves = await sql<Usersgrooves[]>`
  SELECT * FROM usersgrooves
  WHERE user_id = ${userId}
  `;
  return usersgrooves;
});

export const getUsersgroovesByGrooveId = cache(async (grooveId: number) => {
  const usersgrooves = await sql<Usersgrooves[]>`
  SELECT * FROM usersgrooves
  WHERE groove_id = ${grooveId}
  `;
  return usersgrooves;
});
