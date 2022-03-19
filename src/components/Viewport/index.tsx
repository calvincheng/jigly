import { useContext, createContext, forwardRef } from "react";
import PixiViewport from "./viewport";
import { useApp } from "@inlet/react-pixi";

const ViewportContext = createContext<any>(null);
export const useViewport = () => useContext(ViewportContext);

const Viewport = forwardRef((props: any, ref: any) => {
  const app = useApp();
  return (
    <ViewportContext.Provider value={ref.current}>
      {/* PixiViewport handles props.children internally */}
      <PixiViewport app={app} {...props} ref={ref} />
    </ViewportContext.Provider>
  );
});

export default Viewport;
