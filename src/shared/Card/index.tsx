import React from "react";
import { Plus } from "lucide-react";
import { Todo, TodoStatus } from "../../types/todo";
import { getColumnConfig } from "../../constants";
import { Empty } from "../Empty";
import { TodoListCard } from "./TodoListCard";

interface ColumnProps {
  title: string;
  status: TodoStatus;
  todos?: Todo[];
  onAddTodo?: () => void;
  onContextMenu: (e: React.MouseEvent, todoId: string) => void;
  onDragStart: (todoId: string) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  draggedTodo: string | null;
  dragOverColumn: TodoStatus | null;
  onMoveTodo: (todoId: string, newStatus: TodoStatus) => void;
}

export const ColumnCard = ({
  title,
  status,
  todos,
  onAddTodo,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
  draggedTodo,
  dragOverColumn,
  onMoveTodo,
  onContextMenu,
}: ColumnProps) => {
  const config = getColumnConfig(status);
  const isDragOver = dragOverColumn === status;
  const canAddTodo = status === "new";

  return (
    <div>
      {/*<--- Header --->*/}
      <div
        className={`${config.headerBg} text-white p-4 rounded-t-lg shadow-sm`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold capitalize">{title}</h2>
            <p className="text-sm opacity-90">{todos?.length} tasks</p>
          </div>

          {canAddTodo && onAddTodo && (
            <button
              onClick={onAddTodo}
              className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
              title="Add new task"
            >
              <Plus size={20} />
            </button>
          )}
        </div>
      </div>

      {/*<--- Body --->  */}
      <div
        className={`
    flex-1 bg-gray-50 rounded-b-lg border-x-2 border-b-2
    transition-all duration-200 ${config.borderColor} 
    ${isDragOver ? "border-gray-400 bg-gray-100" : ""}
    `}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="h-96 overflow-y-auto p-3">
          {todos?.length === 0 ? (
            <Empty status={status} />
          ) : (
            todos?.map((todo) => (
              <TodoListCard
                key={todo.id}
                todo={todo}
                onContextMenu={(e) => onContextMenu(e, todo.id)}
                onDragStart={() => onDragStart(todo.id)}
                onDragEnd={onDragEnd}
                isDragging={draggedTodo === todo.id}
                onMove={onMoveTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
