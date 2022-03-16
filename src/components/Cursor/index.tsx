/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CursorIcon from "./CursorIcon";

// Catppuccin colourscheme
const COLORS = [
  "#F28FAD", // Red
  "#F8BD96", // Peach
  "#FAE3B0", // Yellow
  "#ABE9B3", // Green
  "#B5E8E0", // Teal
  "#96CDFB", // Blue
  "#89DCEB", // Sky
  "#DDB6F2", // Mauve
  "#F5C2E7", // Pink
  "#F2CDCD", // Flamingo
];

type CursorProps = {
  id: string;
  pos: [number, number];
  color?: string;
  interpolate?: boolean;
};

const Cursor = ({ id, pos, color, interpolate = false }: CursorProps) => {
  const size = 16;
  const cursorColor = color ?? COLORS[id.charCodeAt(0) % COLORS.length];
  const [x, y] = pos;

  return (
    <div
      css={css`
        top: ${y}px;
        left: ${x}px;
        position: absolute;
        height: ${size}px;
        width: ${size}px;
        border-radius: ${size / 2}px;
        transition: ${interpolate ? "0.1s ease all" : "none"};
      `}
    >
      <CursorIcon color={cursorColor} />
    </div>
  );
};

export default Cursor;
