import { YPiece, SnapCandidate } from "../types";

export default function snapPieceToNeighbour(
  piece: YPiece,
  pieces: YPiece[],
  { tolerance = 20 } = {}
) {
  const [x, y] = piece.get("pos");
  const [i, j] = piece.get("index");
  const size = piece.get("size");

  // Gather other pieces
  const otherPieces = pieces.filter((p) => {
    const [pi, pj]: any = p.get("index");
    return i !== pi || j !== pj;
  });

  // Get candidate vertices to snap to by checking if each of the piece's 4
  // vertices are close to a vertex of a nearby (i.e. within tolerance) piece
  const targets = ["topleft", "topright", "bottomleft", "bottomright"];
  const targetCandidatePairs = targets
    .map((target) => {
      return {
        target,
        candidate: getSnapCandidate(piece, otherPieces, target, tolerance),
      };
    })
    .filter((pair): pair is { target: string; candidate: SnapCandidate } =>
      Boolean(pair.candidate)
    ); // Keep valid (non-null) candidates

  if (targetCandidatePairs.length > 0) {
    // Find closest vertex
    const bestCandidatePair = targetCandidatePairs.reduce(
      (bestPair, candidatePair) => {
        const {
          candidate: {
            vertex: [cx, cy],
          },
        } = candidatePair;
        const {
          candidate: {
            vertex: [bestX, bestY],
          },
        } = candidatePair;
        const cDist = (x - cx) ** 2 + (y - cy) ** 2;
        const bestDist = (x - bestX) ** 2 + (y - bestY) ** 2;
        return cDist < bestDist ? candidatePair : bestPair;
      },
      targetCandidatePairs[0]
    );

    // Snap target to candidate
    const {
      target,
      candidate: {
        vertex: [snapX, snapY],
      },
    } = bestCandidatePair;
    switch (target) {
      case "topleft":
        piece.set("pos", [snapX, snapY]);
        break;
      case "topright":
        piece.set("pos", [snapX - size, snapY]);
        break;
      case "bottomleft":
        piece.set("pos", [snapX, snapY - size]);
        break;
      case "bottomright":
        piece.set("pos", [snapX - size, snapY - size]);
        break;
    }
  }
}

/**
 * Helper function that returns a candidate piece and vertex to snap to if
 * within tolerance distance
 */
function getSnapCandidate(
  piece: YPiece,
  otherPieces: YPiece[],
  target = "topleft",
  tolerance = 20
): SnapCandidate | null {
  let [x, y] = piece.get("pos");
  const size = piece.get("size");

  // Adjust anchor based on target
  if (target === "topright" || target === "bottomright") {
    x += size;
  }
  if (target === "bottomright" || target === "bottomleft") {
    y += size;
  }

  // Get available coordinates to snap to vertices of the same type are ignored
  // as a piece shouldn't snap completely over its neighbour. At the same time,
  // vertices of the opposite type (e.g. top-left to bottom-right) are ignored
  // as only edge-to-edge snaps are allowed
  const candidates: SnapCandidate[] = [];
  otherPieces.forEach((otherPiece: YPiece) => {
    const [px, py] = otherPiece.get("pos");
    let vertex: number[] = [0, 0];
    switch (target) {
      case "topleft":
        vertex = [px, py + size];
        break;
      case "topright":
        vertex = [px, py];
        break;
      case "bottomleft":
        vertex = [px + size, py + size];
        break;
      case "bottomright":
        vertex = [px + size, py];
        break;
    }
    candidates.push({ piece: otherPiece, vertex });
  });

  // NOTE: Can probably optimise this using a QuadTree if needed
  // Currently  it's O(2n) where n is the number of other pieces
  // (2 because each piece provides 2 candidates)
  const nearby = candidates.filter(({ vertex }) => {
    const [cx, cy] = vertex;
    const cDist = (x - cx) ** 2 + (y - cy) ** 2;
    return cDist < tolerance ** 2;
  });

  if (nearby.length === 0) return null;

  // Find and return closest vertex
  const closestVertex = nearby.reduce((best, candidate) => {
    const {
      vertex: [cx, cy],
    } = candidate;
    const {
      vertex: [closestX, closestY],
    } = best;
    const cDist = (x - cx) ** 2 + (y - cy) ** 2;
    const bestDist = (x - closestX) ** 2 + (y - closestY) ** 2;
    return cDist < bestDist ? candidate : best;
  }, nearby[0]);

  return closestVertex;
}
