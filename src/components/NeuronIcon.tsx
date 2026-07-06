import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// A neuron "icon": an animated pyramidal-neuron glyph that sketches itself in,
// ringed by the three headline figures. Every number here matches /citations
// (Azevedo 2009 neuron counts; standard synapse densities; the ~2M km wiring
// estimate derived in full on the citations page).

const MOUSE = "#7ee0ff"; // cyan — the mouse brain
const HUMAN = "#b78bff"; // violet — the human brain

// Headline figures. Mouse synapses shown at ~250B, the midpoint of the cited
// ~200–300 billion range, to keep the three cards parallel.
const STATS: { label: string; human: string; mouse: string }[] = [
  { label: "Neurons", human: "86 billion", mouse: "70 million" },
  { label: "Synapses", human: "100 trillion", mouse: "~250 billion" },
  { label: "Wiring", human: "~2 million km", mouse: "~2,000 km" },
];

// Every stroke of the glyph, longest-first so the draw-in reads as a trunk
// sprouting a tuft, then basal dendrites, then the axon dropping away.
const APICAL = [
  "M100 168 L100 60", // trunk
  "M100 60 L82 30",
  "M100 60 L118 30",
  "M100 60 L72 42",
  "M100 60 L128 42",
  "M100 88 L74 58",
  "M100 92 L126 62",
  "M100 116 L70 96",
  "M100 122 L130 102",
];
const BASAL = [
  "M88 196 L52 218",
  "M112 196 L148 218",
  "M100 200 L82 252",
  "M100 200 L118 252",
  "M84 192 L40 196",
  "M116 192 L160 196",
];

function Glyph({ run }: { run: boolean }) {
  const draw = (d: string, i: number, base: number) => (
    <motion.path
      key={d}
      d={d}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={run ? { pathLength: 1, opacity: 0.95 } : {}}
      transition={{ duration: 1.1, delay: base + i * 0.08, ease: "easeInOut" }}
    />
  );

  return (
    <svg viewBox="0 0 200 280" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="neuronIconStroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={HUMAN} />
          <stop offset="100%" stopColor={MOUSE} />
        </linearGradient>
        <radialGradient id="neuronIconSoma" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor={HUMAN} />
          <stop offset="100%" stopColor={MOUSE} />
        </radialGradient>
      </defs>

      <g
        fill="none"
        stroke="url(#neuronIconStroke)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 5px rgba(150,170,255,0.55))" }}
      >
        {APICAL.map((d, i) => draw(d, i, 0.2))}
      </g>
      <g
        fill="none"
        stroke="url(#neuronIconStroke)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
        style={{ filter: "drop-shadow(0 0 5px rgba(150,170,255,0.55))" }}
      >
        {BASAL.map((d, i) => draw(d, i, 0.9))}
      </g>

      {/* Axon dropping away below the soma. */}
      <motion.path
        d="M100 196 L100 268"
        fill="none"
        stroke="url(#neuronIconStroke)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={run ? { pathLength: 1, opacity: 0.7 } : {}}
        transition={{ duration: 1, delay: 1.5, ease: "easeInOut" }}
      />

      {/* Soma — fades in and gently breathes. */}
      <motion.ellipse
        cx="100"
        cy="184"
        rx="14"
        ry="13"
        fill="url(#neuronIconSoma)"
        initial={{ scale: 0, opacity: 0 }}
        animate={run ? { scale: [0, 1.12, 1], opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
        style={{ transformOrigin: "100px 184px", filter: "drop-shadow(0 0 8px rgba(183,139,255,0.8))" }}
      />
    </svg>
  );
}

export default function NeuronIcon({ run }: { run: boolean }) {
  return (
    <div className="rounded-2xl glass p-7 sm:p-8 flex flex-col sm:flex-row items-center gap-8">
      {/* The glyph, with a soft halo behind it. */}
      <div className="relative shrink-0" style={{ width: 150, height: 210 }}>
        <div
          className="absolute inset-0 rounded-full opacity-25 blur-[26px]"
          style={{ background: `radial-gradient(circle, ${HUMAN}, ${MOUSE})` }}
        />
        <div className="relative w-full h-full">
          <Glyph run={run} />
        </div>
      </div>

      {/* Headline stats. */}
      <div className="w-full">
        <p className="text-[11px] uppercase tracking-[0.28em] text-white/45 mb-1.5">One neuron, thousands of connections</p>
        <p className="font-display font-light leading-tight mb-5" style={{ fontSize: "clamp(1.5rem,2.6vw,2.1rem)" }}>
          The most famous cell of the brain
        </p>

        {/* Column key — stated once. */}
        <div className="grid grid-cols-[1fr_auto_auto] items-baseline gap-x-4 sm:gap-x-6 text-[11px] uppercase tracking-[0.2em] pb-2">
          <span />
          <span className="text-right flex items-center gap-1.5 justify-end" style={{ color: MOUSE }}>
            <span className="w-2 h-2 rounded-full" style={{ background: MOUSE }} /> Mouse
          </span>
          <span className="text-right flex items-center gap-1.5 justify-end" style={{ color: HUMAN }}>
            <span className="w-2 h-2 rounded-full" style={{ background: HUMAN }} /> Human
          </span>
        </div>

        {STATS.map((s) => (
          <div key={s.label} className="grid grid-cols-[1fr_auto_auto] items-baseline gap-x-4 sm:gap-x-6 border-t border-white/10 py-2.5">
            <span className="uppercase tracking-[0.22em] text-white/55 text-xs">{s.label}</span>
            <span className="font-display font-light tabular-nums text-right" style={{ color: MOUSE, fontSize: "clamp(0.95rem,1.5vw,1.25rem)" }}>
              {s.mouse}
            </span>
            <span className="font-display font-light tabular-nums text-right" style={{ color: HUMAN, fontSize: "clamp(0.95rem,1.5vw,1.25rem)" }}>
              {s.human}
            </span>
          </div>
        ))}

        <Link to="/citations" className="inline-block mt-4 text-sm text-white/45 hover:text-white/80 transition underline decoration-white/25">
          Sources &amp; calculations →
        </Link>
      </div>
    </div>
  );
}
