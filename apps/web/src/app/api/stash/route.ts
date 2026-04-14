import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json({
    data: { items: [] },
    ok: true,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    data: body,
    ok: true,
  });
}
