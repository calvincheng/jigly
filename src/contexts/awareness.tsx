import { useMemo, useContext, createContext } from "react";
import useUsers from "hooks/useUsers";
import useUser from "hooks/useUser";

const AwarenessContext = createContext<any>({});
const AwarenessMethodsContext = createContext<any>({});

const useAwareness = () => useContext(AwarenessContext);
export const useAwarenessMethods = () => useContext(AwarenessMethodsContext);

type AwarenessProviderProps = {
  children: React.ReactNode;
  viewport: any;
};

export const AwarenessProvider = ({
  viewport,
  children,
}: AwarenessProviderProps) => {
  const [{ user, pos, chatting }, { updateChat, updateActive, updateName }] =
    useUser(viewport);
  const { users } = useUsers();

  const value = useMemo(() => {
    return { user: { user, pos, chatting }, users };
  }, [user, users, pos, chatting]);

  const methodsValue = useMemo(() => {
    return { updateChat, updateActive, updateName };
  }, [updateChat, updateActive, updateName]);

  return (
    <AwarenessMethodsContext.Provider value={methodsValue}>
      <AwarenessContext.Provider value={value}>
        {children}
      </AwarenessContext.Provider>
    </AwarenessMethodsContext.Provider>
  );
};

export default useAwareness;
