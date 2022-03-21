import { useEffect, useCallback, useRef, useState, memo } from "react";
import * as PIXI from "pixi.js";
import * as Y from "yjs";
import { Graphics } from "@inlet/react-pixi";
import usePiece from "hooks/usePiece";
import useJigsaw from "contexts/jigsaw";
import { useViewport } from "components/Viewport";
import snapPieceToNeighbour from "utils/snapPieceToNeighbour";
import checkComplete from "utils/checkComplete";
import drawPiece from "utils/drawPiece";

type PieceProps = {
  piece: Y.Map<number>;
};

const Piece = ({ piece }: PieceProps) => {
  const viewport = useViewport();
  const {
    baseTextures: { jigsaw: jigsawBaseTexture },
    pieces,
  } = useJigsaw();
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

  const knobSize = size * 0.2;

  const handlePointerDown = useCallback(
    (event: PIXI.InteractionEvent) => {
      switch (event.data.button) {
        default:
          const { x: worldX, y: worldY } = viewport.toWorld(event.data.global);
          const delta = [worldX - x, worldY - y];
          draggedRef.current = true;
          deltaRef.current = delta;
          viewport.drag({ pressDrag: false });
          break;
      }
    },
    [x, y]
  );

  const handlePointerUp = useCallback(() => {
    draggedRef.current = false;
    deltaRef.current = null;
    viewport.drag({ pressDrag: true });
    snapPieceToNeighbour(piece, pieces, { tolerance: 20 / viewport.scaled });
    const { correct, incorrectPiece } = checkComplete(pieces);
    console.log(`Complete: ${correct}`);
    console.log(`incorrectPiece:`, incorrectPiece);
  }, [piece, pieces]);

  const handlePointerMove = useCallback(
    (event: PIXI.InteractionEvent) => {
      if (!draggedRef.current) return;
      const { x: worldX, y: worldY } = viewport.toWorld(event.data.global);
      const [dx, dy] = deltaRef.current;
      const newX = worldX - dx;
      const newY = worldY - dy;

      updatePos([newX, newY]); // takes in stage coordinates
    },
    [updatePos]
  );

  useEffect(() => {
    if (!jigsawBaseTexture) return;
    const cropRectangle = new PIXI.Rectangle(
      j * size - knobSize,
      i * size - knobSize,
      size + knobSize * 2,
      size + knobSize * 2
    );
    setTexture(new PIXI.Texture(jigsawBaseTexture, cropRectangle));
  }, [jigsawBaseTexture, i, j, size]);

  const draw = useCallback(
    (g: PIXI.Graphics) => {
      drawPiece(g, piece, texture);
    },
    [texture, i, j, size]
  );

  if (!jigsawBaseTexture) return null;

  return (
    <Graphics
      draw={draw}
      x={x}
      y={y}
      interactive
      pointerdown={handlePointerDown}
      pointerup={handlePointerUp}
      pointerupoutside={handlePointerUp}
      pointermove={handlePointerMove}
    />
  );
};

export default memo(Piece);
