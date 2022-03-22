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

const cursorStyle = css`
  top: 0px;
  left: 0px;
  position: absolute;
  height: ${CURSOR_SIZE}px;
  width: ${CURSOR_SIZE}px;
  pointer-events: none;
  z-index: 1; /* react-tippy tooltips are set to z-index 0 */
`;

const Cursor = ({
  pos: [x, y],
  name,
  color = "var(--color-white)",
  chat = "",
  chatting = false,
  onChat = () => null,
  active = true,
  interpolate = false,
}: CursorProps) => {
  const cursorColor = active ? color : "var(--color-black4)";
  return (
    <div
      css={cursorStyle}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
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
