import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const storyWords = ["A Recipe", "A Tradition", "A Legacy", "A Flavor"];

export function BiryaniStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context((self) => {
      const words = self.selector?.(".parivar-story-word") ?? [];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000",
          scrub: true,
          pin: true,
        },
      });

      words.forEach((word, index) => {
        tl.to(word, { opacity: 1, y: 0 });

        if (index < words.length - 1) {
          tl.to(word, { opacity: 0, y: -100 }, "+=1");
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-zinc-950 text-white">
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[150px] md:h-[560px] md:w-[560px]" />
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black via-zinc-900 to-black px-6 text-center">
        {storyWords.map((word) => (
          <h2
            key={word}
            className="parivar-story-word absolute text-6xl font-black tracking-normal opacity-0 md:text-8xl lg:text-9xl"
          >
            {word}
          </h2>
        ))}
      </div>
    </section>
  );
}
