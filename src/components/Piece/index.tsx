import { useEffect, useCallback, useRef, useState, useMemo, memo } from "react";
import * as PIXI from "pixi.js";
import * as Y from "yjs";
import { Container, Sprite } from "@inlet/react-pixi";
import usePiece from "../../hooks/usePiece";
import useJigsaw from "../../contexts/jigsaw";
import { useViewport } from "../Viewport";
import edge2tern from "../../utils/edge2tern";
import snapPieceToNeighbour from "../../utils/snapPieceToNeighbour";

const useMask = false;

type PieceProps = {
  piece: Y.Map<number>;
};

const Piece = ({ piece }: PieceProps) => {
  const viewport = useViewport();
  const {
    baseTextures: { jigsaw: jigsawBaseTexture, mask: maskBaseTexture },
    pieces,
  } = useJigsaw();
  const [
    {
      pos: [x, y],
      index: [i, j],
      size,
      edges,
    },
    { updatePos },
  ] = usePiece(piece);
  const draggedRef = useRef<boolean>(false);
  const deltaRef = useRef<any>(null);
  const [texture, setTexture] = useState(PIXI.Texture.WHITE);
  const [maskTexture, setMaskTexture] = useState(PIXI.Texture.WHITE);
  const [mask, setMask] = useState<any>(null);

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
    snapPieceToNeighbour(piece, pieces, { tolerance: 20 });
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

  const knobSize = useMask ? size * 0.34 : 0;

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

  useEffect(() => {
    if (!maskBaseTexture) return;
    const encoded = parseInt(edge2tern(edges), 3);
    const I = encoded % 9;
    const J = Math.floor(encoded / 9);
    const tileSize = 166;
    const cropRectangle = new PIXI.Rectangle(
      I * tileSize,
      J * tileSize,
      tileSize,
      tileSize
    );
    setMaskTexture(new PIXI.Texture(maskBaseTexture, cropRectangle));
  }, [maskBaseTexture, edges]);

  const hitArea = useMemo(
    () => new PIXI.Rectangle(knobSize, knobSize, size, size),
    [size]
  );

  const sizeWithKnobs = size + 2 * knobSize;

  if (!jigsawBaseTexture) return null;

  return (
    <Container
      x={x}
      y={y}
      interactive
      hitArea={hitArea}
      pointerdown={handlePointerDown}
      pointerup={handlePointerUp}
      pointerupoutside={handlePointerUp}
      pointermove={handlePointerMove}
    >
      <Sprite
        texture={texture}
        width={sizeWithKnobs}
        height={sizeWithKnobs}
        mask={mask}
      />

      {useMask && (
        <Sprite // Mask
          ref={(ref) => setMask(ref)}
          texture={maskTexture}
          width={sizeWithKnobs}
          height={sizeWithKnobs}
        />
      )}
    </Container>
  );
};

export default memo(Piece);
