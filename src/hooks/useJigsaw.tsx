import { useState, useEffect } from "react";
import { useApp } from "@inlet/react-pixi";
import generateJigsaw from "../utils/generateJigsaw";
import * as PIXI from "pixi.js";

type UseJigsawProps = {
  n?: number;
  m?: number;
  imagePath: string;
};

const useJigsaw = ({ n = 2, m = 2, imagePath }: UseJigsawProps) => {
  const app = useApp();
  const [jigsaw, setJigsaw] = useState<number[][][]>([]);
  const [baseTexture, setBaseTexture] = useState<any>(null);

  useEffect(() => {
    const newJigsaw = generateJigsaw(n, m);
    setJigsaw(newJigsaw);
  }, []);

  useEffect(() => {
    if (!imagePath) return;

    const handleNewResource = () => {
      const resource = app.loader.resources[imagePath];
      setBaseTexture(PIXI.BaseTexture.from(resource.url));
    };

    // Upload new jigsaw image to PIXI resources if unavailable
    // otherwise load directly
    if (!app.loader.resources[imagePath]) {
      app.loader.add(imagePath, imagePath);
      app.loader.load(handleNewResource);
    } else {
      handleNewResource();
    }
  }, [imagePath]);

  return { jigsaw, baseTexture };
};

export default useJigsaw;
