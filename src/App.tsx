import { useRef, useCallback } from "react";
import { Stage } from "@inlet/react-pixi";
import { JigsawProvider } from "contexts/jigsaw";
import { AwarenessProvider } from "contexts/awareness";
import useWindowSize from "hooks/useWindowSize";
import usePieces from "hooks/usePieces";
import Piece from "components/Piece";
import AwarenessOverlay from "components/AwarenessOverlay";
import Header from "components/Header";
import Footer from "components/Footer";
import Viewport from "components/Viewport";
import { WORLD_WIDTH, WORLD_HEIGHT } from "./constants";

function App() {
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const { pieces } = usePieces();
  const viewportRef = useRef<HTMLElement>();

  const handleContextMenu = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      event.preventDefault();
    },
    []
  );

  const stageWidth = windowWidth; // 3200 limit for some reason
  const stageHeight = windowHeight; // 3200 limit for some reason

  return (
    <>
      <AwarenessProvider>
        <Stage
          width={stageWidth}
          height={stageHeight}
          options={{ backgroundColor: 0x1a1826 }}
          onContextMenu={handleContextMenu}
        >
          <Viewport
            screenWidth={windowWidth}
            screenHeight={windowHeight}
            worldWidth={WORLD_WIDTH} // stageWidth
            worldHeight={WORLD_HEIGHT} // stageHeight
            minScale={0.1}
            maxScale={2}
            ref={viewportRef}
          >
            {/* Pieces */}
            <JigsawProvider pieces={pieces}>
              {pieces.map((piece: any, index: number) => (
                <Piece key={index} piece={piece} />
              ))}
            </JigsawProvider>
          </Viewport>
        </Stage>

        <Header />
        <Footer />
        <AwarenessOverlay viewport={viewportRef.current} />
      </AwarenessProvider>
    </>
  );
}

export default App;
