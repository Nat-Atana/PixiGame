import { useState, useEffect } from 'react'
import { Application, extend } from '@pixi/react';
import { Container, Graphics, Sprite, Assets, Texture, Text } from 'pixi.js';
import { Player } from './Player'
import './App.css'

extend({
  Container,
  Graphics,
  Sprite,
  Text,
});

function BackgroundSprite() {
  const [texture, setTexture] = useState(Texture.EMPTY)

  useEffect(() => {
    if (texture === Texture.EMPTY) {
      Assets
        .load('/stadium.jpg')
        .then((result) => {
          setTexture(result)
        });
    }
  }, [texture]);

  return (
    <pixiSprite 
      texture={texture}
      width={window.innerWidth} 
      height={window.innerHeight}
      anchor={{ x: 0, y: 0 }}
    />
  );
}

function App() {
  const WIDTH = window.innerWidth
  const HEIGHT = window.innerHeight
  const PLAYER_HEIGHT = HEIGHT * 0.3
  const GAP = 0.0765

  return (
    <Application width={WIDTH} height={HEIGHT}
    >
      <pixiContainer>
        <BackgroundSprite />
        {/* <BunnySprite /> */}
        <Player playerName="Andrew" avatar="/avatar_1.png" x={WIDTH * GAP * 2} y={PLAYER_HEIGHT} />
        <Player playerName="Sarah" avatar="/avatar_2.png" x={WIDTH * GAP * 5} y={PLAYER_HEIGHT} />
        <Player playerName="Mike" avatar="/avatar_3.png" x={WIDTH * GAP * 8} y={PLAYER_HEIGHT} />
        <Player playerName="Emma" avatar="/avatar_4.png" x={WIDTH * GAP * 11} y={PLAYER_HEIGHT} />
      </pixiContainer>
    </Application>
  )
}

export default App
