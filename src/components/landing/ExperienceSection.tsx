import { motion } from "framer-motion";
import { Flame, Crown, Users } from "lucide-react";

const experiences = [
  {
    icon: Crown,
    title: "Royal Heritage",
    desc: "Recipes passed down through generations of Hyderabadi royal kitchens, brought to life in Sydney.",
  },
  {
    icon: Flame,
    title: "Live Tandoor",
    desc: "Watch our chefs craft naan and kebabs in our open tandoor — theatre and taste in every flame.",
  },
  {
    icon: Users,
    title: "Family Dining",
    desc: "Parivar means family. Every guest is welcomed with warmth, generosity, and unforgettable hospitality.",
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="relative overflow-hidden bg-forest py-24 text-cream md:py-32">
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, var(--gold) 0%, transparent 50%), radial-gradient(circle at 80% 50%, var(--maroon) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="gold-divider mb-6 justify-center text-gold/70">The Experience</span>
          <h2 className="font-display text-5xl md:text-6xl">
            More Than a <span className="text-gold-gradient">Meal</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {experiences.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="rounded-2xl border border-gold/20 bg-black/20 p-8 backdrop-blur-sm"
            >
              <item.icon className="mb-5 h-8 w-8 text-gold" strokeWidth={1.5} />
              <h3 className="mb-3 font-display text-2xl">{item.title}</h3>
              <p className="text-sm leading-relaxed text-cream/70">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
