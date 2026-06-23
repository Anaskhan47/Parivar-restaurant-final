import { motion } from "framer-motion";
import logo from "@/assets/parivar-logo.png";

export function About() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute -inset-4 rounded-full opacity-30 blur-3xl"
                 style={{ background: "var(--gradient-gold)" }} />
            <div className="relative glass rounded-full p-12 aspect-square flex items-center justify-center">
              <img src={logo} alt="Parivar emblem" className="w-full h-full object-contain" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="gold-divider mb-6">
            <span className="h-px w-10 bg-gold/40" /> Our Story
          </div>
          <h2 className="font-display text-5xl md:text-6xl mb-8 leading-tight">
            A Family.<br />
            <span className="text-gold-gradient italic">A Heritage.</span><br />
            A Feast.
          </h2>
          <p className="text-muted-foreground leading-loose mb-6">
            <span className="text-gold font-display text-2xl">Parivar</span> — meaning <em>family</em> — was born from a longing
            for the bustling kitchens of old Hyderabad. From the cobbled lanes of Charminar to
            the harbour lights of Sydney, we have carried recipes whispered down generations,
            each spice measured by hand, each biryani sealed with reverence.
          </p>
          <p className="text-muted-foreground leading-loose mb-10">
            Every dish on our table tells a story — of Nizami nobility, of monsoon afternoons,
            of grandmothers and their secrets. To dine with us is to be welcomed not as a guest,
            but as kin.
          </p>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gold/20">
            {[
              { num: "1947", label: "Recipes Since" },
              { num: "200+", label: "Dishes Curated" },
              { num: "10K+", label: "Happy Families" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl text-gold mb-1">{s.num}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
