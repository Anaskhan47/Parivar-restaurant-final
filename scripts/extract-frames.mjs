/**
 * Parivar Restaurant — Video Frame Extraction
 *
 * Extracts frames from the landing page video at 30 FPS,
 * converts to optimized WebP, and generates a manifest.
 *
 * Usage: node scripts/extract-frames.mjs
 */

import { execSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, writeFileSync, rmSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";
import ffprobePath from "ffprobe-static";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const VIDEO = join(ROOT, "Landing page video.mp4");
const FPS = 30;
const DESKTOP_DIR = join(ROOT, "public", "frames", "desktop");
const MOBILE_DIR = join(ROOT, "public", "frames", "mobile");
const MANIFEST_PATH = join(ROOT, "public", "frames", "manifest.json");

function run(cmd, args) {
  const result = spawnSync(cmd, args, { encoding: "utf-8", shell: false });
  if (result.status !== 0) {
    console.error(result.stderr || result.stdout);
    process.exit(1);
  }
  return result.stdout.trim();
}

function getDuration() {
  const output = run(ffprobePath.path, [
    "-v", "error",
    "-show_entries", "format=duration",
    "-of", "default=noprint_wrappers=1:nokey=1",
    VIDEO,
  ]);
  return parseFloat(output);
}

function getResolution() {
  const output = run(ffprobePath.path, [
    "-v", "error",
    "-select_streams", "v:0",
    "-show_entries", "stream=width,height",
    "-of", "csv=p=0",
    VIDEO,
  ]);
  const [w, h] = output.split(",").map(Number);
  return { width: w, height: h };
}

function extractFrames(outputDir, scaleFilter) {
  if (existsSync(outputDir)) {
    rmSync(outputDir, { recursive: true, force: true });
  }
  mkdirSync(outputDir, { recursive: true });

  const vf = scaleFilter
    ? `fps=${FPS},${scaleFilter}`
    : `fps=${FPS}`;

  run(ffmpegPath, [
    "-y",
    "-i", VIDEO,
    "-vf", vf,
    "-c:v", "libwebp",
    "-quality", "80",
    join(outputDir, "frame_%04d.webp"),
  ]);
}

function buildManifest(desktopCount, mobileCount, duration, resolution) {
  const manifest = {
    version: 1,
    source: "Landing page video.mp4",
    fps: FPS,
    duration,
    totalFrames: desktopCount,
    resolution,
    desktop: {
      prefix: "/frames/desktop/frame_",
      extension: ".webp",
      pad: 4,
      count: desktopCount,
    },
    mobile: {
      prefix: "/frames/mobile/frame_",
      extension: ".webp",
      pad: 4,
      count: mobileCount,
    },
    scenes: [
      { id: 1, title: "Authentic Hyderabadi Heritage", start: 0, end: 0.25 },
      { id: 2, title: "Premium Ingredients", start: 0.25, end: 0.5 },
      { id: 3, title: "Slow-Cooked Perfection", start: 0.5, end: 0.75 },
      { id: 4, title: "A Taste of Hyderabad in Sydney", start: 0.75, end: 1 },
    ],
  };

  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  return manifest;
}

function main() {
  if (!existsSync(VIDEO)) {
    console.error(`Video not found: ${VIDEO}`);
    process.exit(1);
  }

  console.log("Analyzing video...");
  const duration = getDuration();
  const resolution = getResolution();
  const expectedFrames = Math.ceil(duration * FPS);

  console.log(`Duration: ${duration.toFixed(2)}s`);
  console.log(`Resolution: ${resolution.width}x${resolution.height}`);
  console.log(`Expected frames @ ${FPS}fps: ~${expectedFrames}`);

  console.log("\nExtracting desktop frames (full resolution)...");
  extractFrames(DESKTOP_DIR, null);

  console.log("Extracting mobile frames (720px width)...");
  extractFrames(MOBILE_DIR, "scale=720:-2");

  const desktopCount = readdirSync(DESKTOP_DIR).filter((f) => f.endsWith(".webp")).length;
  const mobileCount = readdirSync(MOBILE_DIR).filter((f) => f.endsWith(".webp")).length;

  const manifest = buildManifest(desktopCount, mobileCount, duration, resolution);

  console.log(`\nDone!`);
  console.log(`  Desktop frames: ${desktopCount}`);
  console.log(`  Mobile frames:  ${mobileCount}`);
  console.log(`  Manifest:       ${MANIFEST_PATH}`);
}

main();
