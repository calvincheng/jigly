import { useState, useEffect } from "react";
import * as Y from "yjs";

const useItem = (item: Y.Map<any>) => {
  const [pos, setPos] = useState<[number, number]>(item.get("pos"));

  const updatePos = (pos: [number, number]) => {
    item.set("pos", pos);
    setPos(pos);
  };

  useEffect(() => {
    const handleUpdate = () => {
      setPos(item.get("pos"));
    };
    item.observe(handleUpdate);
    return () => item.unobserve(handleUpdate);
  }, []);

  return { pos, updatePos };
};

export default useItem;
