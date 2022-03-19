import * as Y from "yjs";
import { doc } from "../Y";
import generateJigsaw from "./generateJigsaw";
import { YPiece } from "../types";

const DEFAULT = {
  pos: [0, 0],
  index: [0, 0],
  size: 30,
  edges: [0, 0, 0, 0],
};

function initialiseJigsaw(n: number, m: number, size: number) {
  // Generate edges
  const edges = generateJigsaw(n, m);

  // Add new pieces to yPieces
  const newPieces: YPiece[] = [];
  edges.forEach((row: any, i: number) => {
    row.forEach((edge: any, j: number) => {
      const newPiece: YPiece = new Y.Map();
      newPiece.set("pos", [j * size ?? DEFAULT.size, i * size ?? DEFAULT.size]);
      newPiece.set("index", [i, j]);
      newPiece.set("size", size ?? DEFAULT.size);
      newPiece.set("edges", edge);
      newPieces.push(newPiece);
    });
  });

  const yPieces = doc.getArray("pieces");
  doc.transact(() => {
    yPieces.delete(0, yPieces.length); // Clear existing pieces
    yPieces.push(newPieces);
  });
}

export default initialiseJigsaw;
