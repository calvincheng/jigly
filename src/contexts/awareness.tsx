import { useContext, createContext } from "react";
import useUsers from "hooks/useUsers";

const AwarenessContext = createContext<any>({});

const useAwareness = () => useContext(AwarenessContext);

type AwarenessProviderProps = {
  children: React.ReactNode;
};

export const AwarenessProvider = ({ children }: AwarenessProviderProps) => {
  const { users } = useUsers();

  return (
    <AwarenessContext.Provider value={{ users }}>
      {children}
    </AwarenessContext.Provider>
  );
};

export default useAwareness;
