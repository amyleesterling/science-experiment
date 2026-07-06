import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ReferenceTable from "../components/ReferenceTable";

// ---------------------------------------------------------------------------
// Test page for the "brain, by the numbers" comparison viz that will become
// card 5's stats block. Route: /scale-test. Iterate freely here.
// ---------------------------------------------------------------------------

const MOUSE = "#7ee0ff"; // cyan — matches the mouse brain elsewhere
const HUMAN = "#b78bff"; // violet — matches the human brain elsewhere

type Row = {
  key: string;
  label: string;
  mouse: { value: number; display: string; anchor: string };
  human: { value: number; display: string; anchor: string };
  ratio: string;
  unit?: "km";
};

const ROWS: Row[] = [
  {
    key: "neurons",
    label: "Neurons",
    mouse: { value: 70e6, display: "70 million", anchor: "≈ as baseballs, under one Fenway" },
    human: { value: 86e9, display: "86 billion", anchor: "≈ as baseballs, ~50 Fenway Parks" },
    ratio: "~1,200× more",
  },
  {
    key: "synapses",
    label: "Synapses",
    mouse: { value: 250e9, display: "~250 billion", anchor: "~8,000 years to count, one per second" },
    human: { value: 100e12, display: "100 trillion", anchor: "~3 million years to count, one per second" },
    ratio: "~400× more",
  },
  {
    key: "wire",
    label: "Wiring — all axon (not just myelinated)",
    unit: "km",
    mouse: { value: 2000, display: "~2,000 km", anchor: "≈ Boston to Miami (~1,250 mi)" },
    human: { value: 2000000, display: "~2 million km", anchor: "≈ 50 × around the Earth (estimated)" },
    ratio: "~500× more",
  },
];

// Count a value up from 0 once `run` flips true.
function useCountUp(target: number, run: boolean, ms = 1700) {
  const [v, setV] = useState(0);
  const startedRef = useRef(false);
  useEffect(() => {
    if (!run || startedRef.current) return;
    startedRef.current = true;
    let raf = 0;
    let t0 = 0;
    const tick = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, ms]);
  return v;
}

function compact(n: number, unit?: "km"): string {
  if (unit === "km") return Math.round(n).toLocaleString() + " km";
  if (n >= 1e12) return +(n / 1e12).toFixed(n < 1e13 ? 1 : 0) + " trillion";
  if (n >= 1e9) return Math.round(n / 1e9) + " billion";
  if (n >= 1e6) return Math.round(n / 1e6) + " million";
  return Math.round(n).toLocaleString();
}

function Stat({ row, run }: { row: Row; run: boolean }) {
  const m = useCountUp(row.mouse.value, run);
  const h = useCountUp(row.human.value, run);
  // Honest LINEAR bar widths — the mouse reads as the tiny sliver it really
  // is next to the human (a log scale made them look near-equal, hiding the
  // whole point). A small floor keeps the sliver visible as a faint spark.
  const mW = Math.max(0.8, (row.mouse.value / row.human.value) * 100);
  const hW = 100;

  return (
    <div className="rounded-2xl glass p-7 sm:p-8">
      <div className="flex items-baseline justify-between gap-4 mb-6">
        <h3 className="font-display text-2xl sm:text-3xl font-light">{row.label}</h3>
        <span
          className="text-xs uppercase tracking-[0.2em] px-3 py-1 rounded-full"
          style={{ color: HUMAN, background: "rgba(183,139,255,0.12)", border: "1px solid rgba(183,139,255,0.25)" }}
        >
          {row.ratio}
        </span>
      </div>

      {[
        { who: "Mouse brain", color: MOUSE, live: m, spec: row.mouse, w: mW },
        { who: "Human brain", color: HUMAN, live: h, spec: row.human, w: hW },
      ].map((d) => (
        <div key={d.who} className="mb-5 last:mb-0">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[11px] uppercase tracking-[0.28em] text-white/45">{d.who}</span>
            <span className="font-display tabular-nums" style={{ color: d.color, fontSize: "clamp(1.2rem,2vw,1.7rem)" }}>
              {compact(d.live, row.unit)}
            </span>
          </div>
          <div className="relative h-2 mt-2 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: run ? `${d.w}%` : 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: `linear-gradient(90deg, ${d.color}55, ${d.color})`, boxShadow: `0 0 12px ${d.color}88` }}
            />
          </div>
          <p className="mt-1.5 text-sm text-white/55">{d.spec.anchor}</p>
        </div>
      ))}
    </div>
  );
}

// Flagship visual: ~2 million km of axon wrapping the Earth dozens of times.
function EarthWrap({ run }: { run: boolean }) {
  const loops = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="rounded-2xl glass p-7 sm:p-8 flex flex-col sm:flex-row items-center gap-8">
      <svg viewBox="0 0 220 220" width="220" height="220" className="shrink-0">
        <defs>
          <radialGradient id="globe" cx="42%" cy="38%" r="72%">
            <stop offset="0%" stopColor="#2a5e8f" />
            <stop offset="60%" stopColor="#15304d" />
            <stop offset="100%" stopColor="#0a1a2c" />
          </radialGradient>
          <linearGradient id="wire" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#b78bff" />
            <stop offset="100%" stopColor="#7ee0ff" />
          </linearGradient>
        </defs>
        <circle cx="110" cy="110" r="58" fill="url(#globe)" stroke="rgba(126,224,255,0.25)" strokeWidth="1" />
        {/* faint latitude lines */}
        {[-30, 0, 30].map((o) => (
          <ellipse key={o} cx="110" cy={110 + o * 0.9} rx="58" ry={Math.max(6, 58 - Math.abs(o) * 1.4)} fill="none" stroke="rgba(126,224,255,0.12)" strokeWidth="0.6" />
        ))}
        {/* four wrapping orbits */}
        {loops.map((i) => (
          <motion.ellipse
            key={i}
            cx="110"
            cy="110"
            rx="70"
            ry="24"
            fill="none"
            stroke="url(#wire)"
            strokeWidth="1.6"
            strokeLinecap="round"
            transform={`rotate(${i * 45 - 68} 110 110)`}
            style={{ filter: "drop-shadow(0 0 4px rgba(150,170,255,0.7))" }}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={run ? { pathLength: 1, opacity: 0.75 } : {}}
            transition={{ duration: 1.4, delay: 0.3 + i * 0.16, ease: "easeInOut" }}
          />
        ))}
      </svg>
      <div>
        <p className="text-[11px] uppercase tracking-[0.28em] text-white/45 mb-2">Total wiring, human brain</p>
        <p className="font-display font-light" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)" }}>
          ~2&nbsp;million&nbsp;km of axon
        </p>
        <p className="mt-3 text-white/70 leading-relaxed max-w-md">
          Laid end to end, the wiring in a single human brain would wrap around the Earth roughly{" "}
          <span style={{ color: HUMAN }}>50 times</span> — or reach{" "}
          <span style={{ color: HUMAN }}>the Moon and back more than twice</span> (~239,000 miles each way).
          The famous “~100,000 miles” figure is only the ~10% that's myelinated.{" "}
          <Link to="/citations" className="underline decoration-white/30 hover:decoration-white">How this is estimated →</Link>
        </p>
      </div>
    </div>
  );
}

export default function ScaleTest() {
  // Kick the animations off shortly after mount.
  const [run, setRun] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setRun(true), 250);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="min-h-screen w-full text-white" style={{ background: "radial-gradient(ellipse at 50% 0%, #101a2e 0%, #04060c 60%)" }}>
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <p className="text-[11px] uppercase tracking-[0.4em] text-white/45 mb-4">By the numbers</p>
        <h1 className="font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)" }}>
          Brains by the numbers
        </h1>
        <p className="mt-5 text-lg text-white/70 max-w-2xl leading-relaxed">
          A single neuron makes thousands of connections. Scale that up and the numbers stop meaning anything —
          so here they are next to things you can picture.
        </p>

        <div className="mt-12 grid gap-5">
          <EarthWrap run={run} />
          {ROWS.map((r) => (
            <Stat key={r.key} row={r} run={run} />
          ))}
        </div>

        {/* Reference table */}
        <div className="mt-14">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/45 mb-4">Reference</p>
          <ReferenceTable />
          <Link to="/citations" className="inline-block mt-5 text-sm text-white/45 hover:text-white/80 transition underline decoration-white/25">
            Sources &amp; calculations →
          </Link>
        </div>
      </div>
    </div>
  );
}
