import { motion } from "framer-motion";

export function CinematicHero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="gold-divider mb-8 justify-center"
        >
          <span className="h-px w-12 bg-gold/50" />
          Est. Sydney
          <span className="h-px w-12 bg-gold/50" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-display text-7xl leading-[0.95] sm:text-8xl md:text-[10rem]"
        >
          <span className="text-gold-gradient">PARIVAR</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mb-10 font-display text-xl italic text-cream/80 sm:text-2xl md:text-3xl"
        >
          Timeless Indian Flavours in Sydney
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="max-w-md text-sm tracking-[0.2em] uppercase text-cream/50"
        >
          Scroll to experience our story
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-gold/60"
      >
        <div className="flex flex-col items-center gap-3">
          Scroll
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-10 w-px bg-gradient-to-b from-gold to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
