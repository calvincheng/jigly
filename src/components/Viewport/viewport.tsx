import { Viewport } from "pixi-viewport";
import { PixiComponent } from "@inlet/react-pixi";

// https://github.com/davidfig/pixi-viewport/issues/233
const PixiViewport = PixiComponent("Viewport", {
  create: (props: any) => {
    const { worldWidth, worldHeight } = props;
    const viewport = new Viewport({
      // screenWidth: window.innerWidth,
      // screenHeight: window.innerHeight,
      ...(worldWidth ? { worldWidth: worldWidth } : {}),
      ...(worldHeight ? { worldWidth: worldHeight } : {}),
      passiveWheel: false,

      // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
      interaction: props.app.renderer.plugins.interaction,
    });

    viewport
      .drag()
      .pinch()
      .wheel()
      .decelerate()
      .clamp({ left: 0, right: worldWidth, top: 0, bottom: worldHeight })
      .clampZoom({ minScale: props.minScale, maxScale: props.maxScale });

    viewport.fit();

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
    const { screenHeight, screenWidth, worldHeight, worldWidth } = newProps;
    instance.resize(screenWidth, screenHeight, worldWidth, worldHeight);
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
