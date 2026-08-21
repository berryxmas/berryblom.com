import { createOgImage, ogSize } from "@/lib/og";

export const alt = "Berry Blom | Building, AI, and life";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    title: "I help companies use AI, then I write about what I learned.",
    eyebrow: "Berry Blom",
  });
}
