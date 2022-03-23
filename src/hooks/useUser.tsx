import { useState, useEffect, useCallback } from "react";
import { provider, awareness } from "Y";
import { User } from "types";
import { COLORS } from "constants";
import sample from "utils/sample";
import throttle from "lodash.throttle";

const useUser = (viewport: any) => {
  const [user, setUser] = useState<User>();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [pos, setPos] = useState<any>([0, 0]);
  const [chatting, setChatting] = useState<boolean>(false);

  const refetchUser = useCallback<any>(() => {
    setUser(awareness.getLocalState() as User);
  }, [awareness]);

  const login = () => provider.connect();

  const logout = () => provider.disconnect();

  const updateName = useCallback<any>(
    (name: string) => {
      awareness.setLocalStateField("name", name);
      refetchUser();
    },
    [awareness]
  );

  const updateChat = useCallback<any>(
    (chat: string) => {
      awareness.setLocalStateField("chat", chat);
      refetchUser();
    },
    [awareness]
  );

  const updateActive = useCallback<any>(
    (active: boolean) => {
      awareness.setLocalStateField("active", active);
      refetchUser();
    },
    [awareness]
  );

  useEffect(() => {
    setLoggedIn(provider.wsconnected);
  }, [provider.wsconnected]);

  useEffect(() => {
    const initial: User = {
      id: awareness.clientID.toString(),
      pos: [0, 0],
      chat: "",
      active: true,
      color: sample(COLORS),
      name: "",
      created: Date.now(),
    };
    awareness.setLocalState(initial);
    setUser(initial);
    return () => {
      awareness.setLocalState(null);
    };
  }, []);

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

  useEffect(() => {
    const handlePointerDown = () => {
      setChatting(false);
      awareness.setLocalStateField("chat", "");
      refetchUser();
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    const broadcastPos = throttle(([x, y]: number[]) => {
      const { x: worldX, y: worldY } = viewport.toWorld({ x, y });
      awareness.setLocalStateField("pos", [worldX, worldY]);
      refetchUser();
    }, 50);

    const handlePointerMove = (event: any) => {
      const { clientX: x, clientY: y } = event;
      // Update local position
      setPos([x, y]);

      // Broadcast world position
      if (viewport && !viewport.moving) {
        broadcastPos([x, y]);
      }
    };

    document.addEventListener("pointermove", handlePointerMove);

    return () => document.removeEventListener("pointermove", handlePointerMove);
  }, [viewport]);

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

  return [
    { user, pos, chatting, loggedIn },
    { updateChat, updateActive, updateName, login, logout },
  ];
};

export default useUser;
