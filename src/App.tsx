/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef, useCallback } from "react";
import { doc } from "Y";
import useWindowSize from "hooks/useWindowSize";
import { Stage } from "@inlet/react-pixi";
import { JigsawProvider } from "contexts/jigsaw";
import usePieces from "hooks/usePieces";
import Piece from "components/Piece";
import initialiseJigsaw from "utils/initialiseJigsaw";
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

      <Header>
        <div
          css={css`
            display: flex;
            gap: 12px;
          `}
        >
          <button
            css={css`
              background: var(--color-green);
              color: var(--color-black0);
            `}
            onClick={() => {
              initialiseJigsaw(4, 3, 200);
            }}
          >
            New
          </button>
          <button
            onClick={() => {
              const yPieces = doc.getArray("pieces");
              yPieces.delete(0, yPieces.length);
            }}
          >
            Clear
          </button>
        </div>
      </Header>

      <Footer>
        <a
          href="https://github.com/calvincheng"
          target="_blank"
          css={css`
            text-decoration: none;
            color: var(--color-white);
            font-size: 14px;
            opacity: 0.5;
            &:hover {
              opacity: 0.9;
            }
          `}
        >
          <b> calvincheng</b>
        </a>
      </Footer>

      <AwarenessOverlay viewport={viewportRef.current} />
    </>
  );
}

export default App;
