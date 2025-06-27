import { useState, useCallback, useEffect } from "react";
import { Todo, TodoStatus } from "../types/todo";

/**
 * Load todos from localStorage
 * and convert createdAt and movedAt strings back to Date objects
 */
const loadTodosFromStorage = (): Todo[] => {
  const saved = localStorage.getItem("todos");
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved) as Todo[];
    return parsed.map((todo) => ({
      ...todo,
      createdAt: new Date(todo.createdAt),
      movedAt: new Date(todo.movedAt),
    }));
  } catch {
    return [];
  }
};

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(loadTodosFromStorage);

  // whenever todos changes, persist to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //  Adds a new todo with status "new"
  const addTodo = useCallback((title: string, description: string) => {
    setTodos((prev) => [
      {
        id: Date.now().toString(),
        title,
        description,
        status: "new",
        createdAt: new Date(),
        movedAt: new Date(),
      },
      ...prev,
    ]);
  }, []);

  //  Changes the status of a todo and updates movedAt
  const moveTodo = useCallback((id: string, status: TodoStatus) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, status, movedAt: new Date() } : todo
      )
    );
  }, []);

  // inside useTodos
  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  // Updates the title and description of a todo
  const updateTodo = useCallback(
    (id: string, title: string, description: string) => {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, title, description } : todo
        )
      );
    },
    []
  );

  /**
   * Returns a list of todos for a given status,
   * sorted by most recently moved
   */
  const getTodosByStatus = useCallback(
    (status: TodoStatus) =>
      todos
        .filter((todo) => todo.status === status)
        .sort((a, b) => b.movedAt.getTime() - a.movedAt.getTime()),
    [todos]
  );

  // expose all methods and state
  return { todos, addTodo, moveTodo, updateTodo, deleteTodo, getTodosByStatus };
};
