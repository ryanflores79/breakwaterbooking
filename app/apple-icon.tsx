import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ position: "relative", display: "flex", width: "100%", height: "100%", overflow: "hidden", borderRadius: 36, background: "#111a1d" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 126, height: 57, background: "#f2eee5" }} />
        <div style={{ position: "absolute", left: 0, bottom: 0, width: 126, height: 57, background: "#f2eee5" }} />
        <div style={{ position: "absolute", left: 61, top: 87, width: 95, height: 7, background: "#c95d35" }} />
      </div>
    ),
    size,
  );
}
