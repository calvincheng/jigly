import { useState, useEffect } from "react";
import { awareness } from "../Y";
import { User } from "../types";

const useUser = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const initial: User = { id: awareness.clientID.toString(), pos: [0, 0] };
    awareness.setLocalState(initial);
    setUser(initial);
  }, []);

  // Update self awareness
  useEffect(() => {
    const handleMouseMove = (event: any) => {
      awareness.setLocalStateField("pos", [event.clientX, event.clientY]);
      setUser(awareness.getLocalState() as User);
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return { user };
};

export default useUser;
