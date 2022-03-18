import { YPiece } from "../types";

export default function getNearbyVertex(
  piece: YPiece,
  otherPieces: YPiece[],
  target = "topleft",
  tolerance = 20
): number[] | null {
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
  const coordinates: number[][] = [];
  otherPieces.forEach((otherPiece: YPiece) => {
    const [px, py] = otherPiece.get("pos");
    if (target !== "bottomleft" && target !== "topright")
      coordinates.push([px, py + size]); // Bottom-left vertex
    if (target !== "bottomright" && target !== "topleft")
      coordinates.push([px + size, py + size]); // Bottom-right vertex
    if (target !== "topright" && target !== "bottomleft")
      coordinates.push([px + size, py]); // Top-right vertex
    if (target !== "topleft" && target !== "bottomright")
      coordinates.push([px, py]); // Top-left vertex
  });

  // NOTE: Can probably optimise this using a QuadTree if needed
  // Currently  it's O(2n) where n is the number of other pieces
  // (2 because each piece provides 2 candidates)
  const nearby = coordinates.filter((coordinate) => {
    const [cx, cy] = coordinate;
    const cDist = (x - cx) ** 2 + (y - cy) ** 2;
    return cDist < tolerance ** 2;
  });

  if (nearby.length === 0) return null;

  // Find and return closest vertex
  const closestVertex = nearby.reduce((closest, coordinate) => {
    const [cx, cy] = coordinate;
    const [closestX, closestY] = closest;
    const cDist = (x - cx) ** 2 + (y - cy) ** 2;
    const bestDist = (x - closestX) ** 2 + (y - closestY) ** 2;
    return cDist < bestDist ? coordinate : closest;
  }, nearby[0]);

  return closestVertex;
}
