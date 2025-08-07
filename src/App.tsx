import { useState, useEffect } from 'react'
import { Application, extend } from '@pixi/react';
import { Container, Graphics, Sprite, Assets, Texture, Text } from 'pixi.js';
import { BunnySprite } from './BunnySprite'
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
  const [count, setCount] = useState(0)

  return (
    <Application
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <pixiContainer>
        <BackgroundSprite />
        {/* <BunnySprite /> */}
        <Player playerName="Andrew" />
      </pixiContainer>
    </Application>
  )
}

export default App
