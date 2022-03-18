import { useRef, useCallback } from "react";
import * as Y from "yjs";
import { doc } from "./Y";
import useWindowSize from "./hooks/useWindowSize";
import { Stage } from "@inlet/react-pixi";
import { JigsawProvider } from "./contexts/jigsaw";
import usePieces from "./hooks/usePieces";
import Piece from "./components/Piece";
import initialiseJigsaw from "./utils/initialiseJigsaw";
import AwarenessOverlay from "./components/AwarenessOverlay";
import Viewport from "./components/Viewport";

function App() {
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const { pieces } = usePieces();
  const viewportRef = useRef<any>();

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (event.button === 2) {
        event.preventDefault();
        const newItem = new Y.Map();
        newItem.set("pos", [event.clientX, event.clientY]);
        const yItems = doc.getArray("items");
        yItems.push([newItem]);
      }
    },
    []
  );

  const handleContextMenu = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      event.preventDefault();
    },
    []
  );

  return (
    <>
      <Stage
        height={windowHeight}
        width={windowWidth}
        options={{ backgroundColor: parseInt("1a1826", 16) }}
        onContextMenu={handleContextMenu}
        onPointerDown={handlePointerDown}
      >
        <Viewport
          height={windowHeight}
          width={windowWidth}
          minScale={0.2}
          maxScale={2}
          ref={viewportRef}
        >
          {/* Pieces */}
          <JigsawProvider viewport={viewportRef}>
            {pieces.map((piece: any, index: number) => (
              <Piece key={index} piece={piece} pieces={pieces} />
            ))}
          </JigsawProvider>
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
          // initialiseJigsaw(6, 3, 160);
          initialiseJigsaw(3, 2, 100);
        }}
      >
        Initialise jigsaw
      </button>

      <AwarenessOverlay />
    </>
  );
}

export default App;
