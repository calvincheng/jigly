/** @jsxImportSource @emotion/react */
import { memo } from "react";
import { css } from "@emotion/react";

type AvatarProps = {
  id: string;
  name?: string;
  color: string;
  active?: boolean;
};

const getInitials = (fullName: string): string => {
  return fullName
    .split(" ")
    .slice(0, 3)
    .map((word) => word.charAt(0).toLocaleUpperCase())
    .join("");
};

const Avatar = ({ name = "ø", color, active }: AvatarProps) => {
  const displayName = getInitials(name);
  const size = 36;
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        height: ${size}px;
        width: ${size}px;
        border-radius: ${size / 2}px;
        background: ${active ? color : "var(--color-black4)"};
        color: var(--color-black0);
        font-weight: bold;
        font-size: 13px;
      `}
    >
      {displayName}
    </div>
  );
};

export default memo(Avatar);
