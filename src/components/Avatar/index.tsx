/** @jsxImportSource @emotion/react */
import { useMemo, memo } from "react";
import { css } from "@emotion/react";
import { motion, useIsPresent } from "framer-motion";
import getInitials from "utils/getInitials";

type AvatarProps = {
  id: string;
  name?: string;
  color: string;
  active?: boolean;
  // idxFromEnd is used to calculate displacement in exit animation
  // Should probably find a better way...
  idxFromEnd: number;
};

const size = 36;

const Avatar = ({ id, name = "ø", color, active, idxFromEnd }: AvatarProps) => {
  const isPresent = useIsPresent();
  const displayName = getInitials(name);

  const animation = useMemo(
    () => ({
      initial: { scale: 0 },
      animate: {
        scale: 1,
        background: active ? color : "var(--color-black4)",
      },
      exit: { scale: 0, x: -(size + 8) * idxFromEnd },
      transition: {
        background: { duration: 0.1 },
      },
    }),
    [active, color, idxFromEnd]
  );

  return (
    <motion.div
      layoutId={id}
      layout="position"
      {...animation}
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-black0);
        position: ${isPresent ? "static" : "absolute"};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        font-weight: bold;
        font-size: 13px;
      `}
    >
      {displayName}
    </motion.div>
  );
};

export default memo(Avatar);
