/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

type ChatBubbleProps = {
  text: string;
  onChange: (event: any) => void;
  background?: string;
  placeholder?: string;
};

const ChatBubble = ({
  text,
  onChange,
  background = "white",
  placeholder = "Say something",
}: ChatBubbleProps) => {
  return (
    <div
      css={css`
        display: inline-grid;
        align-items: center;
        justify-items: start;
        padding: 8px 12px;
        transform: translate(16px, 4px);
        border: 2px solid white;
        border-radius: 15px;
        border-top-left-radius: 0px;
        background: ${background};
      `}
    >
      <input
        autoFocus
        spellCheck="false"
        autoComplete="off"
        type="text"
        placeholder={placeholder}
        value={text}
        onChange={onChange}
        maxLength={60}
        css={css`
          grid-area: 1 / 1 / 2 / 2;
          margin: 0;
          padding: 0;
          width: 100%;

          color: #161320;
          resize: none;
          outline: none;
          background: none;
          border: none;
          appearance: none;
          &::placeholder {
            color: #161320;
            opacity: 0.6;
          }
        `}
      />
      <span // Ghost component to allow wrapper to auto-adjust width
        css={css`
          visibility: hidden;
          grid-area: 1 / 1 / 2 / 2;
          font-weight: bold;
          font-size: 14px;
          white-space: pre;
        `}
      >
        {text || placeholder}
      </span>
    </div>
  );
};

export default ChatBubble;
