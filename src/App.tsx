import { useEffect } from "react";
import Cursor from "./components/Cursor";
import useUser from "./hooks/useUser";
import useUsers from "./hooks/useUsers";
import useItems from "./hooks/useItems";
import { doc } from "./Y";
import Item from "./components/Item";
import * as Y from "yjs";

function App() {
  const [{ user, chatting }, { updateChat }] = useUser();
  const { users } = useUsers();
  const { items } = useItems();

  useEffect(() => {
    const handleMouseDown = (event: any) => {
      if (event.button === 2) {
        event.preventDefault();
        const dummyObject = new Y.Map();
        dummyObject.set("pos", [event.clientX, event.clientY]);
        const yObjects = doc.getArray("items");
        yObjects.push([dummyObject]);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("contextmenu", (e) => e.preventDefault());
    };
  }, []);

  return (
    <div>
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
