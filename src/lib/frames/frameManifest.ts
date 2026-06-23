export interface FrameScene {
  id: number;
  title: string;
  start: number;
  end: number;
}

export interface FrameSet {
  prefix: string;
  extension: string;
  pad: number;
  count: number;
}

export interface FrameManifest {
  version: number;
  source: string;
  fps: number;
  duration: number;
  totalFrames: number;
  resolution: { width: number; height: number };
  desktop: FrameSet;
  mobile: FrameSet;
  scenes: FrameScene[];
}

export function framePath(set: FrameSet, index: number): string {
  const clamped = Math.max(1, Math.min(index, set.count));
  return `${set.prefix}${String(clamped).padStart(set.pad, "0")}${set.extension}`;
}

export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 768px)").matches;
}
