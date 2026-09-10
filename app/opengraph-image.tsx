import { ImageResponse } from "next/og";
import { EVENT } from "@/data/siteData";

export const runtime = "edge";
export const alt = "India Solar International Show 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 60%, #222222 100%)",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#F7941D", letterSpacing: 6, marginBottom: 20 }}>
          02 – 03 – 04 OCT. 2026 · PUNE, INDIA
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 800, color: "white", textAlign: "center", lineHeight: 1.1 }}>
          India Solar International Show
        </div>
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#F7941D", marginTop: 24, letterSpacing: 2 }}>
          CONNECTING SOLAR INDUSTRY
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#E5E5E5", marginTop: 30, textAlign: "center", maxWidth: 900 }}>
          {EVENT.positioning}
        </div>
      </div>
    ),
    { ...size }
  );
}
