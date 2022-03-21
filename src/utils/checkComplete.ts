import { YPiece } from "types";

type Result = {
  correct: boolean;
  incorrectPiece: YPiece | null;
};

/**
 * Checks if puzzle is complete
 * @param pieces - Puzzle pieces
 * @returns result
 * @returns result.correct -
 */
export default function checkComplete(pieces: YPiece[]): Result {
  if (pieces.length === 0) return { correct: true, incorrectPiece: null };

  const size = pieces[0].get("size");

  // Check if next piece is in the correct position relative to current piece
  for (let idx = 0; idx < pieces.length - 1; idx += 1) {
    const piece = pieces[idx];
    const nextPiece = pieces[idx + 1];
    const [x, y] = piece.get("pos");
    const [i, j] = piece.get("index");
    const [nextX, nextY] = nextPiece.get("pos");
    const [nextI, nextJ] = nextPiece.get("index");
    const correct =
      (nextJ - j) * size === nextX - x && (nextI - i) * size === nextY - y;
    if (!correct) {
      return { correct: false, incorrectPiece: nextPiece };
    }
  }

  return { correct: true, incorrectPiece: null };
}
