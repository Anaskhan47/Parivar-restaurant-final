type IngredientProps = {
  src: string;
  alt: string;
  className?: string;
};

export function Ingredient({ src, alt, className = "" }: IngredientProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`parivar-ingredient pointer-events-none absolute select-none ${className}`}
      draggable={false}
    />
  );
}
