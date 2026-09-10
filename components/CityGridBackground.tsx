// Abstract skyline silhouette with a rooftop-solar grid overlay — evokes the
// Pune industrial/IT skyline without depicting a literal building or landmark.
const BUILDINGS = [
  { x: 0, w: 40, h: 120 }, { x: 44, w: 26, h: 180 }, { x: 74, w: 34, h: 90 },
  { x: 112, w: 22, h: 220 }, { x: 138, w: 46, h: 140 }, { x: 188, w: 30, h: 200 },
  { x: 222, w: 38, h: 110 }, { x: 264, w: 24, h: 170 }, { x: 292, w: 42, h: 130 },
  { x: 338, w: 28, h: 210 }, { x: 370, w: 36, h: 100 }, { x: 410, w: 30, h: 160 },
];

export function CityGridBackground({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 450 220" preserveAspectRatio="xMidYMax slice">
      <g fill="rgba(46,49,146,0.07)">
        {BUILDINGS.map((b, i) => (
          <rect key={i} x={b.x} y={220 - b.h} width={b.w} height={b.h} />
        ))}
      </g>
      <g stroke="rgba(247,148,29,0.25)" strokeWidth="0.75">
        {BUILDINGS.map((b, i) =>
          b.h > 130 ? <line key={i} x1={b.x} y1={220 - b.h} x2={b.x + b.w} y2={220 - b.h} /> : null
        )}
      </g>
    </svg>
  );
}
