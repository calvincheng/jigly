import { useEffect, useCallback, useRef, useState, memo } from "react";
import * as PIXI from "pixi.js";
import * as Y from "yjs";
import { Container, Sprite } from "@inlet/react-pixi";
import usePiece from "../../hooks/usePiece";
import useJigsaw from "../../contexts/jigsaw";

type PieceProps = {
  piece: Y.Map<number>;
};

function edgeToUrl(edges: number[]): string {
  const edgeMap = { "-1": 2, "0": 0, "1": 1 } as { [edge: string]: number };
  const encoded: string = edges
    .map((edge) => edgeMap[String(edge)])
    .reverse()
    .join("");
  return encoded;
}

const Piece = ({ piece }: PieceProps) => {
  const { baseTexture } = useJigsaw();
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

  useEffect(() => {
    if (!baseTexture) return;
    const margin = size / 3; // rough
    const cropRectangle = new PIXI.Rectangle(
      j * size - margin,
      i * size - margin,
      size + margin * 2,
      size + margin * 2
    );
    setTexture(new PIXI.Texture(baseTexture, cropRectangle));
  }, [baseTexture, i, j, size]);

  if (!baseTexture) return null;

  const maskTexture = PIXI.Texture.from(
    `/src/assets/masks/${edgeToUrl(edges)}.png`
  );

  return (
    <Container
      x={x}
      y={y}
      interactive
      pointerdown={handlePointerDown}
      pointerup={handlePointerUp}
      pointermove={handlePointerMove}
    >
      <Sprite texture={texture} width={size} height={size} mask={mask} />
      <Sprite // Mask
        ref={(ref) => setMask(ref)}
        texture={maskTexture}
        width={size}
        height={size}
      />
    </Container>
  );
};

export default memo(Piece);
