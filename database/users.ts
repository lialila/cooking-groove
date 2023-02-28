import { cache } from 'react';
import { sql } from './connect';

export type Item = {
  id: number;
  user_name: string;
  email: string;
  eating_experience: string | null;
  cooking_experience: string | null;
  favourite_food: string | null;
  language: string;
};
// get all items in users
export const getUsers = cache(async () => {
  const users = await sql<User[]>`
SELECT * FROM users
  `;
  return users;
});

// get a single user
export const getUser = cache(async (id: number) => {
  const [user] = await sql<User[]>`
  SELECT * FROM users
  WHERE id = ${id}
  `;

  return user;
});
