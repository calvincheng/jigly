import { useState, useEffect } from "react";
import { doc, provider } from "Y";
import { YPiece } from "types";
import * as Y from "yjs";

const usePieces = () => {
  const [pieces, setPieces] = useState<YPiece[]>([]);

  useEffect(() => {
    const yPieces: Y.Array<YPiece> = doc.getArray("pieces");
    yPieces.observe(() => {
      setPieces(yPieces.toArray());
    });

    provider.on("sync", () => {
      console.log("synced");
      setPieces(yPieces.toArray());
    });
  }, []);

  return { pieces };
};

export default usePieces;
