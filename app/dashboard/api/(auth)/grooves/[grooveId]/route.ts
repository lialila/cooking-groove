import { NextRequest, NextResponse } from 'next/server';

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
  const singleGroove = getGrooveById(grooveId);

  return NextResponse.json({ message: 'single groove route' });
}
