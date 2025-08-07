import { Assets, Texture } from "pixi.js";
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
  const [timelineTexture, setTimelineTexture] = useState(Texture.EMPTY);

  // Preload the sound bar texture
  useEffect(() => {
    if (soundBarTexture === Texture.EMPTY) {
      Assets.load("/sound_bar.png").then((result) => {
        setSoundBarTexture(result);
      });
    }
  }, [soundBarTexture]);

  // Preload the timeline texture
  useEffect(() => {
    if (timelineTexture === Texture.EMPTY) {
      Assets.load("/sound_bar_timeline.png").then((result) => {
        setTimelineTexture(result);
      });
    }
  }, [timelineTexture]);

  return (
    <pixiContainer ref={containerRef} x={x} y={y} anchor={{ x: 0.5, y: 0.5 }}>
      {/* Sound bar sprite (background) */}
      <pixiSprite
        texture={soundBarTexture}
        anchor={{ x: 0.5, y: 1 }}
        x={0}
        y={0}
      />
      {/* Timeline sprite (center overlay) */}
      <pixiSprite
        texture={timelineTexture}
        anchor={{ x: 0.5, y: 0.5 }}
        x={0}
        y={-60}
      />
    </pixiContainer>
  );
}
