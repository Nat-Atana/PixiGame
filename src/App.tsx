import { useState, useEffect } from "react";
import { Application, extend } from "@pixi/react";
import { Container, Graphics, Sprite, Assets, Texture, Text } from "pixi.js";
import { Player } from "./Player";
import { SoundBar } from "./SoundBar";
import { RoundText } from "./RoundText";
import "./App.css";

extend({
  Container,
  Graphics,
  Sprite,
  Text,
});

function BackgroundSprite() {
  const [texture, setTexture] = useState(Texture.EMPTY);

  useEffect(() => {
    if (texture === Texture.EMPTY) {
      Assets.load("/stadium.jpg").then((result) => {
        setTexture(result);
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

const playerNames = ["Andrew", "Mary", "Jessica", "Devin"];

function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Calculate scale factors
  const REF_WIDTH = 1920;
  const scale = windowSize.width / REF_WIDTH;
  
  const playerCount = 4;
  const playerBarWidth = 314;
  const playerSpacing = (REF_WIDTH - playerBarWidth * playerCount) / (playerCount + 1);
  const playerHeight = windowSize.height * 0.4;

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Application width={windowSize.width} height={windowSize.height}>
      <pixiContainer>
        <BackgroundSprite />
        {/* <BunnySprite /> */}
        {Array.from({ length: playerCount }).map((_, index) => (
          <Player
            key={index}
            playerName={playerNames[index]}
            avatar={`/avatar_${index + 1}.png`}
            x={scale * (playerSpacing * (index + 1) + playerBarWidth * index  + playerBarWidth / 2)}
            y={playerHeight}  
            scale={scale}
            isOnline={index === 2}
          />
        ))}
        <SoundBar x={windowSize.width / 2} y={windowSize.height} scale={scale} />
        <RoundText x={50 * scale} y={50 * scale} scale={scale} roundNumber={1} totalRounds={5} />
      </pixiContainer>
    </Application>
  );
}

export default App;
