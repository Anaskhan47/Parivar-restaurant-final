import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

const highlights = [
  {
    name: "Butter Chicken",
    desc: "Classic creamy tomato curry, mildly spiced — a Parivar favourite",
    price: "$14.99",
  },
  {
    name: "Tandoori (Full)",
    desc: "Full tandoori chicken, marinated in spices and charred to perfection",
    price: "$17.99",
  },
  {
    name: "Chicken Manchurian",
    desc: "Indo-Chinese chicken in tangy, savoury Manchurian sauce",
    price: "$14.99",
  },
];

export function MenuPreview() {
  return (
    <section id="menu" className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="gold-divider mb-6 justify-center">Our Menu</span>
          <h2 className="font-display text-5xl text-foreground md:text-6xl">
            Signature <span className="text-gold-gradient">Flavours</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            From royal biryanis to tandoor-fired kebabs — every dish carries the soul of Hyderabad.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item, i) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group rounded-2xl border border-gold/15 bg-card p-8 transition-all duration-500 hover:border-gold/35 hover:shadow-gold-glow"
            >
              <div className="mb-4 flex items-start justify-between">
                <h3 className="font-display text-2xl text-foreground">{item.name}</h3>
                <span className="font-display text-xl text-gold">{item.price}</span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 text-center"
        >
          <Link
            to="/menu"
            className="inline-flex items-center justify-center rounded-full px-10 py-4 text-sm font-medium uppercase tracking-[0.25em] text-primary-foreground shadow-gold-glow transition-transform hover:scale-105"
            style={{ background: "var(--gradient-gold)" }}
          >
            View Full Menu
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
