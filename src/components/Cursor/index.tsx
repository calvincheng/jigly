/** @jsxImportSource @emotion/react */
import { memo } from "react";
import { css } from "@emotion/react";
import CursorIcon from "./CursorIcon";
import ChatBubble from "components/ChatBubble";

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
  // "#F5C2E7", // Pink
  // "#F2CDCD", // Flamingo
];

type CursorProps = {
  id: string;
  pos: [number, number];
  color?: string;
  chat?: string;
  chatting?: boolean;
  onChat?: (event: any) => void;
  active?: boolean;
  interpolate?: boolean;
};

const Cursor = ({
  id,
  pos,
  color,
  chat = "",
  chatting = false,
  onChat = () => null,
  active = true,
  interpolate = false,
}: CursorProps) => {
  const size = 16;
  const cursorColor = color ?? COLORS[id.charCodeAt(0) % COLORS.length];
  const [x, y] = pos;

  if (!active) return null;

  return (
    <div
      css={css`
        top: ${y}px;
        left: ${x}px;
        position: absolute;
        height: ${size}px;
        width: ${size}px;
        pointer-events: none;
        transition: ${interpolate ? "0.1s ease all" : "none"};
      `}
    >
      <CursorIcon fill={cursorColor} />

      {chatting && (
        <ChatBubble text={chat} onChange={onChat} background={cursorColor} />
      )}
    </div>
  );
};

export default memo(Cursor);
