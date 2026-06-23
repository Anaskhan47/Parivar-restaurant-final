import { OrderableItemSection } from "./OrderableItemSection";

const fallbackSpecials = [
  { name: "Chef's Dum Biryani", desc: "Today's slow-cooked lamb biryani with saffron rice", price: 18.99, image_url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop" },
  { name: "Royal Haleem Bowl", desc: "Limited batch heritage haleem — only today", price: 14.99, image_url: "https://images.unsplash.com/photo-1548943487-a2e4e43b4859?q=80&w=800&auto=format&fit=crop" },
  { name: "Tandoori Platter Special", desc: "Mixed grill with naan and chutney — today's deal", price: 22.99, image_url: "https://images.unsplash.com/photo-1599487405902-1823ebce1711?q=80&w=800&auto=format&fit=crop" },
];

export function TodaysSpecials() {
  return (
    <OrderableItemSection
      id="specials"
      category="Today's Special"
      title="Today's Special"
      subtitle="Fresh picks from our kitchen — updated daily by the chef."
      fallbackItems={fallbackSpecials}
    />
  );
}
