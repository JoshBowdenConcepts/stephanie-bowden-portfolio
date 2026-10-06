import styles from "./ComingSoonIllustration.module.css";

interface ComingSoonIllustrationProps {
  message?: string;
  variant?: "chart" | "workflow";
}

const bars = [
  { x: 64, height: 56 },
  { x: 104, height: 92 },
  { x: 144, height: 72 },
  { x: 184, height: 116 },
  { x: 224, height: 136 },
];

const steps = [80, 133, 187, 240];
const STEP_Y = 100;

function ChartArt() {
  return (
    <>
      <line x1="48" y1="192" x2="272" y2="192" stroke="#d4d4d8" />
      {bars.map((bar, index) => (
        <rect
          key={bar.x}
          className={styles.bar}
          style={{ animationDelay: `${index * 0.15}s` }}
          x={bar.x}
          y={192 - bar.height}
          width="28"
          height={bar.height}
          rx="4"
          fill={index === bars.length - 1 ? "#111111" : "#d4d4d8"}
        />
      ))}
    </>
  );
}

function WorkflowArt() {
  const first = steps[0];
  const last = steps[steps.length - 1];

  return (
    <>
      <rect
        x={first}
        y={STEP_Y - 1.5}
        width={last - first}
        height="3"
        rx="1.5"
        fill="#e4e4e7"
      />
      <rect
        className={styles.progress}
        x={first}
        y={STEP_Y - 1.5}
        width={last - first}
        height="3"
        rx="1.5"
        fill="#111111"
      />
      {steps.map((x, index) => (
        <g key={x}>
          <circle
            cx={x}
            cy={STEP_Y}
            r="15"
            fill="#ffffff"
            stroke="#d4d4d8"
            strokeWidth="2"
          />
          <g className={`${styles.step} ${styles[`step${index}`]}`}>
            <circle cx={x} cy={STEP_Y} r="16" fill="#111111" />
            <path
              d={`M${x - 6} ${STEP_Y} l4 4 8 -8`}
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <rect
            x={x - 16}
            y={STEP_Y + 28}
            width="32"
            height="6"
            rx="3"
            fill="#d4d4d8"
          />
        </g>
      ))}

      <rect x="48" y="160" width="224" height="36" rx="10" fill="#f4f4f5" />
      <circle cx="68" cy="178" r="9" fill="#d4d4d8" />
      <rect x="86" y="170" width="88" height="7" rx="3.5" fill="#d4d4d8" />
      <rect x="86" y="182" width="56" height="6" rx="3" fill="#e4e4e7" />
      <rect x="212" y="170" width="44" height="16" rx="8" fill="#d4d4d8" />
      <rect
        className={`${styles.step} ${styles.step3}`}
        x="212"
        y="170"
        width="44"
        height="16"
        rx="8"
        fill="#111111"
      />
    </>
  );
}

export default function ComingSoonIllustration({
  message = "Project details coming soon!",
  variant = "chart",
}: ComingSoonIllustrationProps) {
  return (
    <section className={styles.wrapper} aria-labelledby="coming-soon-title">
      <svg
        className={styles.art}
        viewBox="0 0 320 240"
        fill="none"
        aria-hidden="true"
      >
        <g className={styles.float}>
          <rect x="24" y="24" width="272" height="192" rx="16" fill="#ffffff" />
          <rect
            x="24.5"
            y="24.5"
            width="271"
            height="191"
            rx="15.5"
            stroke="#e4e4e7"
          />
          <circle cx="44" cy="44" r="4" fill="#e4e4e7" />
          <circle cx="58" cy="44" r="4" fill="#e4e4e7" />
          <circle cx="72" cy="44" r="4" fill="#e4e4e7" />

          {variant === "workflow" ? <WorkflowArt /> : <ChartArt />}
        </g>

        {[
          { x: 292, y: 26, delay: "0s", scale: 1 },
          { x: 30, y: 206, delay: "0.6s", scale: 0.7 },
          { x: 300, y: 172, delay: "1.2s", scale: 0.55 },
        ].map((sparkle) => (
          <g
            key={`${sparkle.x}-${sparkle.y}`}
            transform={`translate(${sparkle.x} ${sparkle.y}) scale(${sparkle.scale})`}
          >
            <path
              className={styles.sparkle}
              style={{ animationDelay: sparkle.delay }}
              d="M0 -14 L4 -4 L14 0 L4 4 L0 14 L-4 4 L-14 0 L-4 -4 Z"
              fill="#111111"
            />
          </g>
        ))}
      </svg>

      <h2 id="coming-soon-title" className={styles.title}>
        {message}
      </h2>
      <p className={styles.caption}>
        I’m putting the finishing touches on this case study. Check back soon.
      </p>
    </section>
  );
}
