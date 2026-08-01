import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#111a1d",
        }}
      >
        <div style={{ position: "absolute", left: 0, top: 0, width: 22, height: 10, background: "#f2eee5" }} />
        <div style={{ position: "absolute", left: 0, bottom: 0, width: 22, height: 10, background: "#f2eee5" }} />
        <div style={{ position: "absolute", left: 11, top: 15, width: 17, height: 2, background: "#c95d35" }} />
      </div>
    ),
    size,
  );
}
