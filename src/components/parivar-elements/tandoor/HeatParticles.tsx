const particles = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  left: 8 + ((index * 17) % 84),
  size: 3 + (index % 4),
  delay: `${(index % 9) * 0.32}s`,
  duration: `${3.2 + (index % 7) * 0.38}s`,
  opacity: 0.34 + (index % 5) * 0.1,
}));

export function HeatParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="parivar-heat-particle absolute bottom-[-24px] rounded-full bg-amber-300 shadow-[0_0_18px_rgba(251,146,60,0.9)]"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  );
}
