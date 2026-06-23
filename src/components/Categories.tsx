import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

const categories = [
  { name: "Entrée", img: "/menu-images/Entree/chicken tikka.png", desc: "Tandoori & starters" },
  { name: "Naan Bread", img: "/menu-images/Naan Bread/butter naan.png", desc: "Fresh baked breads" },
  { name: "Savory Items", img: "/menu-images/Savory Items/samosa 2 pcs.png", desc: "Momos & samosas" },
  { name: "Chicken Curries", img: "/menu-images/Chicken Curries/butter chicken.png", desc: "Rich chicken gravies" },
  { name: "Mutton Curries", img: "/menu-images/Mutton Curries/mutton masala.png", desc: "Tender mutton dishes" },
  { name: "Vegetarian Curries", img: "/menu-images/Vegetarian Curries/paneer tikka masala.png", desc: "Paneer & daal" },
  { name: "Desi Chinese", img: "/menu-images/Desi Chinese/chicken fried  rice.png", desc: "Indo-Chinese fusion" },
  { name: "Desserts", img: "/menu-images/Desserts/gulab jamun.png", desc: "Sweet endings" },
  { name: "Drinks", img: "/menu-images/Drinks/chai small.png", desc: "Chai & lassi" },
];

export function Categories() {
  return (
    <section id="menu" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="gold-divider justify-center mb-6">
            <span className="h-px w-10 bg-gold/40" /> Our Curated Menu <span className="h-px w-10 bg-gold/40" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl mb-4">
            <span className="text-gold-gradient">A Royal Spread</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Authentic flavours from our kitchen, each dish crafted with care and tradition.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((cat, i) => (
            <Link
              key={cat.name}
              to="/menu"
              search={{ category: cat.name }}
              className="block outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-2xl group"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group relative h-full glass rounded-2xl overflow-hidden text-center cursor-pointer transition-all duration-500 hover:shadow-gold-glow flex flex-col hover:-translate-y-2 border border-gold/10"
              >
                <div className="h-48 w-full overflow-hidden relative">
                  <img 
                    src={cat.img} 
                    alt={cat.name} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
                
                <div className="p-6 relative flex-1 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm">
                  <h3 className="font-display text-2xl mb-2 text-foreground group-hover:text-gold transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {cat.desc}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
