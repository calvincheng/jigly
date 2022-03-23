/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

type AutoGrowInputProps = {
  autoFocus: boolean;
  value: string;
  onChange: (event: any) => void;
  placeholder?: string;
};

const AutoGrowInput = ({
  autoFocus = false,
  placeholder,
  onChange,
  value,
}: AutoGrowInputProps) => {
  return (
    <div
      css={css`
        display: inline-grid;
        align-items: center;
        justify-items: start;
      `}
    >
      <input
        autoFocus={autoFocus}
        spellCheck="false"
        autoComplete="off"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={60}
        css={css`
          grid-area: 1 / 1 / 2 / 2;
          margin-top: 0;
          padding: 0;
          width: 100%;

          color: var(--color-black0);
          background: none;
          &::placeholder {
            color: #00000066;
          }
        `}
      />
      {/* Ghost span to allow wrapper to auto-adjust width */}
      <span
        css={css`
          visibility: hidden;
          grid-area: 1 / 1 / 2 / 2;
          font-weight: bold;
          font-size: 13px;
          white-space: pre;
        `}
      >
        {value || placeholder}
      </span>
    </div>
  );
};

export default AutoGrowInput;
