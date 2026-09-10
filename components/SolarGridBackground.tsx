export function SolarGridBackground({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 1000 700"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="panelGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F7941D" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FFB454" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <g stroke="url(#panelGlow)" strokeWidth="1.2" fill="none" opacity="0.7">
        {Array.from({ length: 9 }).map((_, row) => {
          const y = 260 + row * 46;
          const perspective = 1 + row * 0.14;
          return (
            <g key={row}>
              <line x1={500 - 480 * perspective} y1={y} x2={500 + 480 * perspective} y2={y} />
              {Array.from({ length: 13 }).map((_, col) => {
                const x = 500 + (col - 6) * 76 * perspective;
                const yNext = 260 + (row + 1) * 46;
                return <line key={col} x1={x} y1={y} x2={500 + (col - 6) * 76 * (perspective + 0.14)} y2={yNext} />;
              })}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
