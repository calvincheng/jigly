import { useMemo, useContext, createContext } from "react";
import { useState } from "react";
import useUsers from "hooks/useUsers";
import useUser from "hooks/useUser";
import LoginModal from "components/Modal/LoginModal";

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
  useUsers();
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [
    { user, loggedIn, pos, chatting },
    { login, logout, updateChat, updateActive, updateName },
  ] = useUser(viewport);

  const value = useMemo(() => {
    return { user: { user, loggedIn, pos, chatting } };
  }, [user, loggedIn, pos, chatting]);

  const methodsValue = useMemo(() => {
    return { login, logout, updateChat, updateActive, updateName };
  }, [updateChat, updateActive, updateName]);

  return (
    <AwarenessMethodsContext.Provider value={methodsValue}>
      <AwarenessContext.Provider value={value}>
        <LoginModal
          show={showLoginModal}
          onHide={() => setShowLoginModal(false)}
        />
        {children}
      </AwarenessContext.Provider>
    </AwarenessMethodsContext.Provider>
  );
};

export default useAwareness;
