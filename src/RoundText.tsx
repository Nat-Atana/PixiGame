import { Graphics } from "pixi.js";
import { useRef } from "react";

interface RoundTextProps {
  x?: number;
  y?: number;
  roundNumber?: number;
  totalRounds?: number;
}

export function RoundText({
  x = 50,
  y = 50,
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
          g.drawRoundedRect(-10, -10, 300, 50, 10);
          g.endFill();
        }}
      />
      
      {/* Today's Top Hits text */}
      <pixiText
        text="Today's Top Hits"
        anchor={{ x: 0, y: 0.5 }}
        x={10}
        y={15}
        style={{
          fontSize: 18,
          fill: 0xFFFFFF,
          fontWeight: "bold",
        }}
      />
      
      {/* Round text */}
      <pixiText
        text={`Round ${roundNumber}/${totalRounds}`}
        anchor={{ x: 0, y: 0.5 }}
        x={165}
        y={15}
        alpha={0.75}
        style={{
          fontSize: 18,
          fill: 0xDEDAF7,
          fontWeight: "bold",
        }}
      />
    </pixiContainer>
  );
}
