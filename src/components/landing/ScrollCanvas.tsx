import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { FrameManifest } from "@/lib/frames/frameManifest";
import { isMobileViewport } from "@/lib/frames/frameManifest";
import { FramePreloader } from "@/lib/frames/framePreloader";

gsap.registerPlugin(ScrollTrigger);

interface ScrollCanvasProps {
  manifest: FrameManifest;
  scrollHeightVh?: number;
  onProgress?: (progress: number) => void;
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number,
  dpr: number,
) {
  const cw = width * dpr;
  const ch = height * dpr;

  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = cw / ch;

  let drawW: number;
  let drawH: number;

  if (imgRatio > canvasRatio) {
    drawH = ch;
    drawW = ch * imgRatio;
  } else {
    drawW = cw;
    drawH = cw / imgRatio;
  }

  const offsetX = (cw - drawW) / 2;
  const offsetY = (ch - drawH) / 2;

  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
}

export function ScrollCanvas({
  manifest,
  scrollHeightVh = 400,
  onProgress,
}: ScrollCanvasProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const preloaderRef = useRef<FramePreloader | null>(null);
  const progressRef = useRef(0);
  const rafRef = useRef<number>(0);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });

  const renderFrame = useCallback((progress: number) => {
    const canvas = canvasRef.current;
    const preloader = preloaderRef.current;
    if (!canvas || !preloader) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const total = preloader.getFrameCount();
    const frameIndex = 1 + progress * (total - 1);

    preloader.preloadAround(Math.round(frameIndex));

    const img = preloader.getFrame(frameIndex);
    const { width, height, dpr } = sizeRef.current;

    if (img?.complete && img.naturalWidth > 0) {
      drawCover(ctx, img, width, height, dpr);
    }
  }, []);

  const scheduleRender = useCallback(
    (progress: number) => {
      progressRef.current = progress;
      onProgress?.(progress);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        renderFrame(progressRef.current);
      });
    },
    [renderFrame, onProgress],
  );

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    sizeRef.current = { width, height, dpr };

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    renderFrame(progressRef.current);
  }, [renderFrame]);

  useEffect(() => {
    const useMobile = isMobileViewport();
    const preloader = new FramePreloader(manifest, useMobile);
    preloaderRef.current = preloader;

    preloader.preloadInitial(10).then(() => {
      renderFrame(0);
    });

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => scheduleRender(self.progress),
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      trigger.kill();
      preloader.destroy();
      preloaderRef.current = null;
    };
  }, [manifest, scheduleRender, resizeCanvas, renderFrame]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: `${scrollHeightVh}vh` }}
      aria-label="Cinematic brand story"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          className="block h-screen w-screen"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
