function createSealPath() {
  const center = 50;
  const pointCount = 24;
  const points = Array.from({ length: pointCount }, (_, index) => {
    const angle = (Math.PI * 2 * index) / pointCount - Math.PI / 2;
    const wave = Math.sin(angle * 6) * 2.6 + Math.sin(angle * 3 + 0.7) * 1.4;
    const radius = 42 + wave;

    return {
      x: center + Math.cos(angle) * radius,
      y: center + Math.sin(angle) * radius,
    };
  });

  const path = points.map((point, index) => {
    const nextPoint = points[(index + 1) % points.length];
    const midX = (point.x + nextPoint.x) / 2;
    const midY = (point.y + nextPoint.y) / 2;

    if (index === 0) {
      return `M ${midX.toFixed(2)} ${midY.toFixed(2)}`;
    }

    return `Q ${point.x.toFixed(2)} ${point.y.toFixed(2)} ${midX.toFixed(2)} ${midY.toFixed(2)}`;
  });

  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];
  const startMidX = (lastPoint.x + firstPoint.x) / 2;
  const startMidY = (lastPoint.y + firstPoint.y) / 2;

  path.push(`Q ${lastPoint.x.toFixed(2)} ${lastPoint.y.toFixed(2)} ${startMidX.toFixed(2)} ${startMidY.toFixed(2)} Z`);

  return path.join(" ");
}

const sealPath = createSealPath();

export function WaxSealLogoV1() {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className="h-full w-full drop-shadow-[0_10px_16px_rgba(42,37,32,0.14)]"
    >
      <defs>
        <radialGradient id="seal-core" cx="38%" cy="30%" r="72%">
          <stop offset="0%" stopColor="var(--terracotta-light)" />
          <stop offset="45%" stopColor="var(--terracotta)" />
          <stop offset="100%" stopColor="color-mix(in srgb, var(--terracotta) 70%, var(--ink) 30%)" />
        </radialGradient>
        <radialGradient id="seal-inner" cx="35%" cy="28%" r="70%">
          <stop offset="0%" stopColor="color-mix(in srgb, var(--terracotta-light) 82%, white 18%)" />
          <stop offset="55%" stopColor="var(--terracotta)" />
          <stop offset="100%" stopColor="color-mix(in srgb, var(--terracotta) 76%, var(--ink) 24%)" />
        </radialGradient>
        <linearGradient id="seal-shine" x1="20%" y1="8%" x2="78%" y2="84%">
          <stop offset="0%" stopColor="rgba(244,239,228,0.92)" />
          <stop offset="45%" stopColor="rgba(244,239,228,0.16)" />
          <stop offset="100%" stopColor="rgba(244,239,228,0)" />
        </linearGradient>
        <filter id="seal-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="rgba(42,37,32,0.24)" />
        </filter>
      </defs>

      <g filter="url(#seal-shadow)">
        <path d={sealPath} fill="url(#seal-core)" />
        <path
          d={sealPath}
          fill="none"
          stroke="rgba(42,37,32,0.12)"
          strokeWidth="1.2"
        />
      </g>

      <ellipse
        cx="44"
        cy="38"
        rx="27"
        ry="16"
        fill="url(#seal-shine)"
        transform="rotate(-20 44 38)"
        opacity="0.58"
      />
      <path
        d="M18 73 C28 84, 48 89, 72 83"
        fill="none"
        stroke="rgba(244,239,228,0.48)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle
        cx="50"
        cy="52"
        r="27"
        fill="url(#seal-inner)"
        stroke="rgba(244,239,228,0.18)"
        strokeWidth="1"
      />
      <circle
        cx="50"
        cy="52"
        r="22.5"
        fill="none"
        stroke="rgba(42,37,32,0.12)"
        strokeWidth="0.9"
      />
      <text
        x="50"
        y="58"
        textAnchor="middle"
        style={{
          fill: "var(--paper)",
          fontFamily: '"Lora", serif',
          fontSize: 25,
          fontWeight: 500,
          letterSpacing: "0.02em",
        }}
      >
        BB
      </text>
      <text
        x="50"
        y="58"
        textAnchor="middle"
        style={{
          fill: "rgba(42,37,32,0.16)",
          fontFamily: '"Lora", serif',
          fontSize: 25,
          fontWeight: 500,
          letterSpacing: "0.02em",
        }}
        transform="translate(0 1.2)"
      >
        BB
      </text>
      <ellipse
        cx="77"
        cy="61"
        rx="3.5"
        ry="2.4"
        fill="rgba(42,37,32,0.15)"
        transform="rotate(-34 77 61)"
      />
      <ellipse
        cx="76"
        cy="60"
        rx="1.4"
        ry="1"
        fill="rgba(244,239,228,0.32)"
        transform="rotate(-34 76 60)"
      />
    </svg>
  );
}

export function WaxSealLogoV2() {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className="h-full w-full drop-shadow-[0_8px_14px_rgba(42,37,32,0.12)]"
    >
      <defs>
        <radialGradient id="seal-core-v2" cx="40%" cy="32%" r="70%">
          <stop offset="0%" stopColor="color-mix(in srgb, var(--terracotta-light) 74%, var(--paper) 26%)" />
          <stop offset="52%" stopColor="var(--terracotta)" />
          <stop offset="100%" stopColor="color-mix(in srgb, var(--terracotta) 74%, var(--ink) 26%)" />
        </radialGradient>
        <radialGradient id="seal-inner-v2" cx="38%" cy="34%" r="68%">
          <stop offset="0%" stopColor="color-mix(in srgb, var(--terracotta-light) 68%, var(--paper) 32%)" />
          <stop offset="58%" stopColor="color-mix(in srgb, var(--terracotta) 94%, var(--terracotta-light) 6%)" />
          <stop offset="100%" stopColor="color-mix(in srgb, var(--terracotta) 78%, var(--ink) 22%)" />
        </radialGradient>
        <linearGradient id="seal-soft-shine-v2" x1="22%" y1="18%" x2="68%" y2="65%">
          <stop offset="0%" stopColor="rgba(244,239,228,0.34)" />
          <stop offset="60%" stopColor="rgba(244,239,228,0.08)" />
          <stop offset="100%" stopColor="rgba(244,239,228,0)" />
        </linearGradient>
        <filter id="seal-shadow-v2" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2.4" stdDeviation="2.1" floodColor="rgba(42,37,32,0.18)" />
        </filter>
      </defs>

      <g filter="url(#seal-shadow-v2)">
        <path d={sealPath} fill="url(#seal-core-v2)" />
        <path
          d={sealPath}
          fill="none"
          stroke="rgba(42,37,32,0.08)"
          strokeWidth="0.22"
        />
      </g>

      <ellipse
        cx="42"
        cy="38"
        rx="22"
        ry="11.5"
        fill="url(#seal-soft-shine-v2)"
        transform="rotate(-18 42 38)"
        opacity="0.6"
      />
      <path
        d="M23 73 C33 80, 50 83, 67 79"
        fill="none"
        stroke="rgba(244,239,228,0.2)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle
        cx="50"
        cy="52"
        r="26"
        fill="url(#seal-inner-v2)"
        stroke="rgba(244,239,228,0.12)"
        strokeWidth="0.24"
      />
      <circle
        cx="50"
        cy="52"
        r="21.8"
        fill="none"
        stroke="rgba(42,37,32,0.08)"
        strokeWidth="0.18"
      />
      <text
        x="50"
        y="58"
        textAnchor="middle"
        style={{
          fill: "color-mix(in srgb, var(--terracotta-light) 72%, var(--paper) 28%)",
          fontFamily: '"Lora", serif',
          fontSize: 24,
          fontWeight: 500,
          letterSpacing: "0.02em",
        }}
      >
        BB
      </text>
      <text
        x="50"
        y="58"
        textAnchor="middle"
        style={{
          fill: "rgba(42,37,32,0.1)",
          fontFamily: '"Lora", serif',
          fontSize: 24,
          fontWeight: 500,
          letterSpacing: "0.02em",
        }}
        transform="translate(0 0.9)"
      >
        BB
      </text>
      <ellipse
        cx="76"
        cy="60"
        rx="2.9"
        ry="1.95"
        fill="rgba(42,37,32,0.11)"
        transform="rotate(-34 76 60)"
      />
    </svg>
  );
}

export function WaxSealLogo() {
  return <WaxSealLogoV2 />;
}
