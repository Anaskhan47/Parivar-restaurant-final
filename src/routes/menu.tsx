import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingBag, Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart";
import logo from "@/assets/parivar-logo.png";


export const Route = createFileRoute("/menu")({
  validateSearch: (search: Record<string, unknown>): { category?: string } => {
    return {
      category: (search.category as string) || undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Menu | Parivar Restaurant" },
      { name: "description", content: "Explore the authentic Indian and Hyderabadi menu at Parivar Restaurant in Sydney. Delicious biryani, curries, and tandoori." },
    ],
  }),
  component: MenuPage,
});

const fallbackMenuData: Record<string, { name: string; desc: string; price: number; image_url: string }[]> = {
  "Entrée": [
    { name: "Tandoori (Half)", desc: "Half tandoori chicken, marinated and charred", price: 11.99, image_url: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?q=80&w=800&auto=format&fit=crop" },
    { name: "Tandoori (Full)", desc: "Full tandoori chicken, smoky and juicy", price: 17.99, image_url: "https://images.unsplash.com/photo-1599487405902-1823ebce1711?q=80&w=800&auto=format&fit=crop" },
    { name: "Chicken Tikka", desc: "Boneless chicken pieces, spiced and grilled", price: 14.99, image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop" },
    { name: "Sheekh Kebab", desc: "Minced meat skewers with aromatic spices", price: 13.99, image_url: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop" },
    { name: "Fish Fry (Basa)", desc: "Crispy fried basa fish with spices", price: 14.99, image_url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop" },
    { name: "Chicken 65", desc: "Spicy deep-fried chicken bites", price: 14.99, image_url: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800&auto=format&fit=crop" },
    { name: "Mutton Haleem", desc: "Slow-cooked lentil and meat stew", price: 14.99, image_url: "https://images.unsplash.com/photo-1548943487-a2e4e43b4859?q=80&w=800&auto=format&fit=crop" },
  ],
  "Naan Bread": [
    { name: "Plain Naan", desc: "Soft, freshly baked naan bread", price: 2.00, image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop" },
    { name: "Butter Naan", desc: "Naan brushed with melted butter", price: 3.00, image_url: "https://images.unsplash.com/photo-1599487405902-1823ebce1711?q=80&w=800&auto=format&fit=crop" },
    { name: "Garlic Naan", desc: "Naan topped with fresh garlic and herbs", price: 3.50, image_url: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?q=80&w=800&auto=format&fit=crop" },
  ],
  "Savory Items": [
    { name: "Momos (10 pcs)", desc: "Steamed dumplings with dipping sauce", price: 11.99, image_url: "https://images.unsplash.com/photo-1626509646543-518ee55030e4?q=80&w=800&auto=format&fit=crop" },
    { name: "Samosa (2 pcs)", desc: "Crispy pastry filled with spiced potatoes", price: 4.99, image_url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop" },
    { name: "Vegetable Roll", desc: "Flaky roll stuffed with seasoned vegetables", price: 2.50, image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop" },
  ],
  "Chicken Curries": [
    { name: "Butter Chicken", desc: "Classic creamy tomato curry, mildly spiced", price: 14.99, image_url: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=800&auto=format&fit=crop" },
    { name: "Achari Chicken", desc: "Chicken in tangy pickle-spiced gravy", price: 14.99, image_url: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800&auto=format&fit=crop" },
    { name: "Chicken Khorma", desc: "Mild, creamy chicken in cashew sauce", price: 13.99, image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop" },
    { name: "Parivar Special Chicken Gravy", desc: "Our signature chicken curry recipe", price: 14.99, image_url: "https://images.unsplash.com/photo-1599487405902-1823ebce1711?q=80&w=800&auto=format&fit=crop" },
    { name: "Chicken Vindaloo", desc: "Fiery Goan-style chicken curry", price: 13.99, image_url: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?q=80&w=800&auto=format&fit=crop" },
    { name: "Chicken Masala", desc: "Rich and spiced chicken masala gravy", price: 14.99, image_url: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop" },
  ],
  "Mutton Curries": [
    { name: "Mutton Vindaloo", desc: "Spicy vindaloo with tender mutton", price: 14.99, image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop" },
    { name: "Mutton Khorma", desc: "Creamy mutton in aromatic korma sauce", price: 14.99, image_url: "https://images.unsplash.com/photo-1548943487-a2e4e43b4859?q=80&w=800&auto=format&fit=crop" },
    { name: "Mutton Masala", desc: "Bold and flavorful mutton masala curry", price: 14.99, image_url: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=800&auto=format&fit=crop" },
  ],
  "Vegetarian Curries": [
    { name: "Daal Tadka", desc: "Yellow lentils tempered with garlic and spices", price: 11.99, image_url: "https://images.unsplash.com/photo-1626509646543-518ee55030e4?q=80&w=800&auto=format&fit=crop" },
    { name: "Mixed Veg Curry", desc: "Seasonal vegetables in a rich gravy", price: 13.99, image_url: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800&auto=format&fit=crop" },
    { name: "Paneer Tikka Masala", desc: "Grilled paneer in spiced tomato sauce", price: 13.99, image_url: "https://images.unsplash.com/photo-1599487405902-1823ebce1711?q=80&w=800&auto=format&fit=crop" },
  ],
  "Desi Chinese": [
    { name: "Chicken Fry Noodles", desc: "Stir-fried noodles with chicken", price: 14.99, image_url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop" },
    { name: "Veg Fry Noodles", desc: "Stir-fried noodles with vegetables", price: 12.99, image_url: "https://images.unsplash.com/photo-1512621843614-b4bf72d1f0d3?q=80&w=800&auto=format&fit=crop" },
    { name: "Chicken Manchurian", desc: "Indo-Chinese chicken in tangy sauce", price: 14.99, image_url: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop" },
    { name: "Veg Manchurian", desc: "Vegetable balls in Manchurian sauce", price: 13.99, image_url: "https://images.unsplash.com/photo-1626509646543-518ee55030e4?q=80&w=800&auto=format&fit=crop" },
    { name: "Chicken Fried Rice", desc: "Wok-tossed rice with chicken and vegetables", price: 14.99, image_url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop" },
    { name: "Veg Fried Rice", desc: "Wok-tossed rice with fresh vegetables", price: 12.99, image_url: "https://images.unsplash.com/photo-1512621843614-b4bf72d1f0d3?q=80&w=800&auto=format&fit=crop" },
  ],
  "Desserts": [
    { name: "Gulab Jamun", desc: "Golden fried milk dumplings in syrup", price: 4.99, image_url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop" },
    { name: "Qubani", desc: "Stewed apricot dessert with cream", price: 4.99, image_url: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=800&auto=format&fit=crop" },
    { name: "Rasmalai", desc: "Soft paneer discs in sweetened milk", price: 4.99, image_url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop" },
    { name: "Shahi Tukda", desc: "Fried bread soaked in saffron milk and nuts", price: 4.99, image_url: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=800&auto=format&fit=crop" },
    { name: "Zafrani Kheer", desc: "Saffron-infused rice pudding", price: 4.99, image_url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop" },
    { name: "Khowa Puri", desc: "Sweet fried bread with thickened milk filling", price: 4.99, image_url: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=800&auto=format&fit=crop" },
  ],
  "Drinks": [
    { name: "Chai Small", desc: "Authentic spiced Indian tea", price: 1.99, image_url: "https://images.unsplash.com/photo-1576092762791-dd9e2220afa1?q=80&w=800&auto=format&fit=crop" },
    { name: "Chai Large", desc: "Large cup of spiced Indian tea", price: 2.99, image_url: "https://images.unsplash.com/photo-1576092762791-dd9e2220afa1?q=80&w=800&auto=format&fit=crop" },
    { name: "Mango Lassi", desc: "Sweet, rich yogurt drink with mango", price: 3.99, image_url: "https://images.unsplash.com/photo-1546171753-97d7676e4602?q=80&w=800&auto=format&fit=crop" },
    { name: "Can Drink", desc: "Assorted canned beverages", price: 2.50, image_url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop" },
    { name: "Water Bottle", desc: "Purified drinking water", price: 1.00, image_url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop" },
  ],
};

const categories = Object.keys(fallbackMenuData);

function MenuPage() {
  const { category } = Route.useSearch();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const cartItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  
  // Fallback if an invalid category is somehow provided in URL
  const activeCategory = (category && categories.includes(category)) ? category : "Entrée";

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL || "http://localhost:8000") + ""}/api/v1/menu?category=${activeCategory}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        
        if (data && data.length > 0) {
          setItems(data);
        } else {
          setItems(fallbackMenuData[activeCategory as keyof typeof fallbackMenuData] || []);
        }
      } catch (err) {
        console.error("Failed to fetch from FastAPI backend, using fallback data:", err);
        setItems(fallbackMenuData[activeCategory as keyof typeof fallbackMenuData] || []);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden pt-32 flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-6 py-10 flex-1 max-w-4xl">
        <Link 
          to="/" 
          hash="menu"
          className="inline-flex items-center gap-2 text-[#042416] hover:text-[#D4A017] transition-colors font-medium mb-10 group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Back to Categories
        </Link>

        <div className="mb-12 text-center">
          <div className="gold-divider mb-4 justify-center">
            <span className="h-px w-10 bg-gold/40" /> Parivar Menu <span className="h-px w-10 bg-gold/40" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-gold">{activeCategory}</h1>
        </div>
        
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-20"
            >
              <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 md:grid-cols-1"
            >
              {items.map((item) => (
                <div key={item.name} className="glass p-4 sm:p-6 rounded-2xl border border-gold/10 flex flex-col sm:flex-row gap-6 items-center sm:items-start hover:shadow-gold-glow transition-all duration-300 hover:-translate-y-1">
                  <div className="w-full sm:w-32 h-32 shrink-0 rounded-xl overflow-hidden border border-gold/20 relative shadow-sm">
                    <img
                      src={resolveImageUrl(item.image_url || item.img, item.category?.name || "", item.name)}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = logo;
                      }}
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl" />
                  </div>
                  <div className="flex-1 w-full text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-2 mb-2">
                      <h3 className="font-display text-2xl font-medium text-foreground">{item.name}</h3>
                      <span className="text-gold font-display text-2xl sm:text-xl font-bold bg-gold/10 px-3 py-1 rounded-full">${item.price}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mt-2 sm:mt-0 max-w-lg mx-auto sm:mx-0">{item.description || item.desc}</p>
                    <div className="mt-4 flex items-center justify-center sm:justify-end">
                      {(() => {
                        const cartItem = cartItems.find((i) => i.id === item.name);
                        return cartItem ? (
                          <div className="flex items-center gap-3 bg-[#0B5D3B]/10 rounded-full px-1 py-1 border border-[#0B5D3B]/20">
                            <button
                              onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                              className="bg-background hover:bg-muted text-[#0B5D3B] w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-medium text-[#0B5D3B] min-w-[1.5rem] text-center">{cartItem.quantity}</span>
                            <button
                              onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                              className="bg-[#0B5D3B] hover:bg-[#094A2F] text-cream w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => addItem({ 
                              id: item.name, 
                              name: item.name, 
                              price: item.price, 
                              image_url: item.image_url || item.img 
                            })}
                            className="bg-[#0B5D3B] text-cream px-5 py-2 rounded-full font-medium hover:bg-[#D4A017] transition-colors duration-300 shadow-sm hover:shadow-gold-glow flex items-center gap-2 text-sm"
                          >
                            <Plus className="w-4 h-4" />
                            Add to Cart
                          </button>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  );
}
