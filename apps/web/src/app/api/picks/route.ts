import { NextResponse } from "next/server";

import { listHeatProducts } from "@/lib/mock-data";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json({
    data: listHeatProducts().slice(0, 6),
    ok: true,
  });
}
