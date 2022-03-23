import { useCallback, useReducer, useEffect } from "react";
import useAwareness, { useAwarenessMethods } from "contexts/awareness";
import Cursor from "components/Cursor";
import { CURSOR_SIZE } from "constants";

type AwarenessProps = {
  viewport: any;
};

const AwarenessOverlay = ({ viewport }: AwarenessProps) => {
  const {
    user: { user, pos, chatting },
    users,
  } = useAwareness();
  const { updateChat } = useAwarenessMethods();
  const [, rerender] = useReducer((x: boolean) => !x, true);

  const onChat = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      updateChat(event.target.value),
    [updateChat]
  );

  useEffect(() => {
    // Rerender cursors on viewport move to recalculate their toScreen positions
    if (!viewport) return;
    viewport.on("moved", rerender);
    return () => {
      viewport.off("moved", rerender);
    };
  }, [viewport]);

  return (
    <>
      {/* Cursors */}
      {viewport &&
        Object.entries(users)
          .filter(([peerID]) => peerID !== user?.id)
          .map(([peerID, peer]: any) => {
            const [x, y] = peer.pos;
            const { x: peerX, y: peerY } = viewport.toScreen({ x, y });
            const withinScreen =
              -CURSOR_SIZE <= peerX &&
              peerX <= viewport.screenWidth &&
              -CURSOR_SIZE <= peerY &&
              peerY <= viewport.screenHeight;
            if (!withinScreen) return null;
            return (
              <Cursor
                key={peerID}
                name={peer.name || "Anonymous"}
                pos={[peerX, peerY]}
                color={peer.color}
                chatting={peer.chat.length > 0}
                chat={peer.chat}
                active={peer.active}
                // interpolate
              />
            );
          })}

      {/* User cursor */}
      {user && (
        <Cursor
          pos={pos}
          chatting={chatting}
          chat={user.chat}
          color={user.color}
          onChat={onChat}
          active={user.active}
        />
      )}
    </>
  );
};

export default AwarenessOverlay;
