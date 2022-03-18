import { Viewport } from "pixi-viewport";
import { PixiComponent } from "@inlet/react-pixi";

// https://github.com/davidfig/pixi-viewport/issues/233
const PixiViewport = PixiComponent("Viewport", {
  create: (props: any) => {
    const viewport = new Viewport({
      // screenWidth: window.innerWidth,
      // screenHeight: window.innerHeight,
      // worldWidth: 1000,
      // worldHeight: 1000,

      // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
      interaction: props.app.renderer.plugins.interaction,
    });

    viewport.drag().pinch().wheel().decelerate();
    self.viewport = viewport;

    return viewport;
  },
  didMount: (instance, parent) => {
    // apply custom logic on mount
  },
  willUnmount: (instance, parent) => {
    // clean up before removal
  },
  applyProps: (instance, oldProps, newProps) => {
    // props changed
    // apply logic to the instance
    const { height, width } = newProps;
    instance.resize(width, height);
  },
  config: {
    // destroy instance on unmount?
    // default true
    destroy: true,

    /// destroy its children on unmount?
    // default true
    destroyChildren: true,
  },
});

export default PixiViewport;
