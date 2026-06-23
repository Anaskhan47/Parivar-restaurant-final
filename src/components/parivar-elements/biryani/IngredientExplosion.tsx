import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BiryaniPlate } from "./BiryaniPlate";
import legPiece from "@/assets/parivar-elements/biryani/leg-piece.png";
import tandooriLegPieces from "@/assets/parivar-elements/tandoor/tandoori-leg-pieces.png";

gsap.registerPlugin(ScrollTrigger);

export function IngredientExplosion() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 639px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1800",
          scrub: true,
          pin: true,
        },
      });

      tl.set(".parivar-flying-leg", {
        opacity: 1,
        x: "-50%",
        y: "-50%",
        rotate: -8,
        scale: 0.56,
      });

      tl.set(".parivar-tandoori-group", {
        opacity: 0,
        x: "-50%",
        y: "-50%",
        scale: 0.86,
      });

      tl.to(
        ".parivar-biryani-plate",
        {
          opacity: 0,
          rotate: 9,
          scale: 0.78,
          filter: "blur(8px)",
          duration: 0.8,
          ease: "power2.inOut",
        },
        0,
      );

      tl.to(
        ".parivar-flying-leg",
        {
          // left: "58%",
          left: isMobile ? "58%" : "58%",
          top: "37%",
          rotate: -10,
          scale: 0.52,
          duration: 0.9,
          ease: "power2.inOut",
        },
        0.22,
      );

      tl.to(
        ".parivar-tandoori-group",
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        0.75,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_38%,oklch(0.72_0.14_70_/_0.22),transparent_40%),radial-gradient(circle_at_68%_46%,oklch(0.32_0.09_155_/_0.11),transparent_38%),linear-gradient(180deg,oklch(0.97_0.02_85)_0%,oklch(0.95_0.04_75)_100%)]" />
      <div className="absolute left-1/2 top-[45%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-[140px] md:h-[560px] md:w-[560px]" />
      <BiryaniPlate />

      <img
        src={legPiece}
        alt="Chicken leg piece"
        className="parivar-flying-leg pointer-events-none absolute left-[56%] top-[36%] z-30 h-[340px] w-auto select-none drop-shadow-[0_30px_80px_oklch(0_0_0_/_0.34)] sm:left-[54%] sm:top-[34%] sm:h-[450px] lg:h-[560px]"
        draggable={false}
      />

      <img
        src={tandooriLegPieces}
        alt="Tandoori leg pieces"
        className="parivar-tandoori-group pointer-events-none absolute left-1/2 top-1/2 z-20 h-[430px] w-auto select-none drop-shadow-[0_34px_90px_oklch(0_0_0_/_0.26)] sm:h-[540px] lg:h-[650px]"
        draggable={false}
      />
    </section>
  );
}
