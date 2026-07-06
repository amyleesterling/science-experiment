# Inner Cosmos — Wall Display

A standalone, **frozen** build of [Inner Cosmos](https://github.com/amyleesterling/inner_cosmos)
tuned to run as a **non-interactive attract loop on a wall display** (built and
tested against **3628×1600**, a 2.27:1 ultrawide).

It runs the guided-zoom "Explore" experience — human brain → mouse brain →
visual cortex → a cubic millimeter of cortex → a single neuron → one synapse →
an action potential → the calcium-activity swarm — auto-advancing through all
nine stages and then looping forever. Every cell on screen is a real
EM-reconstructed MICrONS mesh, no illustration.

This is intentionally a **separate repo** from `inner_cosmos` so the interactive
site can keep evolving without touching the installation. Port improvements over
by hand when desired; there is no automatic mirror.

## The wall route

Everything runs at **`/attract`**:

- Auto-advances through the nine stages, then fades to black and restarts.
- No navigation, cursor, or on-screen controls — nothing but the experience.
- OrbitControls are disabled so stray input can't hijack the scripted camera.
- The 3D uses a fixed *vertical* field of view, so the ultrawide aspect keeps
  the subject framed and simply adds cinematic space on the sides. Typography is
  scaled up for legibility across a room.

The interactive `/explore` (drag-to-rotate, manual stage stepping, presentation
mode) is still present if you ever want it.

## Run it on the wall

Point a fullscreen/kiosk browser at the deployed `/attract` route:

```sh
chrome --kiosk --window-size=3628,1600 \
  "https://amyleesterling.github.io/science-experiment/attract"
```

## Local development

```sh
npm install
npm run dev        # then open http://localhost:5173/attract (or the printed port)
npm run build      # production build → dist/
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml` (Vite build →
GitHub Pages). Live at `amyleesterling.github.io/science-experiment/`.
The `vite.config.ts` `base` is `/science-experiment/` for the project-Pages path,
and `index.html` is copied to `404.html` so a hard refresh on `/attract`
still loads the app.

## Data

Cell meshes ship as web-optimized `.glb` files in `public/meshes/`, produced
offline by `scripts/extract-meshes.py` from the MICrONS minnie65 (`seg_m1300`)
volume. The mouse brain is the Allen Institute CCF "root" compartment. The
inhibitory cell selection follows Schneider-Mizell et al. 2024. Built with
neuroglancer tooling.
