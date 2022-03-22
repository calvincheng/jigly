/** @jsxImportSource @emotion/react */
import { useMemo } from "react";
import { css } from "@emotion/react";
import useAwareness from "contexts/awareness";
import Avatar from "components/Avatar";
import CollapsedAvatars from "components/CollapsedAvatars";
import { Users } from "types";
import { AnimatePresence } from "framer-motion";

const maxAvatars = 2;

const Avatars = () => {
  const { users }: { users: Users } = useAwareness();
  const userValues = useMemo(
    () =>
      Object.values(users).sort(
        (userA, userB) => userA.created - userB.created
      ),
    [users]
  );
  const numUsers = userValues.length;
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
          .slice(0, Math.min(numUsers, maxAvatars))
          .map((user, idx) => (
            <Avatar
              key={user.id}
              id={user.id}
              name={user.name}
              color={user.color}
              active={user.active}
              idxFromEnd={numUsers - idx - (numUsers > maxAvatars ? 2 : 1)}
            />
          ))}
        {numUsers > maxAvatars && (
          <CollapsedAvatars
            key="others"
            users={userValues.slice(maxAvatars, numUsers)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Avatars;
