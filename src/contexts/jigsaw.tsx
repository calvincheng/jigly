import { useState, useEffect, useContext, createContext } from "react";
import * as PIXI from "pixi.js";
import imagePath from "../assets/greatWave.png";
import { useApp as usePixi } from "@inlet/react-pixi";

const JigsawContext = createContext<any>(null);

const useJigsaw = () => useContext(JigsawContext);

export const JigsawProvider = ({ children }: { children: React.ReactNode }) => {
  const pixi = usePixi();
  const [baseTexture, setBaseTexture] = useState<any>(null);

  useEffect(() => {
    const handleNewResource = () => {
      const resource = pixi.loader.resources["jigsaw"];
      setBaseTexture(PIXI.BaseTexture.from(resource.url));
    };

    delete pixi.loader.resources["jigsaw"];
    pixi.loader.add("jigsaw", imagePath);
    pixi.loader.load(handleNewResource);
  }, [imagePath]);

  return (
    <JigsawContext.Provider value={{ baseTexture }}>
      {children}
    </JigsawContext.Provider>
  );
};

export default useJigsaw;
