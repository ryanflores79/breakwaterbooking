import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "96px",
          height: "96px",
          overflow: "hidden",
          border: "2px solid #111a1d",
          background: "#f2eee5",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-7px",
            left: "-7px",
            width: "69px",
            height: "38px",
            background: "#111a1d",
            transform: "skewX(-20deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-7px",
            left: "-7px",
            width: "69px",
            height: "38px",
            background: "#111a1d",
            transform: "skewX(20deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "46px",
            right: "10px",
            width: "38px",
            height: "4px",
            background: "#c95d35",
          }}
        />
      </div>
    ),
    {
      width: 96,
      height: 96,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  );
}
