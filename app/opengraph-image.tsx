import { ImageResponse } from "next/og";
import { EVENT } from "@/data/siteData";

export const runtime = "edge";

export const alt =
  "India International Solar Show 2026 — Solar, Energy Storage & Clean Energy Expo in Pune";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #07161d 0%, #0b242e 55%, #07161d 100%)",
        color: "#ffffff",
        padding: "64px 72px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 480,
          height: 480,
          right: -130,
          top: -150,
          borderRadius: "50%",
          background: "rgba(31, 113, 181, 0.22)",
          filter: "blur(80px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          left: -100,
          bottom: -170,
          borderRadius: "50%",
          background: "rgba(251, 178, 22, 0.15)",
          filter: "blur(70px)",
        }}
      />

      {/* Top accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 72,
          width: 170,
          height: 5,
          background: "#fbb216",
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 3,
              color: "#fbb216",
              textTransform: "uppercase",
            }}
          >
            Solar • Energy Storage • Clean Energy
          </div>

          <div
            style={{
              display: "flex",
              border: "1px solid rgba(255,255,255,0.16)",
              borderRadius: 999,
              padding: "10px 18px",
              fontSize: 17,
              color: "rgba(255,255,255,0.72)",
            }}
          >
            Pune, India
          </div>
        </div>

        {/* Center */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 1000,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 2.5,
              color: "#fbb216",
              marginBottom: 18,
              textTransform: "uppercase",
            }}
          >
            02–04 October 2026
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 0.98,
              letterSpacing: -3,
            }}
          >
            <span>India International</span>
            <span>Solar Show 2026</span>
          </div>

          <div
            style={{
              display: "flex",
              maxWidth: 900,
              marginTop: 24,
              fontSize: 24,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            {EVENT.positioning ||
              "Connecting India's solar, energy storage and clean-energy ecosystem."}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 22,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                fontSize: 14,
                textTransform: "uppercase",
                letterSpacing: 2,
                color: "rgba(255,255,255,0.42)",
              }}
            >
              Venue
            </span>

            <span
              style={{
                marginTop: 6,
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              Auto Cluster Exhibition Centre, Pune
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 18,
              fontWeight: 700,
              color: "#fbb216",
            }}
          >
            indiasolarshow.com
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}