import * as PIXI from "pixi.js";
import { Bezier, YPiece } from "../types";

const template: Bezier[] = [
  // Taken (with thanks) from markE at
  // https://stackoverflow.com/questions/30617132/jigsaw-puzzle-pices-using-bezier-curve
  // for a 100x100 piece, the knob height is 20 (i.e. 1:5 knob-size ratio)
  { cx1: 0, cy1: 0, cx2: 35, cy2: 15, ex: 37, ey: 5 }, // left shoulder
  { cx1: 37, cy1: 5, cx2: 40, cy2: 0, ex: 38, ey: -5 }, // left neck
  { cx1: 38, cy1: -5, cx2: 20, cy2: -20, ex: 50, ey: -20 }, // left head
  { cx1: 50, cy1: -20, cx2: 80, cy2: -20, ex: 62, ey: -5 }, // right head
  { cx1: 62, cy1: -5, cx2: 60, cy2: 0, ex: 63, ey: 5 }, // right neck
  { cx1: 63, cy1: 5, cx2: 65, cy2: 15, ex: 100, ey: 0 }, // right shoulder
];

/**
 * Draws the given piece on the provided Graphics object
 * @param g - pixi.js Graphics object
 * @param piece - The piece
 * @param texture - The texture to render
 */
export default function drawPiece(
  g: PIXI.Graphics,
  piece: YPiece,
  texture: PIXI.Texture
) {
  const size = piece.get("size");
  const edges = piece.get("edges");
  const knobSize = size * 0.2;
  const scaleFactor = size / 100;
  const segments: Bezier[] = scale(template, scaleFactor);

  const topEdge = transform(mirror(segments, { y: edges[0] }), {
    dx: knobSize,
    dy: knobSize,
  });

  const rightEdge = transform(flipXY(mirror(segments, { y: -edges[1] })), {
    dx: knobSize + size,
    dy: knobSize,
  });
  const bottomEdge = transform(mirror(segments, { x: -1, y: -edges[2] }), {
    dx: knobSize + size,
    dy: knobSize + size,
  });

  const leftEdge = transform(flipXY(mirror(segments, { x: -1, y: edges[3] })), {
    dx: knobSize,
    dy: knobSize + size,
  });

  g.beginTextureFill({ texture });
  g.moveTo(knobSize, knobSize);
  drawSegments(g, topEdge);
  drawSegments(g, rightEdge);
  drawSegments(g, bottomEdge);
  drawSegments(g, leftEdge);
  g.closePath();
}

/**
 * Helper function - transforms segments by dx and dy
 * @param segments - List of segments
 * @param options - Options
 * @param options.dx - x transform
 * @param options.dy - y transform
 *
 * @returns segments - Transformed segments
 */
function transform(segments: Bezier[], { dx = 0, dy = 0 }): Bezier[] {
  return segments.map(({ cx1, cy1, cx2, cy2, ex, ey }) => {
    return {
      cx1: cx1 + dx,
      cy1: cy1 + dy,
      cx2: cx2 + dx,
      cy2: cy2 + dy,
      ex: ex + dx,
      ey: ey + dy,
    };
  });
}

/**
 * Helper function - scales list of segments with respect to 0, 0 by factor n
 * @param segments - List of segments
 * @param n - Scale factor
 *
 * @returns segments - Scaled segments
 */
function scale(segments: Bezier[], n: number): Bezier[] {
  return segments.map(({ cx1, cy1, cx2, cy2, ex, ey }) => {
    return {
      cx1: cx1 * n,
      cy1: cy1 * n,
      cx2: cx2 * n,
      cy2: cy2 * n,
      ex: ex * n,
      ey: ey * n,
    };
  });
}

/**
 * Helper function - mirros provided segments by the x or y axis
 * @param segments - List of segments
 * @param options - x and y multipliers
 * @param options.x - x factor
 * @param options.y - y factor
 *
 * @returns segments - Mirrored segments
 */
function mirror(segments: Bezier[], { x = 1, y = 1 } = {}) {
  return segments.map(({ cx1, cy1, cx2, cy2, ex, ey }) => {
    const flipX = x;
    const flipY = y;
    return {
      cx1: cx1 * flipX,
      cy1: cy1 * flipY,
      cx2: cx2 * flipX,
      cy2: cy2 * flipY,
      ex: ex * flipX,
      ey: ey * flipY,
    };
  });
}

/**
 * Helper function - draws provided list of segments on the graphics object
 * @param segments - List of segments
 *
 * @returns segments - Flipped segments
 */
function flipXY(segments: Bezier[]) {
  return segments.map(({ cx1, cy1, cx2, cy2, ex, ey }) => {
    return {
      cx1: cy1,
      cy1: cx1,
      cx2: cy2,
      cy2: cx2,
      ex: ey,
      ey: ex,
    };
  });
}

/**
 * Helper function that draws provided list of segments on the graphics object
 * @param g - pixi.js Graphics object
 * @param segments - List of segments to draw
 */
function drawSegments(g: any, segments: Bezier[]) {
  segments.forEach((segment) => {
    const { cx1, cy1, cx2, cy2, ex, ey } = segment;
    g.bezierCurveTo(cx1, cy1, cx2, cy2, ex, ey);
  });
}
