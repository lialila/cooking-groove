import { cache } from 'react';
import { sql } from './connect';

export type Star = {
  id: number;
};
// get all items in stars
export const getStar = cache(async () => {
  const stars = await sql<Star[]>`
SELECT * FROM stars
  `;
  return stars;
});

// get a single star
export const getStar = cache(async (id: number) => {
  const [star] = await sql<Star[]>`
  SELECT * FROM stars
  WHERE id = ${id}
  `;
  return star;
});
