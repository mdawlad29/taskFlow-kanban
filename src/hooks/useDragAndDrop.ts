import { useState, useCallback } from "react";
import { TodoStatus } from "../types/todo";

export const useDragAndDrop = () => {
  const [draggedTodo, setDraggedTodo] = useState<string | null>(null);

  const [dragOverColumn, setDragOverColumn] = useState<TodoStatus | null>(null);

  // start dragging
  const handleDragStart = useCallback((todoId: string) => {
    setDraggedTodo(todoId);
  }, []);

  // end dragging
  const handleDragEnd = useCallback(() => {
    setDraggedTodo(null);
    setDragOverColumn(null);
  }, []);

  // while dragging over a column
  const handleDragOver = useCallback(
    (e: React.DragEvent, status: TodoStatus) => {
      e.preventDefault();
      setDragOverColumn(status);
    },
    []
  );

  // when leaving a column
  const handleDragLeave = useCallback(() => {
    setDragOverColumn(null);
  }, []);

  // on drop event
  const handleDrop = useCallback(
    (
      e: React.DragEvent,
      status: TodoStatus,
      onDrop: (todoId: string, status: TodoStatus) => void
    ) => {
      e.preventDefault();
      if (draggedTodo) {
        onDrop(draggedTodo, status);
      }
      setDraggedTodo(null);
      setDragOverColumn(null);
    },
    [draggedTodo]
  );

  return {
    draggedTodo,
    dragOverColumn,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};
