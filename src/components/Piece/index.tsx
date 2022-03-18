import { useEffect, useCallback, useRef, useState, useMemo, memo } from "react";
import * as PIXI from "pixi.js";
import * as Y from "yjs";
import { Container, Sprite } from "@inlet/react-pixi";
import usePiece from "../../hooks/usePiece";
import useJigsaw from "../../contexts/jigsaw";
import global2world from "../../utils/global2world";

type PieceProps = {
  piece: Y.Map<number>;
};

function edge2tern(edges: number[]): string {
  // e.g.: [-1, 0, 1, 1] -> "1102"
  const edgeMap = { "-1": 2, "0": 0, "1": 1 } as { [edge: string]: number };
  const ternary: string = edges
    .map((edge) => edgeMap[String(edge)])
    .reverse()
    .join("");
  return ternary;
}

const Piece = ({ piece }: PieceProps) => {
  const {
    baseTextures: { jigsaw: jigsawBaseTexture, mask: maskBaseTexture },
    viewport,
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
  const [spriteMaskTexture, setSpriteMaskTexture] = useState(
    PIXI.Texture.WHITE
  );
  const [mask, setMask] = useState<any>(null);

  const handlePointerDown = useCallback(
    (event: PIXI.InteractionEvent) => {
      switch (event.data.button) {
        case 0:
          const { x: worldX, y: worldY } = global2world(
            event.data.global,
            viewport
          );
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
  }, []);

  const handlePointerMove = useCallback(
    (event: PIXI.InteractionEvent) => {
      if (!draggedRef.current) return;
      const { x: worldX, y: worldY } = global2world(
        event.data.global,
        viewport
      );
      const [dx, dy] = deltaRef.current;
      const newX = worldX - dx;
      const newY = worldY - dy;

      updatePos([newX, newY]); // takes in stage coordinates
    },
    [updatePos]
  );

  // const knobSize = size * 0.34;
  const knobSize = 0;

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
    setSpriteMaskTexture(new PIXI.Texture(maskBaseTexture, cropRectangle));
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

      {/* <Sprite // Mask */}
      {/*   ref={(ref) => setMask(ref)} */}
      {/*   texture={spriteMaskTexture} */}
      {/*   width={sizeWithKnobs} */}
      {/*   height={sizeWithKnobs} */}
      {/* /> */}
    </Container>
  );
};

export default memo(Piece);
