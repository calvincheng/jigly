/** @jsxImportSource @emotion/react */
import { useRef, useCallback } from "react";
import { css } from "@emotion/react";
import * as PIXI from "pixi.js";
import { doc } from "Y";
import useWindowSize from "hooks/useWindowSize";
import { Stage, Sprite, Graphics } from "@inlet/react-pixi";
import { JigsawProvider } from "contexts/jigsaw";
import usePieces from "hooks/usePieces";
import Piece from "components/Piece";
import initialiseJigsaw from "utils/initialiseJigsaw";
import AwarenessOverlay from "components/AwarenessOverlay";
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

      <div
        css={css`
          position: absolute;
          right: 20px;
          bottom: 20px;
          display: flex;
          gap: 12px;
          button {
            user-select: none;
          }
        `}
      >
        <button
          onClick={() => {
            initialiseJigsaw(8, 14, 100);
          }}
        >
          Initialise jigsaw
        </button>
        <button
          onClick={() => {
            const yPieces = doc.getArray("pieces");
            yPieces.delete(0, yPieces.length);
          }}
        >
          Nuke
        </button>
      </div>

      <AwarenessOverlay viewport={viewportRef.current} />
    </>
  );
}

export default App;
