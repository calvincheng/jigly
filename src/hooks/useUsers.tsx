import { useState, useEffect } from "react";
import { awareness } from "../Y";
import { Users } from "../types";

const useUsers = () => {
  const [users, setUsers] = useState<Users>({});

  useEffect(() => {
    // Handle new clients entering and leaving
    const handleAwarenessChange = () => {
      const newPeers: Users = {};
      awareness.getStates().forEach((state, clientID) => {
        newPeers[clientID] = state as any;
      });
      setUsers(newPeers);
    };

    awareness.on("change", handleAwarenessChange);
    return () => awareness.off("change", handleAwarenessChange);
  }, []);

  return { users };
};

export default useUsers;
