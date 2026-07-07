export type ScaleTestPalette = {
  mouse: string;
  human: string;
  background: string;
  tone: string;
};

export type ScaleTestImageQueueItem = {
  id: string;
  filename: string;
  title: string;
  purpose: string;
  prompt: string;
  negativePrompt: string;
  palette: ScaleTestPalette;
  suggestedAspectRatio: string;
  outputPath: string;
};

export const SCALE_TEST_PALETTE: ScaleTestPalette = {
  mouse: "#7ee0ff",
  human: "#b78bff",
  background: "deep black / blue-black",
  tone: "cosmic, elegant, scientifically grounded, magical but not cartoonish",
};

export const SHARED_STYLE_PREFIX = "cinematic science visualization, deep space-black background with subtle radial glow, luminous cyan and violet palette, elegant museum exhibit design, high contrast, clean negative space for text overlay, magical but scientifically grounded, microscopic neural forms blended with cosmic scale, volumetric glow, crisp details, no labels, no readable text, no numbers, no watermark";

export const SHARED_NEGATIVE_PROMPT = "text, labels, captions, numbers, equations, watermark, logo, fake UI, messy infographic, medical horror, gore, skull, zombie, plastic brain, generic stock photo, oversaturated rainbow, cartoonish clip art, unreadable typography, crowded composition, low resolution, blurry, noisy";

export const scaleTestImageQueue = [
  {
    id: "hero-brains-by-the-numbers",
    filename: "hero-brains-by-the-numbers.webp",
    title: "Hero: Brains by the numbers",
    purpose: "Hero image for the top of the scale-test page.",
    prompt: "cinematic science visualization, deep space-black background with subtle radial glow, luminous cyan and violet palette, elegant museum exhibit design, high contrast, clean negative space for text overlay, magical but scientifically grounded, microscopic neural forms blended with cosmic scale, volumetric glow, crisp details, no labels, no readable text, no numbers, no watermark. cinematic science visualization of a tiny glowing mouse brain and a much larger luminous human brain floating in a dark cosmic field, the mouse brain rendered in electric cyan, the human brain in soft violet, both made of delicate branching neural filaments and faint star-like synapses, elegant museum exhibit design, vast sense of scale, clean negative space in the center-left for title text, deep black-blue radial background, volumetric glow, beautiful and awe-inspiring, no labels, no text, no numbers, no watermark",
    negativePrompt: SHARED_NEGATIVE_PROMPT,
    palette: SCALE_TEST_PALETTE,
    suggestedAspectRatio: "16:9 or wider",
    outputPath: "/scale-test/images/hero-brains-by-the-numbers.webp",
  },
  {
    id: "neurons-cloud-comparison",
    filename: "neurons-cloud-comparison.webp",
    title: "Neuron cloud comparison",
    purpose: "Image for neuron count comparison.",
    prompt: "cinematic science visualization, deep space-black background with subtle radial glow, luminous cyan and violet palette, elegant museum exhibit design, high contrast, clean negative space for text overlay, magical but scientifically grounded, microscopic neural forms blended with cosmic scale, volumetric glow, crisp details, no labels, no readable text, no numbers, no watermark. a surreal but elegant visualization of neurons as glowing pearls of light, a small dense cloud of cyan neuron-points beside an enormous violet galaxy-like cloud of neuron-points, both floating in darkness, the violet cloud vastly larger but still graceful, delicate dendritic threads between points, museum-quality science art, sense of comparison without charts, cinematic lighting, dark radial background, no text, no labels, no numbers",
    negativePrompt: SHARED_NEGATIVE_PROMPT,
    palette: SCALE_TEST_PALETTE,
    suggestedAspectRatio: "16:9",
    outputPath: "/scale-test/images/neurons-cloud-comparison.webp",
  },
  {
    id: "fenway-baseball-scale",
    filename: "fenway-baseball-scale.webp",
    title: "Fenway baseball scale",
    purpose: "Image for the Fenway Park / baseballs scale metaphor.",
    prompt: "cinematic science visualization, deep space-black background with subtle radial glow, luminous cyan and violet palette, elegant museum exhibit design, high contrast, clean negative space for text overlay, magical but scientifically grounded, microscopic neural forms blended with cosmic scale, volumetric glow, crisp details, no labels, no readable text, no numbers, no watermark. wide cinematic view of Fenway Park at night imagined as a scientific scale metaphor, the stadium gently filled with countless small glowing ivory spheres like baseballs, cyan glow rising from a smaller layer and violet glow suggesting a much larger impossible quantity, subtle neural filament patterns in the sky above the stadium, magical realism, accurate stadium-like shape but not logo-focused, dark blue night atmosphere, no text, no numbers, no labels, no watermark",
    negativePrompt: SHARED_NEGATIVE_PROMPT,
    palette: SCALE_TEST_PALETTE,
    suggestedAspectRatio: "16:9",
    outputPath: "/scale-test/images/fenway-baseball-scale.webp",
  },
  {
    id: "synapse-city-lights",
    filename: "synapse-city-lights.webp",
    title: "Synapse city lights",
    purpose: "Image for synapse count comparison.",
    prompt: "cinematic science visualization, deep space-black background with subtle radial glow, luminous cyan and violet palette, elegant museum exhibit design, high contrast, clean negative space for text overlay, magical but scientifically grounded, microscopic neural forms blended with cosmic scale, volumetric glow, crisp details, no labels, no readable text, no numbers, no watermark. an immense field of glowing synapses stretching into the distance like city lights seen from orbit, tiny junctions connected by fine neural filaments, cyan lights in the foreground transitioning into a vast violet horizon, feeling of billions and trillions without showing numbers, cinematic macro-to-cosmic scale, dark background, shallow depth of field, elegant scientific wonder, no text, no labels, no numerals",
    negativePrompt: SHARED_NEGATIVE_PROMPT,
    palette: SCALE_TEST_PALETTE,
    suggestedAspectRatio: "16:9",
    outputPath: "/scale-test/images/synapse-city-lights.webp",
  },
  {
    id: "single-synapse-spark",
    filename: "single-synapse-spark.webp",
    title: "Single synapse spark",
    purpose: "Image explaining one synapse / one connection becoming impossible scale.",
    prompt: "cinematic science visualization, deep space-black background with subtle radial glow, luminous cyan and violet palette, elegant museum exhibit design, high contrast, clean negative space for text overlay, magical but scientifically grounded, microscopic neural forms blended with cosmic scale, volumetric glow, crisp details, no labels, no readable text, no numbers, no watermark. extreme close-up of a single synapse as two luminous neural branches almost touching, a tiny electric spark crossing the gap, surrounded by a vast faint constellation of thousands of other synapses fading into darkness, cyan and violet glow, scientifically inspired but poetic, cinematic macro photography style, clean negative space, no text, no labels, no numbers",
    negativePrompt: SHARED_NEGATIVE_PROMPT,
    palette: SCALE_TEST_PALETTE,
    suggestedAspectRatio: "square or 4:3",
    outputPath: "/scale-test/images/single-synapse-spark.webp",
  },
  {
    id: "earth-wrapped-in-axon-wiring",
    filename: "earth-wrapped-in-axon-wiring.webp",
    title: "Earth wrapped in axon wiring",
    purpose: "Flagship image for the human brain wiring wraps Earth section.",
    prompt: "cinematic science visualization, deep space-black background with subtle radial glow, luminous cyan and violet palette, elegant museum exhibit design, high contrast, clean negative space for text overlay, magical but scientifically grounded, microscopic neural forms blended with cosmic scale, volumetric glow, crisp details, no labels, no readable text, no numbers, no watermark. planet Earth floating in deep space, wrapped many times by impossibly fine glowing neural axon threads, the threads orbit like luminous violet and cyan ribbons around the globe, beautiful scientific visualization, elegant and not cluttered, the wires feel delicate like biology rather than cables, subtle stars, museum installation aesthetic, dramatic lighting, no text, no labels, no numbers, no watermark",
    negativePrompt: SHARED_NEGATIVE_PROMPT,
    palette: SCALE_TEST_PALETTE,
    suggestedAspectRatio: "16:9",
    outputPath: "/scale-test/images/earth-wrapped-in-axon-wiring.webp",
  },
  {
    id: "boston-to-miami-axon",
    filename: "boston-to-miami-axon.webp",
    title: "Boston to Miami axon",
    purpose: "Image for mouse brain wiring scale, approximately Boston to Miami.",
    prompt: "cinematic science visualization, deep space-black background with subtle radial glow, luminous cyan and violet palette, elegant museum exhibit design, high contrast, clean negative space for text overlay, magical but scientifically grounded, microscopic neural forms blended with cosmic scale, volumetric glow, crisp details, no labels, no readable text, no numbers, no watermark. a poetic map-like landscape from Boston to Miami represented as a single glowing cyan neural axon stretching across the eastern United States, not a literal labeled map, just coastline silhouette and city-light hints, the axon meanders like a biological fiber and a road at the same time, dark midnight palette, cyan glow, subtle violet accents, cinematic science illustration, no text, no labels, no numbers",
    negativePrompt: SHARED_NEGATIVE_PROMPT,
    palette: SCALE_TEST_PALETTE,
    suggestedAspectRatio: "16:9",
    outputPath: "/scale-test/images/boston-to-miami-axon.webp",
  },
  {
    id: "moon-and-back-wiring",
    filename: "moon-and-back-wiring.webp",
    title: "Moon and back wiring",
    purpose: "Image for human brain wiring reaching to the Moon and back.",
    prompt: "cinematic science visualization, deep space-black background with subtle radial glow, luminous cyan and violet palette, elegant museum exhibit design, high contrast, clean negative space for text overlay, magical but scientifically grounded, microscopic neural forms blended with cosmic scale, volumetric glow, crisp details, no labels, no readable text, no numbers, no watermark. the Moon and Earth suspended in black space, connected by delicate violet neural axon filaments that loop between them more than once, the fibers glow softly like living threads, subtle cyan highlights, poetic scale metaphor, cinematic lighting, clean composition with space for overlay text, elegant museum science visualization, no text, no labels, no numbers",
    negativePrompt: SHARED_NEGATIVE_PROMPT,
    palette: SCALE_TEST_PALETTE,
    suggestedAspectRatio: "16:9",
    outputPath: "/scale-test/images/moon-and-back-wiring.webp",
  },
  {
    id: "volume-spheres-mouse-human",
    filename: "volume-spheres-mouse-human.webp",
    title: "Mouse and human volume spheres",
    purpose: "Image for mouse versus human brain volume comparison.",
    prompt: "cinematic science visualization, deep space-black background with subtle radial glow, luminous cyan and violet palette, elegant museum exhibit design, high contrast, clean negative space for text overlay, magical but scientifically grounded, microscopic neural forms blended with cosmic scale, volumetric glow, crisp details, no labels, no readable text, no numbers, no watermark. two luminous glass spheres floating above a faint baseline in a dark exhibit-like space, a tiny cyan sphere beside a much larger violet sphere, both filled with branching neural patterns and tiny sparkling synapse-points, clean minimal composition, precise scientific comparison aesthetic, soft glow, lots of negative space, no labels, no numbers, no text",
    negativePrompt: SHARED_NEGATIVE_PROMPT,
    palette: SCALE_TEST_PALETTE,
    suggestedAspectRatio: "16:9",
    outputPath: "/scale-test/images/volume-spheres-mouse-human.webp",
  },
  {
    id: "numbers-dissolve-into-nebula",
    filename: "numbers-dissolve-into-nebula.webp",
    title: "Numbers dissolve into nebula",
    purpose: "Transition image for the idea that numbers stop meaning anything at brain scale.",
    prompt: "cinematic science visualization, deep space-black background with subtle radial glow, luminous cyan and violet palette, elegant museum exhibit design, high contrast, clean negative space for text overlay, magical but scientifically grounded, microscopic neural forms blended with cosmic scale, volumetric glow, crisp details, no labels, no readable text, no numbers, no watermark. abstract visualization of numbers dissolving into stars and neural branches, millions of tiny light-points transforming into a glowing brain-shaped nebula, cyan and violet palette, philosophical science museum style, awe and clarity, deep black background, elegant negative space, no readable text, no actual numerals, no labels",
    negativePrompt: SHARED_NEGATIVE_PROMPT,
    palette: SCALE_TEST_PALETTE,
    suggestedAspectRatio: "16:9",
    outputPath: "/scale-test/images/numbers-dissolve-into-nebula.webp",
  },
  {
    id: "woven-planet-brain",
    filename: "woven-planet-brain.webp",
    title: "Woven planet brain",
    purpose: "General brain wiring image.",
    prompt: "cinematic science visualization, deep space-black background with subtle radial glow, luminous cyan and violet palette, elegant museum exhibit design, high contrast, clean negative space for text overlay, magical but scientifically grounded, microscopic neural forms blended with cosmic scale, volumetric glow, crisp details, no labels, no readable text, no numbers, no watermark. a luminous human brain rendered as a small planet made entirely of woven axon fibers, violet and cyan strands wrapping around sulci like atmospheric currents, tiny spark-like synapses embedded throughout, deep cosmic background, beautiful cinematic science art, soft glow, highly detailed but clean, no text, no labels, no numbers",
    negativePrompt: SHARED_NEGATIVE_PROMPT,
    palette: SCALE_TEST_PALETTE,
    suggestedAspectRatio: "16:9",
    outputPath: "/scale-test/images/woven-planet-brain.webp",
  },
  {
    id: "scale-ladder-earth-brain-neuron-synapse",
    filename: "scale-ladder-earth-brain-neuron-synapse.webp",
    title: "Scale ladder: Earth, brain, neuron, synapse",
    purpose: "Summary or footer image showing the ladder of scale.",
    prompt: "cinematic science visualization, deep space-black background with subtle radial glow, luminous cyan and violet palette, elegant museum exhibit design, high contrast, clean negative space for text overlay, magical but scientifically grounded, microscopic neural forms blended with cosmic scale, volumetric glow, crisp details, no labels, no readable text, no numbers, no watermark. a vertical ladder of scale from planet Earth to brain to neuron to synapse, each level represented as glowing objects connected by a single continuous neural thread, cyan and violet colors, dark cosmic background, elegant educational science poster style, whimsical but not childish, clean spaces for web text overlay, no labels, no text, no numbers",
    negativePrompt: SHARED_NEGATIVE_PROMPT,
    palette: SCALE_TEST_PALETTE,
    suggestedAspectRatio: "portrait or 4:5",
    outputPath: "/scale-test/images/scale-ladder-earth-brain-neuron-synapse.webp",
  }
] as const satisfies readonly ScaleTestImageQueueItem[];

export type ScaleTestImageId = (typeof scaleTestImageQueue)[number]["id"];

export const scaleTestImages = Object.fromEntries(
  scaleTestImageQueue.map((item) => [item.id, item.outputPath]),
) as Record<ScaleTestImageId, string>;

export function getScaleTestImage(id: ScaleTestImageId): string {
  return scaleTestImages[id];
}
