/** @jsxImportSource @emotion/react */
import { useMemo } from "react";
import { css } from "@emotion/react";
import useAwareness from "contexts/awareness";
import Avatar from "components/Avatar";
import { Users } from "types";
import { AnimatePresence } from "framer-motion";

const Avatars = () => {
  const { users }: { users: Users } = useAwareness();
  const userValues = useMemo(() => Object.values(users), [users]);
  return (
    <div
      css={css`
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      `}
    >
      <AnimatePresence>
        {userValues
          .slice(0, Math.min(userValues.length, 3))
          .map((user, idx) => (
            <Avatar
              key={user.id}
              id={user.id}
              name={user.name}
              color={user.color}
              active={user.active}
              idxFromEnd={
                userValues.length - idx - (userValues.length > 3 ? 2 : 1)
              }
            />
          ))}
        {userValues.length > 3 && (
          <Avatar
            key="others"
            id="others"
            color="var(--color-white)"
            name={`+ ${userValues.length - 3}`}
            active={true}
            idxFromEnd={0}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Avatars;
