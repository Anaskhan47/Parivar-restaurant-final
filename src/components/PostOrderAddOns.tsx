import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Loader2, CheckCircle2 } from "lucide-react";
import logo from "@/assets/parivar-logo.png";

interface AddonItem {
  id?: number;
  name: string;
  description?: string;
  desc?: string;
  price: number;
  image_url?: string;
  img?: string;
  is_available?: boolean;
}

const fallbackAddons: AddonItem[] = [
  { name: "Extra Butter Naan", desc: "Add an extra butter naan to your meal", price: 3.0, image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop" },
  { name: "Extra Garlic Naan", desc: "Garlic naan on the side", price: 3.5, image_url: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?q=80&w=800&auto=format&fit=crop" },
  { name: "Raita", desc: "Cooling yogurt with cucumber and mint", price: 2.5, image_url: "https://images.unsplash.com/photo-1626509646543-518ee55030e4?q=80&w=800&auto=format&fit=crop" },
  { name: "Extra Rice", desc: "Steamed saffron basmati rice", price: 3.0, image_url: "https://images.unsplash.com/photo-1516684732162-798a0062bf99?q=80&w=800&auto=format&fit=crop" },
  { name: "Mint Chutney", desc: "Fresh mint and coriander chutney", price: 1.5, image_url: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800&auto=format&fit=crop" },
  { name: "Papadum (2 pcs)", desc: "Crispy lentil wafers", price: 2.0, image_url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop" },
];

interface PostOrderAddOnsProps {
  orderId: string;
  disabled?: boolean;
  onItemsAdded?: () => void;
}

export function PostOrderAddOns({ orderId, disabled, onItemsAdded }: PostOrderAddOnsProps) {
  const [items, setItems] = useState<AddonItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddons = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}`}/api/v1/menu?category=${encodeURIComponent("Add-ons")}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const available = (data || []).filter((item: AddonItem) => item.is_available !== false);
        setItems(available.length > 0 ? available : fallbackAddons);
      } catch {
        setItems(fallbackAddons);
      } finally {
        setLoading(false);
      }
    };
    fetchAddons();
  }, []);

  const getItemId = (item: AddonItem) => (item.id ? String(item.id) : item.name);

  const handleAddToOrder = async (item: AddonItem) => {
    const itemId = getItemId(item);
    setAddingId(itemId);
    setAddedId(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}`}/api/v1/orders/${orderId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ menu_item_id: item.id ?? item.name, quantity: 1, special_notes: "" }],
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Failed to add item");
      }
      setAddedId(itemId);
      onItemsAdded?.();
      setTimeout(() => setAddedId(null), 2000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Could not add item to your order.";
      alert(message);
    } finally {
      setAddingId(null);
    }
  };

  if (disabled) return null;

  return (
    <div className="glass p-6 sm:p-8 rounded-2xl border border-gold/20 shadow-sm bg-white/70 backdrop-blur-md">
      <div className="mb-6">
        <div className="gold-divider mb-3">
          <span className="h-px w-8 bg-gold/40" /> Add-ons <span className="h-px w-8 bg-gold/40" />
        </div>
        <h2 className="font-display text-2xl text-[#042416] font-semibold">Want to add more?</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Add extras to your order while it&apos;s being prepared.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 text-[#0B5D3B] animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, i) => {
            const itemId = getItemId(item);
            const isAdding = addingId === itemId;
            const justAdded = addedId === itemId;
            return (
              <motion.div
                key={itemId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex gap-4 p-4 rounded-xl border border-gold/10 bg-white/60 hover:shadow-sm transition-shadow"
              >
                <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-gold/10">
                  <img
                    src={item.image_url || item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = logo;
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-medium text-[#042416] text-sm leading-tight">{item.name}</h3>
                    <span className="text-gold font-semibold text-sm whitespace-nowrap">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description || item.desc}</p>
                  <button
                    onClick={() => handleAddToOrder(item)}
                    disabled={isAdding}
                    className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      justAdded
                        ? "bg-green-100 text-green-700"
                        : "bg-[#0B5D3B] text-cream hover:bg-[#D4A017]"
                    } disabled:opacity-60`}
                  >
                    {isAdding ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : justAdded ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                    {justAdded ? "Added!" : "Add to Order"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
