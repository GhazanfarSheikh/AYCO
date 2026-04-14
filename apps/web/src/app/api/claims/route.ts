import { NextResponse } from "next/server";

import { claims } from "@/lib/mock-data";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json({
    data: claims,
    ok: true,
  });
}

export async function POST() {
  return NextResponse.json({
    data: {
      id: "AY-20948",
      status: "Processing",
    },
    ok: true,
  });
}
