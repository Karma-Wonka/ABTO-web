export default function RidgeSvg({ id, height = 300 }: { id: string; height?: number }) {
  const h = height;
  return (
    <svg viewBox={`0 0 600 ${h}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id={`rg${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2C5243" /><stop offset="1" stopColor="#132119" />
        </linearGradient>
      </defs>
      <rect width="600" height={h} fill={`url(#rg${id})`} />
      <path d={`M0,${h * 0.55} L100,${h * 0.4} L200,${h * 0.56} L310,${h * 0.36} L420,${h * 0.58} L520,${h * 0.42} L600,${h * 0.54} L600,${h} L0,${h} Z`} fill="#1B3227" opacity=".85" />
      <path d={`M0,${h * 0.76} L140,${h * 0.66} L300,${h * 0.79} L440,${h * 0.67} L600,${h * 0.77} L600,${h} L0,${h} Z`} fill="#101B15" />
    </svg>
  );
}
