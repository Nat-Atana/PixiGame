import { Assets, Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";
import { useTick } from "@pixi/react";

interface PlayerProps {
  avatar: string;
  playerName: string;
  isOnline?: boolean;
  x: number;
  y: number;
  scale: number;
}

export function Player({
  avatar,
  playerName,
  isOnline = false,
  x,
  y,
  scale,
}: PlayerProps) {
  const containerRef = useRef<any>(null);
  const [avatarTexture, setAvatarTexture] = useState(Texture.EMPTY);
  const [baseTexture, setBaseTexture] = useState(Texture.EMPTY);
  const [highlightTexture, setHighlightTexture] = useState(Texture.EMPTY);
  
  // Animation state
  const [floatOffset, setFloatOffset] = useState(Math.random() * Math.PI * 2);
  const floatSpeed = 0.05; // Speed of the floating animation
  const floatAmplitude = 10; // How far up and down to float

  // Animation tick
  useTick(options => {
    setFloatOffset((prev) => (prev + floatSpeed * options.deltaTime) % (Math.PI * 2));
  });

  // Preload the avatar texture
  useEffect(() => {
    if (avatarTexture === Texture.EMPTY) {
      Assets.load(avatar).then((result) => setAvatarTexture(result));
    }
  }, [avatarTexture]);

  // Preload the highlight texture
  useEffect(() => {
    if (highlightTexture === Texture.EMPTY) {
      Assets.load("/buzz_in_highlight.png").then((result) => setHighlightTexture(result));
    }
  }, [highlightTexture]);

  // Preload the player base texture
  useEffect(() => {
    if (baseTexture === Texture.EMPTY) {
      Assets.load("/player_base.png").then((result) => setBaseTexture(result));
    }
  }, [baseTexture]);

  return (
    <pixiContainer 
      ref={containerRef} 
      anchor={{ x: 0.5, y: 0.5 }} 
      x={x} 
      y={y + Math.sin(floatOffset) * floatAmplitude}>
      {/* Avatar (top layer) */}
      <pixiSprite
        texture={avatarTexture}
        anchor={{ x: 0.5, y: 0.5 }}
        x={0}
        y={0}
        scale={scale}
      />
      {/* Highlight effect (when online) */}
      {isOnline && (
        <pixiSprite
          texture={highlightTexture}
          anchor={{ x: 0.5, y: 0.5 }}
          x={0}
          y={0}
          scale={scale}
        />
      )}
      {/* Player base (bottom layer) */}
      <pixiSprite
        texture={baseTexture}
        anchor={{ x: 0.5, y: 0.5 }}
        x={0}
        y={156 * scale}
        scale={scale}
      />
      {/* Player name text */}
      <pixiText
        text={playerName}
        anchor={{ x: 0.5, y: 0.5 }}
        x={-54 * scale}
        y={156 * scale}
        style={{
          fontSize: 24 * scale,
          fill: 0xffffff,
          stroke: 0x000000,
        }}
      />
      {/* Player score text */}
      <pixiText
        text={0}
        anchor={{ x: 0.5, y: 0.5 }}
        x={84 * scale}
        y={156 * scale}
        style={{
          fontSize: 24 * scale,
          fill: 0xffffff,
          stroke: 0x000000,
        }}
      />
    </pixiContainer>
  );
}
