import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  Comment,
  createComment,
  deleteCommentById,
  getCommentsByGrooveId,
} from '../../../../../../../database/comments';
import { getUserBySessionToken } from '../../../../../../../database/users';

const commentSchema = z.object({
  content: z.string(),
  userId: z.number(),
  grooveId: z.number(),
  createdAt: z.string(),
});

export type CommentResponseBodyGet =
  | {
      error: string;
    }
  | {
      comments: Comment;
    };

export type CommentResponseBodyPost =
  | {
      error: string;
    }
  | {
      comment: Comment;
    };

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<CommentResponseBodyGet>> {
  const grooveId = Number(params.grooveId);
  const comments = await getCommentsByGrooveId(grooveId);

  if (!grooveId) {
    return NextResponse.json(
      {
        errors: 'Request body is missing some properties',
      },
      { status: 400 },
    );
  }

  return NextResponse.json({ comments: comments });
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CommentResponseBodyPost>> {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  const user = token && (await getUserBySessionToken(token.value));
  if (!user) {
    return NextResponse.json({ error: 'User not found' });
  }

  const body = await request.json();

  const result = commentSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        errors: 'Request body is missing some properties',
      },
      { status: 400 },
    );
  }

  const newComment = await createComment(
    result.data.content,
    result.data.userId,
    result.data.grooveId,
    result.data.createdAt,
  );
  if (!newComment) {
    return NextResponse.json(
      {
        error: [{ message: 'comment creation failed' }],
      },
      { status: 500 },
    );
  }
  return NextResponse.json({ comment: newComment });
}
