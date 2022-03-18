import { forwardRef } from "react";
import PixiViewport from "./viewport";
import { useApp } from "@inlet/react-pixi";

const Viewport = forwardRef((props: any, ref: any) => {
  const app = useApp();
  return <PixiViewport app={app} {...props} ref={ref} />;
});

export default Viewport;
