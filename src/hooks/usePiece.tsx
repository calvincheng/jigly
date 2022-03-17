import { useState, useEffect } from "react";
import * as Y from "yjs";

const usePiece = (piece: Y.Map<any>): any => {
  const [pos, setPos] = useState<[number, number]>(piece.get("pos"));

  const updatePos = (pos: [number, number]) => {
    piece.set("pos", pos);
    setPos(pos);
  };

  useEffect(() => {
    const handleUpdate = () => {
      setPos(piece.get("pos"));
    };
    piece.observe(handleUpdate);
    return () => piece.unobserve(handleUpdate);
  }, []);

  return [
    {
      pos,
      size: piece.get("size"),
      index: piece.get("index"),
      edges: piece.get("edges"),
    },
    { updatePos },
  ];
};

export default usePiece;
