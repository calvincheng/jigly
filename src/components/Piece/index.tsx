import { useEffect, useCallback, useRef, useState, memo } from "react";
import { Sprite } from "@inlet/react-pixi";
import * as PIXI from "pixi.js";

type PieceProps = {
  i: number;
  j: number;
  size?: number;
  edges?: number[];
  baseTexture: any;
};

const Piece = ({ i, j, size = 80, baseTexture }: PieceProps) => {
  const [pos, updatePos] = useState([j * size, i * size]);
  const [x, y] = pos;
  const draggedRef = useRef<boolean>(false);
  const deltaRef = useRef<any>(null);
  const [texture, setTexture] = useState(PIXI.Texture.WHITE);

  const handlePointerDown = useCallback(
    (event: PIXI.InteractionEvent) => {
      switch (event.data.button) {
        case 0:
          const { x: eventX, y: eventY } = event.data.global;
          const delta = [eventX - x, eventY - y];
          draggedRef.current = true;
          deltaRef.current = delta;
          break;
      }
    },
    [pos]
  );

  const handlePointerUp = useCallback(() => {
    draggedRef.current = false;
    deltaRef.current = null;
  }, []);

  const handlePointerMove = useCallback(
    (event: PIXI.InteractionEvent) => {
      if (!draggedRef.current) return;
      const { x: eventX, y: eventY } = event.data.global;
      const [dx, dy] = deltaRef.current;
      updatePos([eventX - dx, eventY - dy]);
    },
    [updatePos]
  );

  useEffect(() => {
    const cropRectangle = new PIXI.Rectangle(j * size, i * size, size, size);
    setTexture(new PIXI.Texture(baseTexture, cropRectangle));
  }, [baseTexture, i, j, size]);

  return (
    <Sprite
      texture={texture}
      width={size}
      height={size}
      x={x}
      y={y}
      interactive
      pointerdown={handlePointerDown}
      pointerup={handlePointerUp}
      pointermove={handlePointerMove}
    />
  );
};

export default memo(Piece);
