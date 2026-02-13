interface ScoreBarProps { color: string; val: number; animated: boolean; }

export function ScoreBar({ color, val, animated }: ScoreBarProps) {
  return (
    <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
      <div style={{
        height: "100%",
        width: animated ? `${val}%` : "0%",
        background: color, borderRadius: 3,
        transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
      }} />
    </div>
  );
}