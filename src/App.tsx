import Cursor from "./components/Cursor";
import useCursor from "./hooks/useUser";
import usePeerCursors from "./hooks/useUsers";

function App() {
  const { user } = useCursor();
  const { users } = usePeerCursors();

  return (
    <div>
      {Object.entries(users)
        .filter(([userId]) => userId !== user?.id)
        .map(([userID, user]) => (
          <Cursor key={userID} id={userID} pos={user.pos} />
        ))}
      {user && <Cursor id={user.id} pos={user.pos} />}
    </div>
  );
}

export default App;
