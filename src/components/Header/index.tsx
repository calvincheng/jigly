/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { doc } from "Y";
import initialiseJigsaw from "utils/initialiseJigsaw";
import Avatars from "components/Avatars";

const Header = () => {
  return (
    <header
      css={css`
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        display: flex;
        justify-content: space-between;
        padding: 20px 24px;
        color: white;
        font-size: 18px;
        font-weight: bold;
        pointer-events: none;
      `}
    >
      <div>Jigly</div>
      <div
        css={css`
          display: flex;
          gap: 12px;
        `}
      >
        <Avatars />
        <button
          css={css`
            background: var(--color-green);
            color: var(--color-black0);
          `}
          onClick={() => {
            initialiseJigsaw(4, 3, 200);
          }}
        >
          New
        </button>
        <button
          onClick={() => {
            const yPieces = doc.getArray("pieces");
            yPieces.delete(0, yPieces.length);
          }}
        >
          Clear
        </button>
      </div>
    </header>
  );
};

export default Header;
