import { cache } from 'react';
import { sql } from './connect';

export type Comment = {
  id: number;
  content: string;
  userId: number;
  grooveId: number;
  createdAt: string;
};

export const createComment = cache(
  async (
    content: string,
    userId: number,
    grooveId: number,
    createdAt: string,
  ) => {
    const [comment] = await sql<
      {
        id: number;
        content: string;
        userId: number;
        grooveId: number;
        createdAt: string;
      }[]
    >`
  INSERT INTO comments
    (content, user_id, groove_id,   created_at)
  VALUES
    (${content}, ${userId}, ${grooveId}, ${createdAt})
  RETURNING
    id,
    content,
    user_id,
    groove_id,
      created_at
    `;
    return comment;
  },
);
export const getComments = cache(async () => {
  const comment = await sql<Comment[]>`
  SELECT * FROM comments
  `;
  return comment;
});

export const getCommentById = cache(async (id: number) => {
  const comment = await sql<Comment[]>`
  SELECT * FROM comments
  WHERE id = ${id}
  `;
  return comment;
});

export const getCommentsByGrooveId = cache(async (grooveId: number) => {
  const comment = await sql<Comment[]>`
  SELECT * FROM comments
  WHERE groove_id = ${grooveId}
  `;
  return comment;
});

export const deleteCommentById = cache(async (id: number) => {
  const [comment] = await sql<Comment[]>`
  DELETE FROM
    comments
  WHERE
    id = ${id}

  RETURNING *
  `;
  return comment;
});

export const getGrooveByCommentId = cache(async (grooveId: number) => {
  const [comment] = await sql<Comment[]>`
  SELECT * FROM comments
  WHERE groove_id = ${grooveId}
  `;
  return comment;
});
