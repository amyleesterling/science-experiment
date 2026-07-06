// Simplified brain-scale stats for embedding in the wall's card 5 — no
// animated visuals, just the numbers and their tangible anchors, sized to
// read from across a room. The full animated version lives on /scale-test.

const MOUSE = "#7ee0ff";
const HUMAN = "#b78bff";

const STATS: { label: string; mouse: string; human: string; ratio: string; anchor: string }[] = [
  { label: "Neurons", mouse: "70 million", human: "86 billion", ratio: "~1,200×", anchor: "as many as the stars in the Milky Way" },
  { label: "Synapses", mouse: "~250 billion", human: "100 trillion", ratio: "~400×", anchor: "3 million years to count, one per second" },
  { label: "Wiring", mouse: "a few thousand km", human: "160,000 km", ratio: "~50×", anchor: "four laps around the Earth" },
];

export default function BrainStatsCompact() {
  return (
    <div className="flex flex-col gap-4">
      {STATS.map((s) => (
        <div key={s.label} className="border-t border-white/10 pt-3.5">
          <div className="flex items-baseline justify-between gap-3">
            <span className="uppercase tracking-[0.22em] text-white/50 text-xs">{s.label}</span>
            <span className="text-xs text-white/40 tabular-nums">
              <span style={{ color: HUMAN }}>{s.ratio}</span> more in humans
            </span>
          </div>
          <div className="mt-1.5 flex items-baseline gap-2.5 font-display font-light" style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.5rem)" }}>
            <span style={{ color: MOUSE }}>{s.mouse}</span>
            <span className="text-white/30 text-base">→</span>
            <span style={{ color: HUMAN }}>{s.human}</span>
          </div>
          <p className="mt-1 text-white/55 leading-snug" style={{ fontSize: "clamp(0.85rem, 1vw, 1.05rem)" }}>
            ≈ {s.anchor}
          </p>
        </div>
      ))}
    </div>
  );
}
