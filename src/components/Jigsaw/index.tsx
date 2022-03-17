import { useState, useEffect } from "react";
import { useApp } from "@inlet/react-pixi";
import usePieces from "../../hooks/usePieces";
import Piece from "../Piece";
import * as PIXI from "pixi.js";

const Jigsaw = ({ n, m, jigsawURL }: any) => {
  const app = useApp();
  const { pieces } = usePieces();
  const [baseTexture, setBaseTexture] = useState<any>(null);

  useEffect(() => {
    const handleNewResource = () => {
      const resource = app.loader.resources["jigsaw"];
      setBaseTexture(PIXI.BaseTexture.from(resource.url));
    };

    delete app.loader.resources["jigsaw"];
    app.loader.add("jigsaw", jigsawURL);
    app.loader.load(handleNewResource);
  }, [jigsawURL]);

  return (
    baseTexture &&
    pieces.map((row: any, i: number) =>
      row.map((piece: any, j: number) => (
        <Piece
          key={`${i}-${j}`}
          i={i}
          j={j}
          size={60}
          edges={piece}
          baseTexture={baseTexture}
        />
      ))
    )
  );
};

export default Jigsaw;
