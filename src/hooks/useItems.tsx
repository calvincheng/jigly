import { useState, useEffect } from "react";
import { doc, provider } from "Y";

const useItems = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const yItems = doc.getArray("items");
    yItems.observe(() => {
      setItems(yItems.toArray());
    });

    provider.on("sync", () => {
      console.log("synced");
      setItems(yItems.toArray());
    });
  }, []);

  return { items };
};

export default useItems;
