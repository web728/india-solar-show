const NODES = [
  { x: 180, y: 60 }, { x: 320, y: 110 }, { x: 120, y: 180 }, { x: 260, y: 220 },
  { x: 400, y: 190 }, { x: 190, y: 300 }, { x: 340, y: 320 }, { x: 100, y: 340 },
  { x: 460, y: 280 }, { x: 250, y: 400 },
];

const LINKS: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [1, 4], [2, 5], [3, 6], [4, 8],
  [5, 6], [5, 7], [6, 9], [7, 9], [6, 8],
];

export function NetworkMapBackground({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 500 420" preserveAspectRatio="xMidYMid slice">
      <g stroke="rgba(247,148,29,0.25)" strokeWidth="1">
        {LINKS.map(([a, b], i) => (
          <line key={i} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} />
        ))}
      </g>
      <g>
        {NODES.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={i % 3 === 0 ? 5 : 3}
            fill={i % 3 === 0 ? "#F7941D" : "#FFB454"}
            opacity={i % 3 === 0 ? 0.85 : 0.55}
            className="animate-pulse-soft"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </g>
    </svg>
  );
}
