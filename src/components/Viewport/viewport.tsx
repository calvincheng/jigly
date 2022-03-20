import { Viewport } from "pixi-viewport";
import { PixiComponent } from "@inlet/react-pixi";
import debounce from "lodash.debounce";

// https://github.com/davidfig/pixi-viewport/issues/233
const PixiViewport = PixiComponent("Viewport", {
  create: (props: any) => {
    const { screenWidth, screenHeight, worldWidth, worldHeight } = props;
    const viewport = new Viewport({
      ...(screenWidth ? { screenWidth } : {}),
      ...(screenHeight ? { screenHeight } : {}),
      ...(worldWidth ? { worldWidth } : {}),
      ...(worldHeight ? { worldHeight } : {}),
      passiveWheel: false,

      // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
      interaction: props.app.renderer.plugins.interaction,
    });

    viewport
      .drag()
      .decelerate()
      .pinch()
      .wheel({ trackpadPinch: true, wheelZoom: false })
      .clamp({
        left: 0,
        right: worldWidth,
        top: 0,
        bottom: worldHeight,
      })
      .clampZoom({ minScale: props.minScale, maxScale: props.maxScale });

    viewport.moving = false;

    const handleMoved = () => {
      // NOTE: Prevents clamp-jitter for some reason
      viewport.clamp({
        left: 0,
        right: worldWidth,
        top: 0,
        bottom: worldHeight,
      });
      if (!viewport.moving) {
        viewport.moving = true;
      }
    };

    const handleMovedEnd = debounce(() => {
      viewport.moving = false;
      const lastViewportMove = {
        corner: viewport.corner,
        scale: viewport.scaled,
      };
      localStorage.setItem(
        "lastViewportMove",
        JSON.stringify(lastViewportMove)
      );
    }, 150);

    viewport.on("moved", handleMoved);
    viewport.on("moved-end", handleMovedEnd);
    const lastViewportMove = localStorage.getItem("lastViewportMove");
    if (lastViewportMove !== null) {
      const { corner, scale } = JSON.parse(lastViewportMove);
      viewport.setZoom(scale);
      viewport.moveCorner(corner);
    } else {
      viewport.fit();
      viewport.moveCenter(worldWidth / 2, worldHeight / 2);
    }

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
