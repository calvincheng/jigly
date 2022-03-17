import { useState, useEffect } from "react";
import { doc, provider } from "../Y";

const usePieces = () => {
  const [pieces, setPieces] = useState<any[] | null>(null);

  useEffect(() => {
    const yPieces = doc.getArray("pieces");
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
