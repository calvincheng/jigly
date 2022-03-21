import * as Y from "yjs";
import { doc } from "Y";
import generateJigsaw from "utils/generateJigsaw";
import { YPiece } from "types";
import { WORLD_WIDTH, WORLD_HEIGHT } from "constants";

export default function initialiseJigsaw(n: number, m: number, size: number) {
  // Generate edges
  const edges = generateJigsaw(n, m);

  // Get a list of shuffled indices to randomise piece locations
  const locations = [];
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      locations.push([i, j]);
    }
  }
  const shuffledLocations = shuffle(locations);

  // Populate yPieces
  const gap = 2 * size;
  const newPieces: YPiece[] = [];
  edges.forEach((row: any, i: number) => {
    row.forEach((edge: any, j: number) => {
      const newPiece: YPiece = new Y.Map();

      const [I, J] = shuffledLocations.pop();
      const offsetX = WORLD_WIDTH / 2 - (n * gap) / 2;
      const offsetY = WORLD_HEIGHT / 2 - (m * gap) / 2;
      newPiece.set("pos", [offsetX + J * gap, offsetY + I * gap]);

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

/**
 * Helper function - Fisher-Yates shuffle
 */
function shuffle(array: any[]): any[] {
  let currentIndex = array.length;
  let randomIndex = null;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
