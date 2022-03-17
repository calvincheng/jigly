import { useCallback } from "react";
import * as Y from "yjs";
import { doc } from "./Y";
import useUser from "./hooks/useUser";
import useUsers from "./hooks/useUsers";
import useItems from "./hooks/useItems";
import useWindowSize from "./hooks/useWindowSize";
import { Stage } from "@inlet/react-pixi";
import Cursor from "./components/Cursor";
import Item from "./components/Item";

function App() {
  const [{ user, chatting }, { updateChat, updateActive }] = useUser();
  const { users } = useUsers();
  const { items } = useItems();

  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (event.button === 2) {
        event.preventDefault();
        const newItem = new Y.Map();
        newItem.set("pos", [event.clientX, event.clientY]);
        const yItems = doc.getArray("items");
        yItems.push([newItem]);
      }
    },
    []
  );

  const handleContextMenu = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      event.preventDefault();
    },
    []
  );

  const handlePointerEnter = useCallback(() => {
    updateActive(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    updateActive(false);
  }, []);

  return (
    <>
      <Stage
        height={windowHeight}
        width={windowWidth}
        options={{ backgroundColor: parseInt("1a1826", 16) }}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onContextMenu={handleContextMenu}
        onPointerDown={handlePointerDown}
      >
        {items.map((item, index) => {
          return <Item key={index} item={item} idx={index} />;
        })}
      </Stage>

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

      {/* User cursor */}
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
    </>
  );
}

export default App;
