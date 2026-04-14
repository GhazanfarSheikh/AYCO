import { NextResponse } from "next/server";

import { products } from "@/lib/mock-data";
import { scoutSchema } from "@/lib/validators";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = scoutSchema.safeParse({
    query: searchParams.get("query") ?? "",
  });

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: { code: "invalid_query", message: "Scout needs a real query." },
        ok: false,
      },
      { status: 400 },
    );
  }

  const query = parsed.data.query.toLowerCase();
  const matches = products.filter((product) =>
    `${product.name} ${product.subtitle} ${product.zone}`
      .toLowerCase()
      .includes(query),
  );

  return NextResponse.json({
    data: {
      products: matches.slice(0, 4),
      suggestions: [query, `${query} under $25`, `${query} on Heat`],
    },
    ok: true,
  });
}
