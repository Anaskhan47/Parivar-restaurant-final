import { lazy, Suspense, useEffect, useState } from "react";
import type { FrameManifest } from "@/lib/frames/frameManifest";
import { CinematicHero } from "./CinematicHero";
import { StoryOverlay } from "./StoryOverlay";
import { MenuPreview } from "./MenuPreview";
import { ExperienceSection } from "./ExperienceSection";

const ScrollCanvas = lazy(() =>
  import("./ScrollCanvas").then((m) => ({ default: m.ScrollCanvas })),
);

function LoadingFallback() {
  return (
    <section className="flex h-[400vh] items-center justify-center bg-black">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
          <p className="text-xs uppercase tracking-[0.3em] text-gold/60">
            Loading cinematic experience
          </p>
        </div>
      </div>
    </section>
  );
}

export function CinematicLanding() {
  const [manifest, setManifest] = useState<FrameManifest | null>(null);
  const [progress, setProgress] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    fetch("/frames/manifest.json")
      .then((res) => res.json())
      .then((data: FrameManifest) => setManifest(data))
      .catch(() => {
        console.warn("Frame manifest not found. Run: node scripts/extract-frames.mjs");
      });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const heroHeight = window.innerHeight;
      const inAnimationZone =
        window.scrollY > heroHeight * 0.5 &&
        window.scrollY < heroHeight * 5.5;
      setShowOverlay(inAnimationZone);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <CinematicHero />

      {manifest && (
        <>
          {showOverlay && (
            <StoryOverlay scenes={manifest.scenes} progress={progress} />
          )}

          <Suspense fallback={<LoadingFallback />}>
            <ScrollCanvas
              manifest={manifest}
              scrollHeightVh={400}
              onProgress={setProgress}
            />
          </Suspense>
        </>
      )}

      {!manifest && <LoadingFallback />}

      <MenuPreview />
      <ExperienceSection />
    </>
  );
}
