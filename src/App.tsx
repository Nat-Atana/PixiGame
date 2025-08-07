import { useState, useEffect } from 'react'
import { Application, extend } from '@pixi/react';
import { Container, Graphics, Sprite, Assets, Texture } from 'pixi.js';
import { BunnySprite } from './BunnySprite'
import './App.css'

extend({
  Container,
  Graphics,
  Sprite,
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
      width={800} 
      height={600}
      anchor={{ x: 0, y: 0 }}
    />
  );
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <Application>
      <pixiContainer>
        <BackgroundSprite />
        <BunnySprite />
      </pixiContainer>
    </Application>
  )
}

export default App
