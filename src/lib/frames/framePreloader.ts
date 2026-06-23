import type { FrameManifest, FrameSet } from "./frameManifest";
import { framePath } from "./frameManifest";

const PRELOAD_AHEAD = 8;
const PRELOAD_BEHIND = 4;
const MAX_CACHE = 48;

export class FramePreloader {
  private cache = new Map<number, HTMLImageElement>();
  private loading = new Set<number>();
  private frameSet: FrameSet;
  private totalFrames: number;

  constructor(manifest: FrameManifest, useMobile: boolean) {
    this.frameSet = useMobile ? manifest.mobile : manifest.desktop;
    this.totalFrames = this.frameSet.count;
  }

  getFrameCount(): number {
    return this.totalFrames;
  }

  getPath(index: number): string {
    return framePath(this.frameSet, index);
  }

  preloadAround(currentIndex: number): void {
    const start = Math.max(1, currentIndex - PRELOAD_BEHIND);
    const end = Math.min(this.totalFrames, currentIndex + PRELOAD_AHEAD);

    for (let i = start; i <= end; i++) {
      this.loadFrame(i);
    }

    this.evictDistant(currentIndex);
  }

  getFrame(index: number): HTMLImageElement | null {
    const clamped = Math.max(1, Math.min(Math.round(index), this.totalFrames));
    const cached = this.cache.get(clamped);
    if (cached?.complete && cached.naturalWidth > 0) {
      return cached;
    }
    this.loadFrame(clamped);
    return cached ?? null;
  }

  private loadFrame(index: number): void {
    if (this.cache.has(index) || this.loading.has(index)) return;

    this.loading.add(index);
    const img = new Image();
    img.decoding = "async";
    img.src = this.getPath(index);

    img.onload = () => {
      this.loading.delete(index);
      this.cache.set(index, img);
    };

    img.onerror = () => {
      this.loading.delete(index);
    };
  }

  private evictDistant(currentIndex: number): void {
    if (this.cache.size <= MAX_CACHE) return;

    const keys = [...this.cache.keys()].sort(
      (a, b) => Math.abs(a - currentIndex) - Math.abs(b - currentIndex),
    );

    while (this.cache.size > MAX_CACHE && keys.length > 0) {
      const farthest = keys.pop()!;
      if (Math.abs(farthest - currentIndex) > PRELOAD_AHEAD + PRELOAD_BEHIND + 4) {
        this.cache.delete(farthest);
      }
    }
  }

  preloadInitial(count = 6): Promise<void> {
    const promises = Array.from({ length: Math.min(count, this.totalFrames) }, (_, i) => {
      const index = i + 1;
      return new Promise<void>((resolve) => {
        if (this.cache.has(index)) {
          resolve();
          return;
        }
        const img = new Image();
        img.decoding = "async";
        img.src = this.getPath(index);
        img.onload = () => {
          this.cache.set(index, img);
          resolve();
        };
        img.onerror = () => resolve();
      });
    });

    return Promise.all(promises).then(() => undefined);
  }

  destroy(): void {
    this.cache.clear();
    this.loading.clear();
  }
}
