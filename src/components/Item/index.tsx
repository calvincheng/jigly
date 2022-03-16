/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef } from "react";
import * as Y from "yjs";
import useItem from "../../hooks/useItem";
import { doc } from "../../Y";

type ItemProps = {
  item: Y.Map<number>;
  idx: number;
};

const Item = ({ item, idx }: ItemProps) => {
  const { pos, updatePos } = useItem(item);
  const [x, y] = pos;
  const draggedRef = useRef<boolean>(false);
  const deltaRef = useRef<any>(null);
  const size = 40;

  const handlePointerDown = (event: any) => {
    if (event.button === 0) {
      const delta = [event.clientX - x, event.clientY - y];
      draggedRef.current = true;
      deltaRef.current = delta;
      const [dx, dy] = delta;
      updatePos([event.clientX - dx, event.clientY - dy]);
    } else if (event.button === 2) {
      event.preventDefault();
      console.log("deleting");
      doc.getArray("items").delete(idx, 1);
    }
  };

  const handlePointerUp = () => {
    draggedRef.current = false;
    deltaRef.current = null;
  };

  useEffect(() => {
    const handlePointerMove = (event: any) => {
      if (!draggedRef.current) return;
      const [dx, dy] = deltaRef.current;
      updatePos([event.clientX - dx, event.clientY - dy]);
    };

    document.addEventListener("pointermove", handlePointerMove);
    return () => document.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      css={css`
        position: absolute;
        top: ${y}px;
        left: ${x}px;
        width: ${size}px;
        height: ${size}px;
        background: #f5e0dc;
        transition: 0.05s ease all;
      `}
    />
  );
};

export default Item;
