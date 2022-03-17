import { useEffect, useCallback, useRef, useState, memo } from "react";
import * as PIXI from "pixi.js";
import * as Y from "yjs";
import { Sprite } from "@inlet/react-pixi";
import usePiece from "../../hooks/usePiece";
import useJigsaw from "../../contexts/jigsaw";

type PieceProps = {
  piece: Y.Map<number>;
};

const Piece = ({ piece }: PieceProps) => {
  const { baseTexture } = useJigsaw();
  const [
    {
      pos: [x, y],
      index: [i, j],
      size,
    },
    { updatePos },
  ] = usePiece(piece);
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
    [x, y]
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
    if (!baseTexture) return;
    const cropRectangle = new PIXI.Rectangle(j * size, i * size, size, size);
    setTexture(new PIXI.Texture(baseTexture, cropRectangle));
  }, [baseTexture, i, j, size]);

  if (!baseTexture) return null;

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
