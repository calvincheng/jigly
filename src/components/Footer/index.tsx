/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const Footer = ({ children }: any) => {
  return (
    <footer
      css={css`
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100vw;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        padding: 20px 24px;
        color: #ffffff88;
      `}
    >
      {children}
    </footer>
  );
};

export default Footer;
