import { Graphics } from "pixi.js";
import { useRef } from "react";

interface RoundTextProps {
  x: number;
  y: number;
  scale: number;
  roundNumber: number;
  totalRounds: number;
}

export function RoundText({
  x = 50,
  y = 50,
  scale = 1,
  roundNumber = 1,
  totalRounds = 5,
}: RoundTextProps) {
  const containerRef = useRef(null);

  return (
    <pixiContainer ref={containerRef} x={x} y={y}>
      {/* Background */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.beginFill(0x000000, 0.75);
          g.drawRoundedRect(-10 * scale, -10 * scale, 300 * scale, 50 * scale, 10 * scale);
          g.endFill();
        }}
      />
      
      {/* Today's Top Hits text */}
      <pixiText
        text="Today's Top Hits"
        anchor={{ x: 0, y: 0.5 }}
        x={10 * scale}
        y={15 * scale}
        style={{
          fontSize: 18 * scale,
          fill: 0xFFFFFF,
          fontWeight: "bold",
        }}
      />
      
      {/* Round text */}
      <pixiText
        text={`Round ${roundNumber}/${totalRounds}`}
        anchor={{ x: 0, y: 0.5 }}
        x={165 * scale}
        y={15 * scale}
        alpha={0.75}
        style={{
          fontSize: 18 * scale,
          fill: 0xDEDAF7,
          fontWeight: "bold",
        }}
      />
    </pixiContainer>
  );
}
