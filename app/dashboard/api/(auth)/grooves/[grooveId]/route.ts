import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteGrooveById,
  getGrooveById,
  updateGrooveById,
} from '../../../../../../database/grooves';

const grooveSchema = z.object({
  name: z.string(),
  offer: z.string(),
  description: z.string(),
  location: z.string(),
  label: z.string(),
  imgUrl: z.string(),
  userId: z.number(),
  time: z.string(),
  date: z.string(),
  language: z.string(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const grooveId = Number(params.grooveId);

  if (!grooveId) {
    return NextResponse.json(
      {
        errors: 'Request body is missing some properties',
      },
      { status: 400 },
    );
  }
  const singleGroove = await getGrooveById(grooveId);

  return NextResponse.json({ groove: singleGroove });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const grooveId = Number(params.grooveId);

  if (!grooveId) {
    return NextResponse.json(
      {
        errors: 'Request body is missing some properties',
      },
      { status: 400 },
    );
  }
  const singleGroove = await deleteGrooveById(grooveId);

  // if (!singleGroove) {
  //   return NextResponse.json(
  //     {
  //       error: 'Groove not found',
  //     },
  //     { status: 404 },
  //   );
  // }

  return NextResponse.json({ groove: singleGroove });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const grooveId = Number(params.grooveId);

  if (!grooveId) {
    return NextResponse.json(
      {
        errors: 'Groove is not valid',
      },
      { status: 400 },
    );
  }
  const body = await request.json();

  const result = grooveSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request body is missing one of the needed properties',
      },
      { status: 400 },
    );
  }

  const newGroove = await updateGrooveById(
    grooveId,
    result.data.name,
    result.data.offer,
    result.data.description,
    result.data.location,
    result.data.label,
    result.data.imgUrl,
    result.data.userId,
    result.data.time,
    result.data.date,
    result.data.language,
  );

  // if (!newGroove) {
  //   return NextResponse.json(
  //     {
  //       error: 'Groove not found',
  //     },
  //     { status: 404 },
  //   );
  // }
  return NextResponse.json({ groove: newGroove });
}
