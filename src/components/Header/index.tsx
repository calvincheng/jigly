/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const Header = ({ children }: any) => {
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
      {children}
    </header>
  );
};

export default Header;
