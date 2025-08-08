import { useEffect, useState } from "react";
import { Assets, Texture } from "pixi.js";
import { useTick } from "@pixi/react";

interface SpeakingAnimationProps {
  isActive: boolean;
  scale: number;
  /** Maximum number of concurrent ripple rings */
  maxRings?: number;
  /** Speed multiplier for ring growth */
  animationSpeed?: number;
  /** Scale at which a ring disappears */
  maxRingScale?: number;
  /** Scale threshold to spawn the next ring */
  nextRingTriggerScale?: number;
  /** Minimum alpha for the faintest ring */
  minAlpha?: number;
}

export function SpeakingAnimation({
  isActive,
  scale,
  maxRings = 3,
  animationSpeed = 0.008,
  maxRingScale = 1.7,
  nextRingTriggerScale = 1.2,
  minAlpha = 0.2,
}: SpeakingAnimationProps) {
  const [highlightTexture, setHighlightTexture] = useState(Texture.EMPTY);
  const [ringScales, setRingScales] = useState<number[]>([]);
  const [ringAlphas, setRingAlphas] = useState<number[]>([]);

  // Preload texture
  useEffect(() => {
    let isMounted = true;
    Assets.load("/buzz_in_highlight.png").then((result) => {
      if (isMounted) setHighlightTexture(result);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Reset when toggling active state
  useEffect(() => {
    if (isActive) {
      setRingScales([1]);
      setRingAlphas([1]);
    } else {
      setRingScales([]);
      setRingAlphas([]);
    }
  }, [isActive]);

  useTick((options) => {
    if (!isActive) return;

    setRingScales((prevScales) => {
      const nextScales: number[] = [];
      for (const prevScale of prevScales) {
        const grown = prevScale + animationSpeed * options.deltaTime;
        if (grown < maxRingScale) {
          nextScales.push(grown);
        }
      }

      // Spawn new ring when the last one passes trigger, limit concurrent rings
      if (
        nextScales.length > 0 &&
        nextScales.length < maxRings &&
        nextScales[nextScales.length - 1] >= nextRingTriggerScale
      ) {
        nextScales.push(1);
      }

      // Compute alphas for current rings
      const nextAlphas: number[] = [];
      for (let i = 0; i < nextScales.length; i++) {
        nextAlphas[i] = Math.max(
          minAlpha,
          1 - (nextScales[i] - 1) / (maxRingScale - 1)
        );
      }
      setRingAlphas(nextAlphas);

      return nextScales;
    });
  });

  if (!isActive) return null;

  return (
    <>
      {ringScales.map((ringScale, index) => (
        <pixiSprite
          key={`speaking-ring-${index}`}
          texture={highlightTexture}
          anchor={{ x: 0.5, y: 0.5 }}
          x={0}
          y={0}
          scale={scale * ringScale}
          alpha={ringAlphas[index] ?? 0}
        />
      ))}
    </>
  );
}


