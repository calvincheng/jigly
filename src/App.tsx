/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as Y from "yjs";
import { doc } from "./Y";
import Cursor from "./components/Cursor";
import Item from "./components/Item";
import useUser from "./hooks/useUser";
import useUsers from "./hooks/useUsers";
import useItems from "./hooks/useItems";

function App() {
  const [{ user, chatting }, { updateChat }] = useUser();
  const { users } = useUsers();
  const { items } = useItems();

  const handlePointerDown = (event: any) => {
    if (event.button === 2) {
      event.preventDefault();
      const newItem = new Y.Map();
      newItem.set("pos", [event.clientX, event.clientY]);
      const yItems = doc.getArray("items");
      yItems.push([newItem]);
    }
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onContextMenu={(event: any) => event.preventDefault()}
      css={css`
        height: 100vh;
        width: 100vw;
      `}
    >
      {items.map((item, index) => {
        return <Item key={index} item={item} idx={index} />;
      })}
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
          />
        ))}

      {user && (
        <Cursor
          id={user.id}
          pos={user.pos}
          chatting={chatting}
          chat={user.chat}
          onChat={(event: any) => updateChat(event.target.value)}
        />
      )}
    </div>
  );
}

export default App;
