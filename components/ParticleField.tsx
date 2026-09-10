const PARTICLES = Array.from({ length: 22 }).map((_, i) => {
  const seed = (i * 137.5) % 100;
  return {
    left: `${(seed * 3.7) % 100}%`,
    top: `${(seed * 5.3) % 100}%`,
    size: 2 + (i % 4),
    duration: 6 + (i % 6),
    delay: (i % 5) * 0.6,
    slow: i % 2 === 0,
  };
});

export function ParticleField({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={`absolute rounded-full bg-[color:var(--color-gold)]/70 ${
            p.slow ? "animate-float-slow" : "animate-float-slower"
          }`}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            boxShadow: "0 0 8px 1px rgba(90,200,242,0.6)",
          }}
        />
      ))}
    </div>
  );
}
