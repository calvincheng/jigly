/** @jsxImportSource @emotion/react */
import "react-tippy/dist/tippy.css";
import { css } from "@emotion/react";
import { motion, useIsPresent } from "framer-motion";
import { Tooltip } from "react-tippy";
import { User } from "types";
import getInitials from "utils/getInitials";
import { EMOJIS } from "constants";

type CollapsedAvatarsProps = {
  users: User[];
};

const size = 36;

const TooltipUser = ({ user }: any) => {
  const displayName =
    getInitials(user.name) || EMOJIS[user.id.charCodeAt(0) % EMOJIS.length];
  return (
    <li
      css={css`
        display: flex;
        align-items: center;
        gap: 12px;
        user-select: none;
      `}
    >
      <div
        css={css`
          background: ${user.color};
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-black0);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          margin: 6px 0;
          font-weight: bold;
          font-size: 13px;
        `}
      >
        {displayName}
      </div>
      <div
        css={css`
          overflow: hidden;
          max-width: 120px;
          white-space: pre;
          text-overflow: ellipsis;
        `}
      >
        {user.name || "Anonymous"}
      </div>
    </li>
  );
};

const TooltipContent = ({ users }: { users: User[] }) => {
  return (
    <ul
      css={css`
        padding: 0px 6px;
        margin: 0;
        max-height: 120px;
        overflow-y: auto;
      `}
    >
      {users.map((user) => (
        <TooltipUser key={user.id} user={user} />
      ))}
    </ul>
  );
};

const popperOptions = {
  // Modify z-index
  modifiers: {
    addZIndex: {
      enabled: true,
      order: 0,
      fn: (data: any) => ({
        ...data,
        styles: {
          ...data.styles,
          zIndex: 0,
        },
      }),
    },
  },
};

const animation = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  exit: { scale: 0 },
  transition: {
    background: { duration: 0.1 },
  },
};

const CollapsedAvatars = ({ users }: CollapsedAvatarsProps) => {
  const isPresent = useIsPresent();
  const displayName = `+${users.length}`;

  return (
    <Tooltip
      html={<TooltipContent users={users} />}
      interactive
      position="bottom"
      distance={20}
      duration={0}
      animation="none"
      popperOptions={popperOptions}
    >
      <motion.div
        layoutId={"others"}
        layout="position"
        {...animation}
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-black0);
          background: var(--color-white);
          position: ${isPresent ? "static" : "absolute"};
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          font-weight: bold;
          font-size: 13px;
          pointer-events: auto;
        `}
      >
        {displayName}
      </motion.div>
    </Tooltip>
  );
};

export default CollapsedAvatars;
