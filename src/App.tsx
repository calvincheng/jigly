import Cursor from "./components/Cursor";
import useUser from "./hooks/useUser";
import useUsers from "./hooks/useUsers";

function App() {
  const [{ user, chatting }, { updateChat }] = useUser();
  const { users } = useUsers();

  return (
    <div>
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
