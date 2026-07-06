import BrainStatsCompact from "../components/BrainStatsCompact";

// Preview of how the simplified stats block sits inside the wall's card 5
// (left copy panel; the 3D neuron would occupy the right). Route: /scale-wall.
// The full standalone visualization stays at /scale-test.

export default function ScaleWall() {
  return (
    <div
      className="relative min-h-screen w-full text-white overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 62% 45%, rgba(28,39,66,0.5) 0%, rgba(4,6,12,1) 70%)" }}
    >
      {/* soft left scrim, same as the wall */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[46vw]"
        style={{ background: "linear-gradient(to right, rgba(4,6,12,0.85) 0%, rgba(4,6,12,0.5) 32%, rgba(4,6,12,0) 70%)" }}
      />

      {/* placeholder marking where the real 3D neuron renders on the wall */}
      <div className="absolute inset-y-0 right-0 w-[55%] flex items-center justify-center">
        <span className="text-white/15 text-xs uppercase tracking-[0.3em]">3D neuron renders here</span>
      </div>

      {/* left copy panel */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="pl-[4.5vw] pr-8 w-[min(44rem,46vw)]">
          <p className="uppercase tracking-[0.4em] text-white/55 text-sm mb-5">Stage 5 of 8</p>
          <h2 className="font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2.2rem, 3.4vw, 4rem)" }}>
            One neuron, thousands of synapses
          </h2>
          <p className="mt-5 text-white/80 font-light leading-relaxed" style={{ fontSize: "clamp(1.05rem, 1.35vw, 1.5rem)" }}>
            A single neuron makes thousands of connections. Scale that up and the numbers get almost
            impossible to picture:
          </p>

          <div className="mt-8">
            <BrainStatsCompact />
          </div>
        </div>
      </div>
    </div>
  );
}
