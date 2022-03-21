import * as Y from "yjs";
import { doc } from "Y";
import generateJigsaw from "utils/generateJigsaw";
import { YPiece } from "types";
import { WORLD_WIDTH, WORLD_HEIGHT } from "constants";

function initialiseJigsaw(n: number, m: number, size: number) {
  // Generate edges
  const edges = generateJigsaw(n, m);

  // Add new pieces to yPieces
  const newPieces: YPiece[] = [];
  edges.forEach((row: any, i: number) => {
    row.forEach((edge: any, j: number) => {
      const newPiece: YPiece = new Y.Map();
      const offsetX = (WORLD_WIDTH - n * size) / 2;
      const offsetY = (WORLD_HEIGHT - m * size) / 2;
      newPiece.set("pos", [offsetX + j * size, offsetY + i * size]);
      newPiece.set("index", [i, j]);
      newPiece.set("size", size);
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
