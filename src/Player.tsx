import {
  Assets,
  Texture,
} from 'pixi.js';
import {
  useEffect,
  useRef,
  useState,
} from 'react';

interface PlayerProps {
  avatar: string;
  playerName: string;
  x?: number;
  y?: number;
}

export function Player({ avatar, playerName, x, y }: PlayerProps) {
  const containerRef = useRef(null)
  const [avatarTexture, setAvatarTexture] = useState(Texture.EMPTY)
  const [baseTexture, setBaseTexture] = useState(Texture.EMPTY)

  // Preload the avatar texture
  useEffect(() => {
    if (avatarTexture === Texture.EMPTY) {
      Assets.load(avatar).then((result) => setAvatarTexture(result));
    }
  }, [avatarTexture]);

  // Preload the player base texture
  useEffect(() => {
    if (baseTexture === Texture.EMPTY) {
      Assets
        .load('/player_base.png')
        .then((result) => {
          setBaseTexture(result)
        });
    }
  }, [baseTexture]);

  return (
    <pixiContainer
      ref={containerRef}
      anchor={{ x: 0.5, y: 0.5 }}
      x={x}
      y={y}
    >
      {/* Avatar (top layer) */}
      <pixiSprite
        texture={avatarTexture}
        anchor={{ x: 0.5, y: 0.5 }}
        x={0}
        y={0}
      />
      {/* Player base (bottom layer) */}
      <pixiSprite
        texture={baseTexture}
        anchor={{ x: 0.5, y: 0.5 }}
        x={0}
        y={156}
      />
      {/* Player name text */}
      <pixiText
        text={playerName}
        anchor={{ x: 0.5, y: 0.5 }}
        x={-54}
        y={156}
        style={{
          fontSize: 24,
          fill: 0xFFFFFF,
          stroke: 0x000000,
        }}
      />
      {/* Player score text */}
      <pixiText
        text={0}
        anchor={{ x: 0.5, y: 0.5 }}
        x={84}
        y={156}
        style={{
          fontSize: 24,
          fill: 0xFFFFFF,
          stroke: 0x000000,
        }}
      />
    </pixiContainer>
  );
} 