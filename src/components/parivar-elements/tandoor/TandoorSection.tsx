import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeatParticles } from "./HeatParticles";
import tandooriChickenImage from "@/assets/parivar-elements/tandoor/smoky-and-juicy-tandoori-chicken-pieces-png.webp";

gsap.registerPlugin(ScrollTrigger);

export function TandoorSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1700",
          scrub: true,
          pin: true,
        },
      });

      tl.set(".parivar-tandoor-fire-word", { opacity: 0, scale: 0.8 });
      tl.set([".parivar-tandoor-flavor-line", ".parivar-tandoor-detail-line"], { opacity: 0, y: 42 });
      tl.set(".parivar-tandoor-chicken", { opacity: 0, y: 80, rotate: 0, scale: 0.86 });

      tl.to(".parivar-tandoor-scene", { backgroundColor: "#030201", duration: 0.6 });
      tl.to(".parivar-tandoor-glow", { opacity: 1, scale: 1.18, duration: 1 }, 0.1);
      tl.to(".parivar-tandoor-fire-word", { opacity: 1, scale: 1, duration: 0.75, ease: "power2.out" }, 0.25);
      tl.to(".parivar-tandoor-fire-word", { scale: 1.3, color: "#f7a928", duration: 1, ease: "power1.inOut" });
      tl.to(".parivar-tandoor-flavor-line", { opacity: 1, y: 0, duration: 0.65 }, "-=0.35");
      tl.to(".parivar-tandoor-chicken", { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power2.out" }, "-=0.2");
      tl.to(".parivar-tandoor-chicken", { rotate: 20, duration: 0.8, ease: "sine.inOut" });
      tl.to(".parivar-tandoor-chicken", { rotate: -20, duration: 1.1, ease: "sine.inOut" });
      tl.to(".parivar-tandoor-chicken", { rotate: 20, duration: 1.1, ease: "sine.inOut" });
      tl.to(".parivar-tandoor-detail-line", { opacity: 1, y: 0, duration: 0.7 }, "-=0.55");

      gsap.to(".parivar-tandoor-smoke", {
        y: -180,
        x: 34,
        opacity: 0,
        scale: 1.7,
        duration: 4.8,
        stagger: 0.65,
        repeat: -1,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="parivar-tandoor-scene relative h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(127,29,29,0.22),transparent_46%),linear-gradient(180deg,#050505_0%,#120704_54%,#000_100%)]" />
      <div className="parivar-tandoor-glow absolute left-1/2 top-[58%] h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-600/35 opacity-0 blur-[130px] md:h-[46rem] md:w-[46rem]" />
      <div className="absolute bottom-[-18%] left-1/2 h-[22rem] w-[54rem] -translate-x-1/2 rounded-[50%] bg-red-950/75 blur-[54px] md:h-[26rem] md:w-[72rem]" />
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-black via-red-950/40 to-transparent" />

      <HeatParticles />

      <div className="absolute left-1/2 top-[26%] z-10 w-full -translate-x-1/2 text-center">
        <h2 className="parivar-tandoor-fire-word text-[25vw] font-black leading-none tracking-normal text-orange-600/90 md:text-[18vw]">
          FIRE
        </h2>
      </div>

      <p className="parivar-tandoor-flavor-line absolute left-1/2 top-[53%] z-30 w-full -translate-x-1/2 px-6 text-center text-4xl font-black text-amber-100 md:text-7xl">
        Fire Creates Flavor
      </p>

      <img
        src={tandooriChickenImage}
        alt="Tandoori chicken"
        className="parivar-tandoor-chicken absolute left-1/2 top-[59%] z-20 h-64 w-auto -translate-x-1/2 -translate-y-1/2 select-none drop-shadow-[0_38px_90px_rgba(0,0,0,0.9)] saturate-150 md:h-[28rem]"
        draggable={false}
      />

      <div className="pointer-events-none absolute left-1/2 top-[55%] z-30 h-72 w-72 -translate-x-1/2">
        <span className="parivar-tandoor-smoke absolute left-8 top-20 h-28 w-24 rounded-full bg-zinc-200/10 blur-3xl" />
        <span className="parivar-tandoor-smoke absolute left-28 top-14 h-32 w-24 rounded-full bg-zinc-100/10 blur-3xl" />
        <span className="parivar-tandoor-smoke absolute left-44 top-24 h-24 w-20 rounded-full bg-orange-100/10 blur-3xl" />
      </div>

      <p className="parivar-tandoor-detail-line absolute bottom-16 left-1/2 z-30 w-full max-w-4xl -translate-x-1/2 px-6 text-center text-2xl font-bold text-amber-200 md:text-5xl">
        Cooked In Traditional Tandoors
      </p>
    </section>
  );
}
