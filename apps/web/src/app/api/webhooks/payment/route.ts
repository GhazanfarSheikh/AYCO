import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST() {
  return NextResponse.json({
    data: {
      received: true,
      status: "processing",
    },
    ok: true,
  });
}
