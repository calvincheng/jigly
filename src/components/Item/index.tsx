import { useCallback, useRef, memo } from "react";
import * as Y from "yjs";
import useItem from "../../hooks/useItem";
import { doc } from "../../Y";
import { Sprite } from "@inlet/react-pixi";
import * as PIXI from "pixi.js";

type ItemProps = {
  item: Y.Map<number>;
  idx: number;
};

const size = 40;

const Item = ({ item, idx }: ItemProps) => {
  const {
    pos: [x, y],
    updatePos,
  } = useItem(item);
  const draggedRef = useRef<boolean>(false);
  const deltaRef = useRef<any>(null);

  const handlePointerDown = (event: PIXI.InteractionEvent) => {
    switch (event.data.button) {
      case 0:
        const { x: eventX, y: eventY } = event.data.global;
        const delta = [eventX - x, eventY - y];
        draggedRef.current = true;
        deltaRef.current = delta;
        break;
      case 2:
        event.stopPropagation();
        console.log(`deleting index ${idx}`);
        doc.getArray("items").delete(idx, 1);
        break;
    }
  };

  const handlePointerUp = useCallback(() => {
    draggedRef.current = false;
    deltaRef.current = null;
  }, []);

  const handlePointerMove = (event: PIXI.InteractionEvent) => {
    if (!draggedRef.current) return;
    const { x: eventX, y: eventY } = event.data.global;
    const [dx, dy] = deltaRef.current;
    updatePos([eventX - dx, eventY - dy]);
  };

  return (
    <Sprite
      texture={PIXI.Texture.WHITE}
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

export default memo(Item);
