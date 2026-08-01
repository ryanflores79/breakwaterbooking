import { ImageResponse } from "next/og";

export const alt = "Breakwater Booking — Independent booking. Thoughtful representation.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#f2eee5",
          color: "#111a1d",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ position: "absolute", inset: 0, display: "flex", opacity: 0.14, backgroundImage: "linear-gradient(#111a1d 1px, transparent 1px), linear-gradient(90deg, #111a1d 1px, transparent 1px)", backgroundSize: "70px 70px" }} />
        <div style={{ position: "absolute", right: 0, top: 0, width: 290, height: 180, background: "#111a1d", transform: "skewX(-14deg) translateX(34px)" }} />
        <div style={{ position: "absolute", right: 0, bottom: 0, width: 330, height: 180, background: "#111a1d", transform: "skewX(14deg) translateX(34px)" }} />
        <div style={{ position: "absolute", right: 45, top: 312, width: 300, height: 5, background: "#c95d35" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", padding: "62px 68px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 20, fontWeight: 800, letterSpacing: 3 }}>
            <span style={{ color: "#c95d35" }}>BW / 001</span>
            <span>SOUTHERN CALIFORNIA</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontWeight: 800, fontSize: 86, lineHeight: 0.9, letterSpacing: -4 }}>
            <span>INDEPENDENT BOOKING.</span>
            <span style={{ color: "#42666d" }}>THOUGHTFUL REPRESENTATION.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 24, fontWeight: 800, letterSpacing: 2 }}>
            <span style={{ width: 30, height: 30, background: "#111a1d", border: "7px solid #111a1d", boxShadow: "inset 0 8px #f2eee5, inset 0 -8px #f2eee5" }} />
            <span>BREAKWATER BOOKING</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
