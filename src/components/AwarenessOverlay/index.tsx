import { useReducer, useEffect } from "react";
import useUser from "../../hooks/useUser";
import useUsers from "../../hooks/useUsers";
import Cursor from "../Cursor";

type AwarenessProps = {
  viewport: any;
};

const Awareness = ({ viewport }: AwarenessProps) => {
  const [{ user, pos, chatting }, { updateChat }] = useUser(viewport);
  const { users } = useUsers();
  const [, rerender] = useReducer((x: boolean) => !x, true);

  useEffect(() => {
    // Rerender cursors on viewport move to recalculate their toSreen positions
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
          .map(([peerID, peer]) => {
            const [x, y] = peer.pos;
            const { x: peerX, y: peerY } = viewport.toScreen({ x, y });
            if (
              0 <= peerX &&
              peerX <= viewport.screenWidth &&
              0 <= peerY &&
              peerY <= viewport.screenHeight
            ) {
              return (
                <Cursor
                  key={peerID}
                  id={peerID}
                  pos={[peerX, peerY]}
                  // pos={peer.pos}
                  chatting={peer.chat.length > 0}
                  chat={peer.chat}
                  active={peer.active}
                  interpolate
                />
              );
            } else {
              return null;
            }
          })}

      {/* User cursor */}
      {user && (
        <Cursor
          id={user.id}
          pos={pos}
          chatting={chatting}
          chat={user.chat}
          onChat={(event: any) => updateChat(event.target.value)}
          active={user.active}
        />
      )}
    </>
  );
};

export default Awareness;
