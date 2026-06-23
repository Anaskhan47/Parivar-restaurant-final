import { MapPin, Phone, Clock, Instagram, Facebook, Twitter } from "lucide-react";
import logo from "@/assets/parivar-logo.png";
import bgImage from "@/assets/backgroud.png";

export function Footer() {
  return (
    <footer id="contact" className="relative pt-24 pb-10 border-t border-gold/20 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "var(--gradient-gold)" }} />
      
      {/* Centered Background Watermark */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20">
        <img src={bgImage} alt="Watermark" className="w-[800px] h-[800px] object-contain mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="mb-5">
              <img src={logo} alt="Parivar Restaurant" className="h-24 w-auto object-contain" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed italic font-display">
              Timeless Indian Flavours in Sydney
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-gold mb-5">Visit Us</h4>
            <p className="text-sm text-muted-foreground flex items-start gap-3 mb-3">
              <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
              <span>1/83 King Georges Rd, Wiley Park<br />NSW 2195, Australia</span>
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-3">
              <Phone className="w-4 h-4 text-gold" />
              +61 405 635 423
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-gold mb-5">Hours</h4>
            <p className="text-sm text-muted-foreground flex items-start gap-3">
              <Clock className="w-4 h-4 text-gold mt-0.5" />
              <span>
                Mon — Sun · 3:00 PM — 3:00 AM
              </span>
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-gold mb-5">Follow</h4>
            <div className="flex gap-3 mb-6">
              <a
                href="https://www.instagram.com/parivar.restaurantnsw/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram link"
                className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-primary-foreground transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook link"
                className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-primary-foreground transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter link"
                className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-primary-foreground transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Home", "Menu", "Catering", "About"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="hover:text-gold transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gold/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Parivar Restaurant. Crafted with reverence.</p>
          <p className="tracking-widest uppercase">Hyderabad · Sydney</p>
        </div>
      </div>
    </footer>
  );
}
