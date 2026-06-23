import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Hera Hafeez",
    role: "Local Guide · Google Review",
    text: "Mashallah 🌺🌹💕 Halal food!! Amazing food - fantastic!! We ordered chicken tandoori, biryani, seekh kebab and naan. The owner Saeed gave us free complimentary dessert!!",
  },
  {
    name: "Ibrahim Charniya",
    role: "Google Review",
    text: "Excellent Food & Good Service! Parivar is one of the best food places in the Wiley Park area. If you are looking for authenticity, rich flavours and high quality meals this is the place to go.",
  },
  {
    name: "Jameel Ahmed",
    role: "Local Guide · Google Review",
    text: "Had Hyderabadi Haleem, it was too delicious. Loved Mango Lassi. And the Rasmalai was just awesome, I highly recommend this restaurant. Most important thing it is HALAL, and it is opened till midnight. The BEST HYDERABADI FOOD I have ever had in Australia.",
  },
];

export function Testimonials() {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="gold-divider justify-center mb-6">
            <span className="h-px w-10 bg-gold/40" /> Kind Words <span className="h-px w-10 bg-gold/40" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl">
            From Our <span className="text-gold-gradient italic">Parivar</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="glass rounded-2xl p-8 relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-gold/20" />
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="font-display italic text-lg text-foreground/90 leading-relaxed mb-6">
                "{r.text}"
              </blockquote>
              <figcaption className="border-t border-gold/20 pt-4">
                <div className="font-display text-lg text-gold">{r.name}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{r.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
