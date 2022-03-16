import { useState, useEffect, useCallback } from "react";
import { awareness } from "../Y";
import { User } from "../types";

const useUser = () => {
  const [user, setUser] = useState<User>();
  const [chatting, setChatting] = useState<boolean>(false);

  const refetchUser = useCallback<any>(() => {
    setUser(awareness.getLocalState() as User);
  }, [awareness]);

  const updateChat = useCallback<any>(
    (chat: string) => {
      awareness.setLocalStateField("chat", chat);
      refetchUser();
    },
    [awareness]
  );

  useEffect(() => {
    const initial: User = {
      id: awareness.clientID.toString(),
      pos: [0, 0],
      chat: "",
    };
    awareness.setLocalState(initial);
    setUser(initial);
  }, []);

  // Update self awareness
  useEffect(() => {
    const handleMouseMove = (event: any) => {
      awareness.setLocalStateField("pos", [event.clientX, event.clientY]);
      refetchUser();
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Update self awareness
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      switch (event.key) {
        case "/":
          if (!chatting) {
            event.preventDefault();
            setChatting(true);
            break;
          }
        case "Escape":
          updateChat("");
          setChatting(false);
          break;
        case "Enter":
          updateChat("");
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return [{ user, chatting }, { updateChat }];
};

export default useUser;
