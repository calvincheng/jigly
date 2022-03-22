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

      {(chatting || name) && (
        <ChatBubble
          name={name}
          chatting={chatting}
          text={chat}
          onChange={onChat}
          background={cursorColor}
        />
      )}
    </div>
  );
};

export default memo(Cursor);
