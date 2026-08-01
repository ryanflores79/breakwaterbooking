import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Breakwater Booking",
    short_name: "Breakwater",
    description:
      "Independent live booking and artist representation from Southern California.",
    start_url: "/",
    display: "standalone",
    background_color: "#f2eee5",
    theme_color: "#111a1d",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
