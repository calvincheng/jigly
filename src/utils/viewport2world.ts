import * as PIXI from "pixi.js";

export default function viewport2world(
  point: PIXI.Point,
  viewport: any
): PIXI.Point {
  const { x, y } = point;
  const { x: originX, y: originY } = viewport.corner;
  const scale = viewport.scaled;
  const worldX = x / scale + originX;
  const worldY = y / scale + originY;
  return new PIXI.Point(worldX, worldY);
}
