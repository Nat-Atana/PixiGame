import { Assets, Texture, Graphics } from "pixi.js";
import { useEffect, useRef, useState } from "react";

interface SoundBarProps {
  x?: number;
  y?: number;
}

export function SoundBar({
  x = window.innerWidth / 2,
  y = window.innerHeight,
}: SoundBarProps) {
  const containerRef = useRef(null);
  const [soundBarTexture, setSoundBarTexture] = useState(Texture.EMPTY);
  const [barHeights, setBarHeights] = useState<number[]>([]);
  const [playedIndex, setPlayedIndex] = useState(0);

  // Calculate bar heights once when component mounts
  useEffect(() => {
    const heights = [];
    for (let i = 0; i < 20; i++) {
      heights.push(25 + Math.random() * 49);
    }
    setBarHeights(heights);
  }, []);

  // Update playedIndex every 3 seconds to animate the timeline
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayedIndex((prevIndex) => {
        // Reset to 0 when reaching the end (20 bars)
        return prevIndex >= 19 ? 0 : prevIndex + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Preload the sound bar texture
  useEffect(() => {
    if (soundBarTexture === Texture.EMPTY) {
      Assets.load("/sound_bar.png").then((result) => {
        setSoundBarTexture(result);
      });
    }
  }, [soundBarTexture]);

  return (
    <pixiContainer ref={containerRef} x={x} y={y} anchor={{ x: 0.5, y: 0.5 }}>
      {/* Sound bar sprite (background) */}
      <pixiSprite
        texture={soundBarTexture}
        anchor={{ x: 0.5, y: 1 }}
        x={0}
        y={0}
      />
      
      {/* Timeline bars (drawn graphics) */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          
          // Draw multiple timeline bars
          for (let i = 0; i < 20; i++) {
            const barWidth = 16;
            const barSpacing = 20;
            const startX = -187 + (i * barSpacing);
            const barHeight = barHeights[i] || 25; // Use pre-calculated height or default
            const startY = -60 - barHeight / 2;
            
            // Set color based on played state using animated playedIndex
            const barColor = i <= playedIndex ? 0xFFFFFF : 0x1B0A33;
            g.beginFill(barColor);
            g.drawRoundedRect(startX, startY, barWidth, barHeight, 19);
            g.endFill();
          }
        }}
      />
    </pixiContainer>
  );
}
