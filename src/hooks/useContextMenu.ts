import { useState, useCallback } from "react";
import { ContextMenuPosition } from "../types/todo";

export const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState<ContextMenuPosition | null>(
    null
  );

  const showContextMenu = useCallback((e: React.MouseEvent, todoId: string) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      todoId,
    });
  }, []);

  return {
    contextMenu,
    showContextMenu,
  };
};
