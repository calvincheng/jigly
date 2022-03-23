/** @jsxImportSource @emotion/react */
import { memo } from "react";
import { css } from "@emotion/react";
import AutoGrowInput from "components/AutoGrowInput";

type ChatBubbleProps = {
  name?: string;
  text: string;
  onChange?: (event: any) => void;
  background?: string;
  chatting?: boolean;
};

const ChatBubble = ({
  name,
  text,
  onChange = () => null,
  background = "white",
  chatting = false,
}: ChatBubbleProps) => {
  const transitionStyle = `0.1s all ease`;
  return (
    <div
      css={css`
        transform: translate(12px, -14px);
        padding: ${chatting ? "8px 12px" : "4px 6px"};
        display: inline-grid;
        gap: 4px;
        border: 2px solid #000000d5;
        border-radius: ${chatting ? 15 : 0}px;
        border-top-left-radius: 0px;
        background: ${background};
        transition: ${transitionStyle};
      `}
    >
      {name && (
        <div
          css={css`
            white-space: pre;
            font-size: ${chatting ? 8 : 10}px;
            font-weight: ${chatting ? 600 : 700};
            transition: ${transitionStyle};
          `}
        >
          {name}
        </div>
      )}
      {chatting && (
        <AutoGrowInput
          value={text}
          onChange={onChange}
          placeholder="Say something"
        />
      )}
    </div>
  );
};

export default memo(ChatBubble);
