import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST() {
  return NextResponse.json({
    data: {
      received: true,
      status: "dispatched",
    },
    ok: true,
  });
}
