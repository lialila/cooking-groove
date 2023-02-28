import { cache } from 'react';
import { sql } from './connect';

export type Groove = {
  id: number;
  name: string;
  offer: string;
  what_looking_for: string;
  description: string | null;
  restriction: string | null;
  time: Date;
  location: string;
  label: string;
};
// get all items in users
export const getGrooves = cache(async () => {
  const grooves = await sql<Groove[]>`
SELECT * FROM grooves
  `;
  return grooves;
});

// get a single user
export const getGroove = cache(async (id: number) => {
  const [groove] = await sql<Groove[]>`
  SELECT * FROM grooves
  WHERE id = ${id}
  `;
  return groove;
});
