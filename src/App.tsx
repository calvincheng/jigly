/** @jsxImportSource @emotion/react */
import { useCallback } from "react";
import { css } from "@emotion/react";
import * as Y from "yjs";
import { doc } from "./Y";
import Cursor from "./components/Cursor";
import Item from "./components/Item";
import useUser from "./hooks/useUser";
import useUsers from "./hooks/useUsers";
import useItems from "./hooks/useItems";

function App() {
  const [{ user, chatting }, { updateChat, updateActive }] = useUser();
  const { users } = useUsers();
  const { items } = useItems();

  const handlePointerDown = useCallback((event: any) => {
    if (event.button === 2) {
      event.preventDefault();
      const newItem = new Y.Map();
      newItem.set("pos", [event.clientX, event.clientY]);
      const yItems = doc.getArray("items");
      yItems.push([newItem]);
    }
  }, []);

  const handleContextMenu = useCallback((event: any) => {
    event.preventDefault();
  }, []);

  const handlePointerEnter = useCallback(() => {
    updateActive(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    updateActive(false);
  }, []);

  return (
    <div
      onPointerDown={handlePointerDown}
      onContextMenu={handleContextMenu}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      css={css`
        height: 100vh;
        width: 100vw;
      `}
    >
      {/* Items */}
      {items.map((item, index) => {
        return <Item key={index} item={item} idx={index} />;
      })}
      {/* Peer cursors */}
      {Object.entries(users)
        .filter(([peerID]) => peerID !== user?.id)
        .map(([peerID, peer]) => (
          <Cursor
            key={peerID}
            id={peerID}
            pos={peer.pos}
            chatting={peer.chat.length > 0}
            chat={peer.chat}
            interpolate
            active={peer.active}
          />
        ))}
      {/* User (self) cursor */}
      {user && (
        <Cursor
          id={user.id}
          pos={user.pos}
          chatting={chatting}
          chat={user.chat}
          onChat={(event: any) => updateChat(event.target.value)}
          active={user.active}
        />
      )}
    </div>
  );
}

export default App;
