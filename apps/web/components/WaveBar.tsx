interface WaveBarProps { delay: number; height: number; }

export function WaveBar({ delay, height }: WaveBarProps) {
  return (
    <span style={{
      display: "inline-block", width: 3, height, borderRadius: 2,
      background: "#00e5b0", opacity: 0.75,
      animation: `waveBounce 1.2s ${delay}s ease-in-out infinite`,
    }} />
  );
}