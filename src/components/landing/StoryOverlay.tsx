import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { FrameScene } from "@/lib/frames/frameManifest";

interface StoryOverlayProps {
  scenes: FrameScene[];
  progress: number;
}

export function StoryOverlay({ scenes, progress }: StoryOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    sceneRefs.current.forEach((el, i) => {
      if (!el) return;
      const scene = scenes[i];
      const center = (scene.start + scene.end) / 2;
      const range = (scene.end - scene.start) / 2;
      const distance = Math.abs(progress - center) / range;
      const opacity = Math.max(0, 1 - distance * 1.4);
      const y = (1 - opacity) * 24;

      gsap.set(el, { opacity, y, pointerEvents: opacity > 0.1 ? "auto" : "none" });
    });
  }, [progress, scenes]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-20 flex items-end justify-center pb-[12vh] md:pb-[14vh]"
    >
      <div className="relative w-full max-w-4xl px-6 text-center">
        {scenes.map((scene, i) => (
          <div
            key={scene.id}
            ref={(el) => {
              sceneRefs.current[i] = el;
            }}
            className="absolute inset-x-6 bottom-0 flex flex-col items-center gap-4"
            style={{ opacity: 0 }}
          >
            <span className="gold-divider justify-center text-xs tracking-[0.35em] uppercase text-gold/70">
              <span className="h-px w-8 bg-gold/40" />
              Scene {scene.id}
              <span className="h-px w-8 bg-gold/40" />
            </span>
            <h2 className="font-display text-4xl leading-tight text-cream sm:text-5xl md:text-6xl lg:text-7xl">
              {scene.title}
            </h2>
          </div>
        ))}
      </div>

      {/* Cinematic vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/70 to-transparent" />
    </div>
  );
}
