import { YPiece } from "../types";

/**
 * Checks if puzzle is complete
 * @param pieces - Puzzle pieces
 * @returns isComplete
 */
export default function checkComplete(pieces: YPiece[]) {
  if (pieces.length === 0) return true;

  const size = pieces[0].get("size");

  // Check if next piece is in the correct position relative to current piece
  const isComplete = pieces.reduce((correctSoFar, piece, idx) => {
    let correct = true;
    if (idx + 1 < pieces.length) {
      const nextPiece = pieces[idx + 1];
      const [x, y] = piece.get("pos");
      const [nextX, nextY] = nextPiece.get("pos");
      const [i, j] = piece.get("index");
      const [nextI, nextJ] = nextPiece.get("index");
      correct =
        (nextJ - j) * size === nextX - x && (nextI - i) * size === nextY - y;
    }
    return correctSoFar && correct;
  }, true);

  return isComplete;
}
