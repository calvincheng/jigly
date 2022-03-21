/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const GithubLink = () => {
  return (
    <a
      href="https://github.com/calvincheng"
      target="_blank"
      css={css`
        text-decoration: none;
        color: var(--color-grey1);
        font-size: 14px;
        font-weight: 500;
      `}
    >
      calvincheng
    </a>
  );
};

const Footer = () => {
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
      <GithubLink />
    </footer>
  );
};

export default Footer;
