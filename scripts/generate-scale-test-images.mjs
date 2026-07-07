#!/usr/bin/env node
/**
 * Generate the /scale-test image set from src/data/scaleTestImageQueue.ts.
 *
 * Dry run:
 *   npm run generate:scale-test-images -- --dry-run
 *
 * OpenAI generation:
 *   OPENAI_API_KEY=... npm run generate:scale-test-images
 *
 * Useful env vars:
 *   IMAGE_PROVIDER=openai|local        default: openai
 *   IMAGE_MODEL=gpt-image-1            default: gpt-image-1
 *   IMAGE_SIZE=1536x1024               default: derived from suggestedAspectRatio
 *   IMAGE_OUTPUT_FORMAT=webp           default: webp
 *   LOCAL_IMAGE_COMMAND="..."          required when IMAGE_PROVIDER=local
 *
 * Local provider contract:
 *   The command receives env vars IMAGE_ID, IMAGE_PROMPT, IMAGE_NEGATIVE_PROMPT,
 *   IMAGE_OUTPUT_PATH, IMAGE_ASPECT_RATIO, IMAGE_PALETTE_JSON.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const QUEUE_FILE = resolve(ROOT, "src/data/scaleTestImageQueue.ts");
const OUT_DIR = resolve(ROOT, "public/scale-test/images");

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has("--dry-run") || args.has("-n");
const FORCE = args.has("--force");
const PROVIDER = process.env.IMAGE_PROVIDER ?? "openai";
const MODEL = process.env.IMAGE_MODEL ?? "gpt-image-1";
const OUTPUT_FORMAT = process.env.IMAGE_OUTPUT_FORMAT ?? "webp";

function readQueue() {
  const source = readFileSync(QUEUE_FILE, "utf8");
  const match = source.match(/export const scaleTestImageQueue = (\[[\s\S]*?\]) as const satisfies/);
  if (!match) {
    throw new Error(`Could not find scaleTestImageQueue in ${QUEUE_FILE}`);
  }

  const sharedNegative = source.match(/export const SHARED_NEGATIVE_PROMPT = "([\s\S]*?)";/)?.[1];
  const paletteBlock = source.match(/export const SCALE_TEST_PALETTE: ScaleTestPalette = (\{[\s\S]*?\});/)?.[1];

  const js = match[1]
    .replaceAll("SHARED_NEGATIVE_PROMPT", JSON.stringify(sharedNegative ?? ""))
    .replaceAll("SCALE_TEST_PALETTE", paletteBlock ?? "{}");

  return Function(`"use strict"; return (${js});`)();
}

function sizeFor(item) {
  if (process.env.IMAGE_SIZE) return process.env.IMAGE_SIZE;

  const aspect = item.suggestedAspectRatio.toLowerCase();
  if (aspect.includes("portrait") || aspect.includes("4:5")) return "1024x1536";
  if (aspect.includes("square")) return "1024x1024";
  return "1536x1024";
}

async function generateWithOpenAI(item, outputPath) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is required for IMAGE_PROVIDER=openai.");
  }

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      prompt: `${item.prompt}\n\nNegative prompt: ${item.negativePrompt}`,
      size: sizeFor(item),
      output_format: OUTPUT_FORMAT,
      n: 1,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenAI image request failed for ${item.id}: ${response.status} ${body}`);
  }

  const data = await response.json();
  const b64 = data.data?.[0]?.b64_json;
  if (!b64) {
    throw new Error(`OpenAI response for ${item.id} did not include data[0].b64_json.`);
  }

  writeFileSync(outputPath, Buffer.from(b64, "base64"));
}

async function generateWithLocalCommand(item, outputPath) {
  const command = process.env.LOCAL_IMAGE_COMMAND;
  if (!command) {
    throw new Error("LOCAL_IMAGE_COMMAND is required for IMAGE_PROVIDER=local.");
  }

  await new Promise((resolvePromise, reject) => {
    const child = spawn(command, {
      cwd: ROOT,
      shell: true,
      stdio: "inherit",
      env: {
        ...process.env,
        IMAGE_ID: item.id,
        IMAGE_PROMPT: item.prompt,
        IMAGE_NEGATIVE_PROMPT: item.negativePrompt,
        IMAGE_OUTPUT_PATH: outputPath,
        IMAGE_ASPECT_RATIO: item.suggestedAspectRatio,
        IMAGE_PALETTE_JSON: JSON.stringify(item.palette),
      },
    });
    child.on("exit", (code) => {
      if (code === 0) resolvePromise();
      else reject(new Error(`LOCAL_IMAGE_COMMAND exited with code ${code} for ${item.id}`));
    });
  });
}

const queue = readQueue();
mkdirSync(OUT_DIR, { recursive: true });

console.log(`scale-test image queue: ${queue.length} jobs`);
console.log(`manifest: ${QUEUE_FILE}`);
console.log(`output:   ${OUT_DIR}`);
console.log(`provider: ${PROVIDER}${DRY_RUN ? " (dry run)" : ""}`);

for (const [index, item] of queue.entries()) {
  const outputPath = resolve(ROOT, item.outputPath.replace(/^\//, ""));
  const status = existsSync(outputPath) ? "exists" : "missing";
  console.log(`${String(index + 1).padStart(2, "0")}. ${item.id}`);
  console.log(`    title:  ${item.title}`);
  console.log(`    file:   ${item.outputPath} (${status})`);
  console.log(`    ratio:  ${item.suggestedAspectRatio}`);
  if (DRY_RUN) {
    console.log(`    prompt: ${item.prompt}`);
    continue;
  }

  if (existsSync(outputPath) && !FORCE) {
    console.log("    skip: already exists (use --force to regenerate)");
    continue;
  }

  mkdirSync(dirname(outputPath), { recursive: true });
  if (PROVIDER === "openai") {
    await generateWithOpenAI(item, outputPath);
  } else if (PROVIDER === "local") {
    await generateWithLocalCommand(item, outputPath);
  } else {
    throw new Error(`Unknown IMAGE_PROVIDER "${PROVIDER}". Use "openai" or "local".`);
  }
  console.log(`    wrote: ${outputPath}`);
}
