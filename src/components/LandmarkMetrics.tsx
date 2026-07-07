import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// A few globally-known yardsticks for the brain numbers, tied to figures
// already on the page (86B neurons as baseballs; ~2 million km of axon).
// Every figure is derived on /citations under "Landmark comparisons".

const MOUSE = "#7ee0ff";
const HUMAN = "#b78bff";

type Metric = { big: string; unit: string; sub: string; icon: React.ReactNode };

const stroke = { fill: "none", stroke: "url(#lmStroke)", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const METRICS: Metric[] = [
  {
    big: "~11",
    unit: "Great Pyramids of Giza",
    sub: "86 billion neurons, as baseballs, is ~28 million m³ — enough to build eleven Great Pyramids.",
    icon: (
      <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true">
        <path {...stroke} d="M20 7 L34 33 L6 33 Z" />
        <path {...stroke} strokeWidth={1.2} d="M20 7 L20 33 M13 20 L27 20" opacity={0.5} />
      </svg>
    ),
  },
  {
    big: "9",
    unit: "Eiffel Towers tall",
    sub: "Dumped on the field, that pile of baseballs would rise ~3 km — nine Eiffel Towers, or 3.6 Burj Khalifas.",
    icon: (
      <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true">
        <path {...stroke} d="M20 5 L28 35 M20 5 L12 35" />
        <path {...stroke} strokeWidth={1.4} d="M15 21 L25 21 M13 28 L27 28 M17 13 L23 13" opacity={0.6} />
      </svg>
    ),
  },
  {
    big: "~360×",
    unit: "across the Atlantic",
    sub: "A human brain's axon, laid end to end (~2 million km), crosses the ocean about 360 times.",
    icon: (
      <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true">
        <path {...stroke} d="M5 15 Q11 10 17 15 T29 15 T41 15" />
        <path {...stroke} d="M5 22 Q11 17 17 22 T29 22 T41 22" opacity={0.75} />
        <path {...stroke} d="M5 29 Q11 24 17 29 T29 29 T41 29" opacity={0.5} />
      </svg>
    ),
  },
  {
    big: "~2,700",
    unit: "years to count them",
    sub: "Counting your 86 billion neurons one per second, without stopping, would take ~2,700 years.",
    icon: (
      <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true">
        <circle cx="26" cy="8" r="3.4" fill="url(#lmStroke)" />
        <path {...stroke} d="M25 12 L18 22" />
        <path {...stroke} d="M18 22 L24 27 L20 34" />
        <path {...stroke} d="M18 22 L10 25 L13 32" />
        <path {...stroke} d="M21 16 L28 14" />
        <path {...stroke} d="M21 16 L15 20" />
      </svg>
    ),
  },
];

export default function LandmarkMetrics({ run }: { run: boolean }) {
  return (
    <div className="rounded-2xl glass p-7 sm:p-8">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="lmStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={HUMAN} />
            <stop offset="100%" stopColor={MOUSE} />
          </linearGradient>
        </defs>
      </svg>

      <div className="flex items-baseline justify-between gap-4 mb-1.5">
        <h3 className="font-display text-2xl sm:text-3xl font-light">A few more ways to picture it</h3>
      </div>
      <p className="text-sm text-white/55 mb-6">
        Familiar yardsticks for the same brain numbers.{" "}
        <Link to="/citations#landmark-comparisons" className="underline decoration-white/30 hover:decoration-white text-white/70">
          See the arithmetic →
        </Link>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.unit}
            className="rounded-xl p-5 flex gap-4 items-start"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={run ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="shrink-0 mt-0.5">{m.icon}</div>
            <div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-display font-light tabular-nums" style={{ color: HUMAN, fontSize: "clamp(1.5rem,2.4vw,2rem)" }}>
                  {m.big}
                </span>
                <span className="font-display font-light text-white/85" style={{ fontSize: "clamp(1rem,1.5vw,1.2rem)" }}>
                  {m.unit}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-white/55 leading-relaxed">{m.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
