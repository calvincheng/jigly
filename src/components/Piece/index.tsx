import { useEffect, useCallback, useRef, useState, useMemo, memo } from "react";
import * as PIXI from "pixi.js";
import * as Y from "yjs";
import { Container, Sprite } from "@inlet/react-pixi";
import usePiece from "../../hooks/usePiece";
import useJigsaw from "../../contexts/jigsaw";
import viewport2world from "../../utils/viewport2world";
import getNearbyVertex from "../../utils/getNearbyVertex";
import edge2tern from "../../utils/edge2tern";
import { YPiece } from "../../types";

const useMask = false;

type PieceProps = {
  piece: Y.Map<number>;
  pieces: YPiece[];
};

const Piece = ({ piece, pieces }: PieceProps) => {
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
        default:
          const { x: worldX, y: worldY } = viewport2world(
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

  const snapToNeighbour = useCallback(
    ({ tolerance = 20 }) => {
      // Gather other pieces
      const otherPieces = pieces.filter((p) => {
        const [pi, pj]: any = p.get("index");
        return i !== pi || j !== pj;
      });

      // Get candidate vertices to snap to by checking if each of the piece's 4
      // vertices are close to a vertex of a nearby (i.e. within tolerance) piece
      const targets = ["topleft", "topright", "bottomleft", "bottomright"];
      const candidates = targets
        .map((target) => {
          return [
            target,
            getNearbyVertex(piece, otherPieces, target, tolerance),
          ];
        })
        .filter(([_, candidate]) => Boolean(candidate)); // Keep valid (non-null) candidates

      if (candidates.length > 0) {
        // Find closest vertex
        const bestCandidate = candidates.reduce((best, [target, candidate]) => {
          const [cx, cy]: any = candidate;
          const [bestX, bestY]: any = best;
          const cDist = (x - cx) ** 2 + (y - cy) ** 2;
          const bestDist = (x - bestX) ** 2 + (y - bestY) ** 2;
          return cDist < bestDist ? [target, candidate] : best;
        }, candidates[0]);

        // Snap target to candidate
        const [snapVertex, snapLocation] = bestCandidate;
        const [snapX, snapY]: any = snapLocation;
        switch (snapVertex) {
          case "topleft":
            updatePos([snapX, snapY]);
            break;
          case "topright":
            updatePos([snapX - size, snapY]);
            break;
          case "bottomleft":
            updatePos([snapX, snapY - size]);
            break;
          case "bottomright":
            updatePos([snapX - size, snapY - size]);
            break;
        }
      }
    },
    [updatePos, pieces, i, j, x, y]
  );

  const handlePointerUp = useCallback(() => {
    draggedRef.current = false;
    deltaRef.current = null;
    viewport.drag({ pressDrag: true });
    snapToNeighbour({ tolerance: 20 });
  }, [snapToNeighbour]);

  const handlePointerMove = useCallback(
    (event: PIXI.InteractionEvent) => {
      if (!draggedRef.current) return;
      const { x: worldX, y: worldY } = viewport2world(
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

      {useMask && (
        <Sprite // Mask
          ref={(ref) => setMask(ref)}
          texture={spriteMaskTexture}
          width={sizeWithKnobs}
          height={sizeWithKnobs}
        />
      )}
    </Container>
  );
};

export default memo(Piece);
