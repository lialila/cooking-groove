import { cache } from 'react';
import { sql } from './connect';

export type Comments = {
  id: number;
  content: string;
  userId: number;
  grooveId: number;
};

export const createComments = cache(
  async (content: string, userId: number, grooveId: number) => {
    const [comment] = await sql<
      {
        id: number;
        content: string;
        userId: number;
        grooveId: number;
      }[]
    >`
  INSERT INTO comments
    (content, user_id, groove_id)
  VALUES
    (${content}, ${userId}, ${grooveId})
  RETURNING
    id,
    content,
    user_id,
    groove_id
    `;
    return comment;
  },
);
export const getComments = cache(async () => {
  const comments = await sql<Comments[]>`
  SELECT * FROM comments
  `;
  return comments;
});

export const getCommentsByGrooveId = cache(async (grooveId: number) => {
  const comments = await sql<Comments[]>`
  SELECT * FROM comments
  WHERE groove_id = ${grooveId}
  `;
  return comments;
});
