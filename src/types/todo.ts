export interface Todo {
  id: string;
  title: string;
  description: string;
  status: "new" | "ongoing" | "done";
  createdAt: Date;
  movedAt: Date;
}

export type TodoStatus = "new" | "ongoing" | "done";

export interface ContextMenuPosition {
  x: number;
  y: number;
  todoId: string;
}
