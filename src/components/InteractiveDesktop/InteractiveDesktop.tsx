import { useEffect, useRef, useState } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useDesktopItems } from "../../hooks/useDesktopItems";
import { DesktopItem } from "./DesktopItem/DesktopItem";

import { CELL_SIZE } from "../../constants/header";
import { Button } from "../Button/Button";
import styles from "./InteractiveDesktop.module.css";

export function InteractiveDesktop() {
  const [cols, setCols] = useState(Math.floor(window.innerWidth / CELL_SIZE));
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parentRef.current) {
      setCols(Math.floor(parentRef.current.offsetWidth / CELL_SIZE));
    }
  }, [parentRef.current?.offsetWidth]);

  const {
    items,
    setItems,
    resetItems,
    removeItem,
    selectedItemId,
    setSelectedItemId,
  } = useDesktopItems();

  const handleInteract = (itemId: string) => {
    setSelectedItemId(itemId);
  };

  const handleLayoutChange = (layout: Layout[]) => {
    if (JSON.stringify(items) !== JSON.stringify(layout)) {
      setItems(layout);
    }
  };

  return (
    <main ref={parentRef} className={styles.container}>
      <Button onClick={resetItems} className={styles.resetButton}>
        Reset items
      </Button>
      <GridLayout
        layout={items}
        cols={cols}
        rowHeight={CELL_SIZE}
        width={cols * CELL_SIZE}
        margin={[0, 0]}
        onDragStart={(_, item) => handleInteract(item.i)}
        onResizeStart={(_, item) => handleInteract(item.i)}
        onDragStop={handleLayoutChange}
        onResizeStop={handleLayoutChange}
        allowOverlap
      >
        {items.map((item) => (
          <DesktopItem
            key={item.i}
            id={item.i}
            onClick={() => handleInteract(item.i)}
            isSelected={selectedItemId === item.i}
            title={`Title ${item.i}`}
            removeItem={removeItem}
          />
        ))}
      </GridLayout>
    </main>
  );
}
