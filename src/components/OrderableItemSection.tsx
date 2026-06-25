import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart";
import logo from "@/assets/parivar-logo.png";

interface Item {
  id?: number;
  name: string;
  description?: string;
  desc?: string;
  price: number;
  image_url?: string;
  img?: string;
  is_available?: boolean;
}

interface OrderableItemSectionProps {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  fallbackItems: Item[];
}

export function OrderableItemSection({ id, category, title, subtitle, fallbackItems }: OrderableItemSectionProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const cartItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL || "http://localhost:8000") + ""}/api/v1/menu?category=${encodeURIComponent(category)}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const available = (data || []).filter((item: Item) => item.is_available !== false);
        setItems(available.length > 0 ? available : fallbackItems);
      } catch {
        setItems(fallbackItems);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [category]);

  const getItemId = (item: Item) => (item.id ? String(item.id) : item.name);

  return (
    <section id={id} className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="gold-divider justify-center mb-6">
            <span className="h-px w-10 bg-gold/40" /> {title} <span className="h-px w-10 bg-gold/40" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl mb-4">
            <span className="text-gold-gradient">{title}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => {
              const itemId = getItemId(item);
              const cartItem = cartItems.find((c) => c.id === itemId);
              return (
                <motion.article
                  key={itemId}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="glass rounded-2xl overflow-hidden border border-gold/10 hover:shadow-gold-glow transition-all duration-300 flex flex-col"
                >
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={item.image_url || item.img}
                      alt={item.name}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = logo;
                      }}
                      className="w-full h-full object-cover"
                    />

                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start gap-3 mb-2">
                      <h3 className="font-display text-xl text-foreground">{item.name}</h3>
                      <span className="text-gold font-display text-lg font-bold whitespace-nowrap">${item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{item.description || item.desc}</p>
                    <div className="mt-4 flex justify-end">
                      {cartItem ? (
                        <div className="flex items-center gap-3 bg-[#0B5D3B]/10 rounded-full px-1 py-1 border border-[#0B5D3B]/20">
                          <button
                            onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                            className="bg-background hover:bg-muted text-[#0B5D3B] w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-medium text-[#0B5D3B] min-w-[1.5rem] text-center">{cartItem.quantity}</span>
                          <button
                            onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                            className="bg-[#0B5D3B] hover:bg-[#094A2F] text-cream w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() =>
                            addItem({
                              id: itemId,
                              name: item.name,
                              price: item.price,
                              image_url: item.image_url || item.img,
                            })
                          }
                          className="bg-[#0B5D3B] text-cream px-5 py-2 rounded-full font-medium hover:bg-[#D4A017] transition-colors flex items-center gap-2 text-sm"
                        >
                          <Plus className="w-4 h-4" />
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
