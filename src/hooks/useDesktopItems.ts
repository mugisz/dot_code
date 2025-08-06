import { useCallback, useEffect, useState } from "react";
import { Layout } from "react-grid-layout";

const INITIAL_ITEMS: Layout[] = [
  { i: "1", x: 0, y: 0, w: 30, h: 10, minW: 15, minH: 5 },
  { i: "2", x: 30, y: 0, w: 30, h: 10, minW: 15, minH: 5 },
  { i: "3", x: 60, y: 0, w: 30, h: 10, minW: 15, minH: 5 },
  { i: "4", x: 90, y: 0, w: 30, h: 10, minW: 15, minH: 5 },
];

export function useDesktopItems() {
  const [items, setItems] = useState<Layout[]>(
    JSON.parse(localStorage.getItem("desktopItems")!) || INITIAL_ITEMS
  );
  const [selectedItemId, setSelectedItemId] = useState("");

  useEffect(() => {
    localStorage.setItem("desktopItems", JSON.stringify(items));
  }, [items]);

  const removeItem = useCallback((id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.i !== id));
  }, []);

  const resetItems = useCallback(() => {
    setItems(INITIAL_ITEMS);
    setSelectedItemId("");
  }, []);

  return {
    items,
    setItems,
    removeItem,
    resetItems,
    selectedItemId,
    setSelectedItemId,
  };
}
