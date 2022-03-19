import { useEffect } from "react";
import useUser from "../../hooks/useUser";
import useUsers from "../../hooks/useUsers";
import Cursor from "../Cursor";

export const Awareness = () => {
  const [{ user, chatting }, { updateChat, updateActive }] = useUser();
  const { users } = useUsers();

  useEffect(() => {
    const handlePointerEnter = () => {
      updateActive(true);
    };

    const handlePointerLeave = () => {
      updateActive(false);
    };

    document.addEventListener("pointerenter", handlePointerEnter);
    document.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      document.removeEventListener("pointerenter", handlePointerEnter);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <>
      {/* Cursors */}
      {Object.entries(users)
        .filter(([peerID]) => peerID !== user?.id)
        .map(([peerID, peer]) => (
          <Cursor
            key={peerID}
            id={peerID}
            pos={peer.pos}
            chatting={peer.chat.length > 0}
            chat={peer.chat}
            active={peer.active}
          />
        ))}

      {/* {/1* User cursor *1/} */}
      {/* {user && ( */}
      {/*   <Cursor */}
      {/*     id={user.id} */}
      {/*     pos={user.pos} */}
      {/*     chatting={chatting} */}
      {/*     chat={user.chat} */}
      {/*     onChat={(event: any) => updateChat(event.target.value)} */}
      {/*     active={user.active} */}
      {/*   /> */}
      {/* )} */}
    </>
  );
};

export default Awareness;
