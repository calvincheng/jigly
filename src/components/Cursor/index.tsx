/** @jsxImportSource @emotion/react */
import { memo } from "react";
import { css } from "@emotion/react";
import CursorIcon from "./CursorIcon";
import ChatBubble from "components/ChatBubble";
import { CURSOR_SIZE } from "constants";

type CursorProps = {
  pos: [number, number];
  name?: string;
  color?: string;
  chat?: string;
  chatting?: boolean;
  onChat?: (event: any) => void;
  active?: boolean;
  interpolate?: boolean;
};

type CursorNameProps = {
  name: string;
  color: string;
};

const CursorName = ({ name, color }: CursorNameProps) => {
  return (
    <div
      css={css`
        display: inline-block;
        padding: 4px 6px;
        font-size: 10px;
        white-space: pre;
        transform: translate(12px, -14px);
        border: 2px solid #000000d5;
        border-radius: 2px;
        font-weight: bold;
        background: ${color};
      `}
    >
      {name}
    </div>
  );
};

const Cursor = ({
  pos,
  name,
  color = "var(--color-white)",
  chat = "",
  chatting = false,
  onChat = () => null,
  active = true,
  interpolate = false,
}: CursorProps) => {
  const [x, y] = pos;
  const cursorColor = active ? color : "var(--color-black4)";

  return (
    <div
      css={css`
        top: ${y}px;
        left: ${x}px;
        position: absolute;
        height: ${CURSOR_SIZE}px;
        width: ${CURSOR_SIZE}px;
        pointer-events: none;
        transition: ${interpolate ? "0.1s ease all" : "none"};
      `}
    >
      <CursorIcon fill={cursorColor} />

      {chatting && (
        <ChatBubble text={chat} onChange={onChat} background={cursorColor} />
      )}
      {!chatting && name && <CursorName name={name} color={cursorColor} />}
    </div>
  );
};

export default memo(Cursor);
