import { Assets, Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";
import { useTick } from "@pixi/react";
import { SpeakingAnimation } from "./SpeakingAnimation";

interface PlayerProps {
  avatar: string;
  playerName: string;
  isOnline?: boolean;
  isSpeaking?: boolean;
  x: number;
  y: number;
  scale: number;
}

export function Player({
  avatar,
  playerName,
  isOnline = false,
  isSpeaking = false,
  x,
  y,
  scale,
}: PlayerProps) {
  const containerRef = useRef<any>(null);
  const [avatarTexture, setAvatarTexture] = useState(Texture.EMPTY);
  const [baseTexture, setBaseTexture] = useState(Texture.EMPTY);
  const [highlightTexture, setHighlightTexture] = useState(Texture.EMPTY);
  const [jetTrailTexture, setJetTrailTexture] = useState(Texture.EMPTY);
  const [baseHighlightTexture, setBaseHighlightTexture] = useState(
    Texture.EMPTY
  );

  // Animation state
  const [floatOffset, setFloatOffset] = useState(Math.random() * Math.PI * 2);
  const floatSpeed = 0.05; // Speed of the floating animation
  const floatAmplitude = 10; // How far up and down to float

  // Buzz highlight animation states

  // Animation tick
  useTick((options) => {
    // Float animation
// setFloatOffset((prev) => (prev + floatSpeed * options.deltaTime) % (Math.PI * 2));
  });

  // Preload the textures
  useEffect(() => {
    Assets.load([
      avatar,
      "/player_base.png",
      "/buzz_in_highlight.png",
      "/jet_trail.png",
      "/player_base_highlight.png",
    ]).then((result) => {
      setAvatarTexture(result[avatar]);
      setBaseTexture(result["/player_base.png"]);
      setHighlightTexture(result["/buzz_in_highlight.png"]);
      setJetTrailTexture(result["/jet_trail.png"]);
      setBaseHighlightTexture(result["/player_base_highlight.png"]);
    });
  }, []);

  // Handle click on player header (reserved for future interactions)

  return (
    <pixiContainer
      ref={containerRef}
      anchor={{ x: 0.5, y: 0.5 }}
      x={x}
      y={y + Math.sin(floatOffset) * floatAmplitude}
    >
      {/* Avatar (top layer) */}
      <pixiSprite
        texture={avatarTexture}
        anchor={{ x: 0.5, y: 0.5 }}
        x={0}
        y={0}
        scale={scale}
      />
      {/* Static highlight effect */}
      {isOnline && (
        <pixiSprite
          texture={highlightTexture}
          anchor={{ x: 0.5, y: 0.5 }}
          x={0}
          y={0}
          scale={scale}
        />
      )}
      {/* Jet trail */}
      {isOnline && (
        <pixiSprite
          texture={jetTrailTexture}
          anchor={{ x: 0.5, y: 0.5 }}
          x={0}
          y={270 * scale}
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
      {/* Player base highlight */}
      {isOnline && (
        <pixiSprite
          texture={baseHighlightTexture}
          anchor={{ x: 0.5, y: 0.5 }}
          x={0}
          y={156 * scale}
          scale={scale}
        />
      )}
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
        scale={scale}
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
        scale={scale}
      />
      {/* Spreading highlight animations */}
      <SpeakingAnimation isActive={isSpeaking} scale={scale} />
    </pixiContainer>
  );
}
