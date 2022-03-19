import { useRef, useCallback } from "react";
import * as PIXI from "pixi.js";
import { doc } from "./Y";
import useWindowSize from "./hooks/useWindowSize";
import { Stage, Sprite, Graphics } from "@inlet/react-pixi";
import { JigsawProvider } from "./contexts/jigsaw";
import usePieces from "./hooks/usePieces";
import Piece from "./components/Piece";
import initialiseJigsaw from "./utils/initialiseJigsaw";
import checkComplete from "./utils/checkComplete";
import AwarenessOverlay from "./components/AwarenessOverlay";
import Viewport from "./components/Viewport";

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

  const stageHeight = 3000; // 3200 limit for some reason
  const stageWidth = 3000; // 3200 limit for some reason

  return (
    <>
      <Stage
        width={stageWidth}
        height={stageHeight}
        options={{ backgroundColor: 0x1a1826 }}
        onContextMenu={handleContextMenu}
      >
        <Viewport
          screenWidth={windowWidth}
          screenHeight={windowHeight}
          worldWidth={stageWidth}
          worldHeight={stageHeight}
          minScale={0.2}
          maxScale={2}
          ref={viewportRef}
        >
          {/* Pieces */}
          <JigsawProvider pieces={pieces}>
            {pieces.map((piece: any, index: number) => (
              <Piece key={index} piece={piece} />
            ))}
          </JigsawProvider>
          <Graphics
            draw={(g) => {
              g.lineStyle(10, 0xff0000);
              g.drawRect(0, 0, stageWidth, stageHeight);
            }}
          />
          <Sprite
            x={-10}
            y={-10}
            width={20}
            height={20}
            texture={PIXI.Texture.WHITE}
            tint={0x00ff00}
          />
        </Viewport>
      </Stage>

      <button
        style={{
          position: "absolute",
          right: 20,
          bottom: 20,
          userSelect: "none",
        }}
        onClick={() => {
          const yPieces = doc.getArray("pieces");
          yPieces.delete(0, yPieces.length);
        }}
      >
        Nuke
      </button>

      <button
        style={{
          position: "absolute",
          right: 80,
          bottom: 20,
          userSelect: "none",
        }}
        onClick={() => {
          // initialiseJigsaw(160, 100, 6);
          // initialiseJigsaw(80, 40, 12);
          // initialiseJigsaw(30, 15, 32);
          // initialiseJigsaw(12, 8, 80);
          // initialiseJigsaw(8, 4, 120);
          // initialiseJigsaw(8, 5, 24);
          // initialiseJigsaw(1, 1, 300);
          initialiseJigsaw(3, 2, 100);
        }}
      >
        Initialise jigsaw
      </button>

      <button
        style={{
          position: "absolute",
          right: 220,
          bottom: 20,
          userSelect: "none",
        }}
        onClick={() => console.log(checkComplete(pieces))}
      >
        Check complete
      </button>

      <AwarenessOverlay />
    </>
  );
}

export default App;
