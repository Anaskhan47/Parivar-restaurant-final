import halalLogo from "@/assets/halal-logo.png";

interface HalalBadgeProps {
  className?: string;
}

export function HalalBadge({ className = "h-16 md:h-[4.5rem]" }: HalalBadgeProps) {
  return (
    <div className="flex items-center group ml-2 sm:ml-3">
      <img
        src={halalLogo}
        alt="100% Halal Certified"
        className={`
          ${className}
          w-auto object-contain
          drop-shadow-sm hover:drop-shadow-[0_0_8px_rgba(212,160,23,0.4)]
          transition-all duration-300 transform group-hover:scale-[1.03]
        `}
      />
    </div>
  );
}
