import { useEffect, useCallback, useRef, useState, memo } from "react";
import * as PIXI from "pixi.js";
import * as Y from "yjs";
import { Container, Sprite } from "@inlet/react-pixi";
import usePiece from "../../hooks/usePiece";
import useJigsaw from "../../contexts/jigsaw";

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

  if (!jigsawBaseTexture) return null;
  const sizeWithKnobs = size + 2 * knobSize;

  return (
    <Container
      x={x}
      y={y}
      interactive
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
