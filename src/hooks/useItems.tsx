import { useState, useEffect } from "react";
import { doc, provider } from "../Y";

const useItems = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const yObjects = doc.getArray("items");
    yObjects.observe((event) => {
      console.log(event.changes);
      setItems(yObjects.toArray());
    });

    provider.on("sync", () => {
      console.log("synced");
      setItems(yObjects.toArray());
    });
  }, []);

  return { items };
};

export default useItems;
