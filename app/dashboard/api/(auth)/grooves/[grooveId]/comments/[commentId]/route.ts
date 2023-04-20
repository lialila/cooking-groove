import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  Comment,
  deleteCommentById,
} from '../../../../../../../../database/comments';

const commentSchema = z.object({
  content: z.string(),
  userId: z.number(),
  grooveId: z.number(),
  createdAt: z.string(),
});

export type CommentResponseBodyDelete =
  | {
      error: string;
    }
  | {
      comment: Comment;
    };

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<CommentResponseBodyDelete>> {
  const commentId = Number(params.commentId);
  if (!commentId) {
    return NextResponse.json(
      {
        errors: 'Request body is missing some properties',
      },
      { status: 400 },
    );
  }
  const singleComment = await deleteCommentById(commentId);
  if (!singleComment) {
    return NextResponse.json(
      {
        errors: 'Comment does not exist',
      },
      { status: 400 },
    );
  }
  return NextResponse.json({ comment: singleComment });
}
