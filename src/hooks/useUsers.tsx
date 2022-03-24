import { useEffect } from "react";
import { awareness } from "Y";
import { Users } from "types";
import { useStoreActions } from "easy-peasy";

const useUsers = () => {
  const updateUsers = useStoreActions((actions) => actions.updateUsers);

  useEffect(() => {
    // Handle new clients entering and leaving
    const handleAwarenessChange = () => {
      const newPeers: Users = {};
      awareness.getStates().forEach((state, clientID) => {
        newPeers[clientID] = state as any;
      });
      updateUsers(newPeers);
    };

    awareness.on("change", handleAwarenessChange);
    return () => awareness.off("change", handleAwarenessChange);
  }, []);
};

export default useUsers;
