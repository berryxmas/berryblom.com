import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function createOgImage({
  title,
  eyebrow = "Berry Blom",
}: {
  title: string;
  eyebrow?: string;
}) {
  const titleSize = title.length > 58 ? 48 : title.length > 36 ? 56 : 64;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F7F3EA",
          color: "#1C1915",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              background: "#C45E3A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#F7F3EA",
              fontSize: 20,
              letterSpacing: 1,
            }}
          >
            BB
          </div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 0.2,
              color: "#7A7168",
            }}
          >
            {eyebrow}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: titleSize,
            lineHeight: 1.15,
            maxWidth: 980,
            letterSpacing: -1.4,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", color: "#C45E3A", fontSize: 22 }}>
          berryblom.com
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
