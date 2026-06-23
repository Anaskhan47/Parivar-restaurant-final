import { motion } from "framer-motion";
import biryani from "@/assets/dish-biryani.jpg";
import haleem from "@/assets/dish-haleem.jpg";
import grill from "@/assets/dish-grill.jpg";

const dishes = [
  {
    img: biryani,
    name: "Hyderabadi Dum Biryani",
    desc: "Slow-cooked basmati layered with saffron-marinated lamb, sealed under dough — the crown jewel of Nizami cuisine.",
    price: "$32",
    tag: "Signature",
  },
  {
    img: haleem,
    name: "Royal Haleem",
    desc: "A velvet stew of wheat, lentils and tender meat, kissed with ghee and fried onions — a centuries-old ritual.",
    price: "$26",
    tag: "Heritage",
  },
  {
    img: grill,
    name: "Shahi Mixed Grill",
    desc: "Seekh kebab, chicken tikka and lamb chops — charred over open flame, served sizzling on brass.",
    price: "$38",
    tag: "Chef's Choice",
  },
];

export function SignatureDishes() {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="gold-divider justify-center mb-6">
            <span className="h-px w-10 bg-gold/40" /> Signature Creations <span className="h-px w-10 bg-gold/40" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl">
            The <span className="text-gold-gradient italic">Chef's</span> Table
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {dishes.map((dish, i) => (
            <motion.article
              key={dish.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="group relative rounded-2xl overflow-hidden glass shadow-luxury"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={dish.img}
                  alt={dish.name}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                />

                <span className="absolute top-5 left-5 text-[10px] tracking-[0.3em] uppercase text-gold border border-gold/50 px-3 py-1 rounded-full backdrop-blur-md bg-background/50">
                  {dish.tag}
                </span>
              </div>

              <div className="absolute bottom-0 inset-x-0 p-7">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-display text-2xl text-foreground group-hover:text-gold transition-colors">
                    {dish.name}
                  </h3>
                  <span className="font-display text-2xl text-gold whitespace-nowrap">{dish.price}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{dish.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
