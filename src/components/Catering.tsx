import { motion } from "framer-motion";
import { Heart, Briefcase, Users, Sparkles } from "lucide-react";

const events = [
  { icon: Heart, title: "Weddings", desc: "Regal banquets crafted for your most sacred day." },
  { icon: Briefcase, title: "Corporate Events", desc: "Refined hospitality for boardrooms and galas." },
  { icon: Users, title: "Family Gatherings", desc: "Intimate feasts where every guest feels at home." },
  { icon: Sparkles, title: "Community Events", desc: "Grand spreads for festivals and celebrations." },
];

export function Catering() {
  return (
    <section id="catering" className="py-32 relative">
      <div className="absolute inset-0 -z-10" style={{
        background: "radial-gradient(ellipse at center, oklch(0.38 0.14 22 / 0.15), transparent 70%)"
      }} />
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="gold-divider justify-center mb-6">
            <span className="h-px w-10 bg-gold/40" /> Bespoke Catering <span className="h-px w-10 bg-gold/40" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl mb-4">
            Bring Parivar to <span className="text-gold-gradient italic">Your Table</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From intimate gatherings to grand celebrations across Sydney — we bring the kitchen to you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {events.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-xl p-8 border-t-2 border-t-gold/40 hover:border-t-gold hover:-translate-y-2 transition-all duration-500"
            >
              <e.icon className="w-9 h-9 text-gold mb-5" strokeWidth={1.2} />
              <h3 className="font-display text-2xl mb-2">{e.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full text-sm uppercase tracking-[0.25em] font-medium text-primary-foreground shadow-gold-glow hover:scale-105 transition-transform"
            style={{ background: "var(--gradient-gold)" }}
          >
            Book Catering
          </a>
        </div>
      </div>
    </section>
  );
}
