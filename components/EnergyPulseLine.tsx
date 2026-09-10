export function EnergyPulseLine({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 100"
      preserveAspectRatio="none"
      className={className}
    >
      <defs>
        <linearGradient id="pulseGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F7941D" />
          <stop offset="50%" stopColor="#FFB454" />
          <stop offset="100%" stopColor="#F7941D" />
        </linearGradient>
      </defs>
      <path
        d="M0,70 L40,70 L60,30 L90,85 L120,20 L150,60 L180,45 L210,75 L240,25 L270,55 L300,35 L330,65 L360,40 L400,50"
        fill="none"
        stroke="url(#pulseGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="14 8"
        className="animate-dash-flow"
        opacity="0.9"
      />
      <path
        d="M0,70 L40,70 L60,30 L90,85 L120,20 L150,60 L180,45 L210,75 L240,25 L270,55 L300,35 L330,65 L360,40 L400,50"
        fill="none"
        stroke="url(#pulseGrad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.12"
      />
    </svg>
  );
}
