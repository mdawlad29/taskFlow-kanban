import { useState, useCallback } from "react";
import { Todo } from "../types/todo";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = useCallback((title: string, description: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      description,
      status: "new",
      createdAt: new Date(),
      movedAt: new Date(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  }, []);

  return {
    todos,
    addTodo,
  };
};
