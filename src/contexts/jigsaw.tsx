import { useState, useEffect, useContext, createContext } from "react";
import * as PIXI from "pixi.js";
import imagePath from "../assets/greatWave.png";
// import imagePath from "../assets/greatWaveSmall.png";
// import maskPath from "../assets/masksheet_tiny.png";
// import maskPath from "../assets/masksheet_small.png";
// import maskPath from "../assets/masksheet.png";
import maskPath from "../assets/masksheet_nostroke.png";
import { useApp as usePixi } from "@inlet/react-pixi";
import { YPiece } from "../types";

const JigsawContext = createContext<any>(null);

const useJigsaw = () => useContext(JigsawContext);

type BaseTextures = {
  [textureName: string]: any;
};

type JigsawProviderProps = {
  children: React.ReactNode;
  pieces: YPiece[];
};

export const JigsawProvider = ({ pieces, children }: JigsawProviderProps) => {
  const pixi = usePixi();
  const [baseTextures, setBaseTextures] = useState<BaseTextures>({});

  useEffect(() => {
    pixi.loader.reset();
    pixi.loader.add("jigsaw", imagePath);
    pixi.loader.add("mask", maskPath);

    pixi.loader.load(() => {
      const newBaseTextures: BaseTextures = {};
      ["jigsaw", "mask"].forEach((textureName) => {
        const resource = pixi.loader.resources[textureName];
        newBaseTextures[textureName] = PIXI.BaseTexture.from(resource.url);
      });
      setBaseTextures(newBaseTextures);
    });
  }, [imagePath]);

  return (
    <JigsawContext.Provider value={{ baseTextures, pieces }}>
      {children}
    </JigsawContext.Provider>
  );
};

export default useJigsaw;
