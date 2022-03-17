import * as Y from "yjs";
import { doc } from "../Y";
import generateJigsaw from "./generateJigsaw";

const DEFAULT = {
  pos: [0, 0],
  index: [0, 0],
  size: 30,
  edges: [0, 0, 0, 0],
};

function initialiseJigsaw(n: number, m: number, size: number) {
  // Clear existing pieces
  const yPieces = doc.getArray("pieces");
  yPieces.delete(0, yPieces.length);

  // Generate edges
  const edges = generateJigsaw(n, m);

  // Add new pieces to yPieces
  const newPieces: Y.Map<any>[] = [];
  edges.forEach((row: any, i: number) => {
    row.forEach((edge: any, j: number) => {
      const newPiece = new Y.Map();
      newPiece.set("pos", [j * size ?? DEFAULT.size, i * size ?? DEFAULT.size]);
      newPiece.set("index", [i, j]);
      newPiece.set("size", size ?? DEFAULT.size);
      newPiece.set("edges", edge);
      newPieces.push(newPiece);
    });
  });
  yPieces.push(newPieces);
}

export default initialiseJigsaw;
