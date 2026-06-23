import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ParivarElements } from "@/components/parivar-elements/ParivarElements";
import { TodaysSpecials } from "@/components/TodaysSpecials";
import { Categories } from "@/components/Categories";
import { SignatureDishes } from "@/components/SignatureDishes";
import { About } from "@/components/About";
import { Catering } from "@/components/Catering";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Parivar Restaurant — Timeless Indian Flavours in Sydney" },
      {
        name: "description",
        content:
          "Parivar Restaurant brings authentic Hyderabadi fine dining to Sydney — biryani, kebabs, and royal Nizami heritage served as family.",
      },
      { property: "og:title", content: "Parivar Restaurant — Timeless Indian Flavours in Sydney" },
      {
        property: "og:description",
        content: "Authentic Hyderabadi luxury dining in Sydney. Dine in, take away, or book catering.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <ParivarElements />
      <TodaysSpecials />
      <Categories />
      <SignatureDishes />
      <About />
      <Catering />
      <Testimonials />
      <Footer />
    </main>
  );
}
