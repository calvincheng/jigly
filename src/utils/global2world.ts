import * as PIXI from "pixi.js";

export default function global2world (global: PIXI.Point, viewport: any): PIXI.Point {
  const { x: globalX, y: globalY } = global;
  const {x: viewportX, y: viewportY} = viewport.corner;
  const scale = viewport.scaled;
  const worldX = ((globalX) / scale) + viewportX;
  const worldY = ((globalY) / scale) + viewportY;
  return new PIXI.Point(worldX, worldY);
};
