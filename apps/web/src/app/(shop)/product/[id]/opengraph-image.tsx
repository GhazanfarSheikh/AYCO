import { ImageResponse } from "next/og";

import { getProductDetail } from "@/features/catalog/api";

export const size = {
  height: 630,
  width: 1200,
};

export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductDetail(id).catch(() => null);

  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background:
          "linear-gradient(135deg, rgba(108,63,255,1), rgba(0,212,255,1), rgba(180,255,58,1))",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        padding: 64,
        width: "100%",
      }}
    >
      <div
        style={{
          background: "rgba(8,8,13,0.82)",
          borderRadius: 32,
          color: "#F5F5F7",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          maxWidth: 900,
          padding: 48,
          width: "100%",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6 }}>AYCO</div>
        <div style={{ fontSize: 72, fontWeight: 700 }}>
          {product?.name ?? "AYCO Pick"}
        </div>
        <div style={{ fontSize: 36 }}>
          {product ? `$${product.price}` : "All You Can Order"}
        </div>
      </div>
    </div>,
    size,
  );
}
