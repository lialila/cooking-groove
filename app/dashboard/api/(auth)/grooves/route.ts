import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createGroove, getGrooves } from '../../../../../database/grooves';

const grooveSchema = z.object({
  name: z.string(),
  offer: z.string(),
  lookingFor: z.string(),
  description: z.string(),
  location: z.string(),
  label: z.string(),
  imgUrl: z.string(),
  userId: z.number(),
  time: z.string(),
  date: z.string(),
  language: z.string(),
});

export async function GET(request: NextRequest, params) {
  const { searchParams } = new URL(request.url);

  const grooves = await getGrooves();

  return NextResponse.json({ grooves: grooves });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const result = grooveSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        errors: 'Request body is missing some properties',
      },
      { status: 400 },
    );
  }

  const newGroove = await createGroove(
    result.data.name,
    result.data.offer,
    result.data.lookingFor,
    result.data.description,
    result.data.location,
    result.data.label,
    result.data.imgUrl,
    result.data.userId,
    result.data.time,
    result.data.date,
    result.data.language,
  );

  if (!newGroove) {
    return NextResponse.json(
      {
        error: 'Groove creation failed',
      },
      { status: 400 },
    );
  }
  return NextResponse.json({ groove: newGroove });
}
