import React from "react";
import { Plus } from "lucide-react";
import { Todo, TodoStatus } from "../../types/todo";
import { getColumnConfig } from "../../constants";
import { Empty } from "../Empty";
import { TodoListCard } from "./TodoListCard";

interface ColumnProps {
  title: string;
  todos?: Todo[];
  status: TodoStatus;
  onDragEnd: () => void;
  onAddTodo?: () => void;
  onDragLeave: () => void;
  draggedTodo: string | null;
  dragOverColumn: TodoStatus | null;
  onDrop: (e: React.DragEvent) => void;
  onDragStart: (todoId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  setShowViewModal: (todoId: string) => void;
  setShowEditModal: (todoId: string) => void;
  setShowDeleteModal: (todoId: string) => void;
  onMoveTodo: (todoId: string, newStatus: TodoStatus) => void;
  onContextMenu: (e: React.MouseEvent, todoId: string) => void;
}

export const ColumnCard = ({
  title,
  todos,
  status,
  onDrop,
  onAddTodo,
  onDragEnd,
  onDragOver,
  onMoveTodo,
  onDragStart,
  draggedTodo,
  onDragLeave,
  onContextMenu,
  dragOverColumn,
  setShowViewModal,
  setShowEditModal,
  setShowDeleteModal,
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
              title="Add new task"
              className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <Plus size={20} />
            </button>
          )}
        </div>
      </div>

      {/*<--- Body --->  */}
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`
    flex-1 bg-gray-50 rounded-b-lg border-x-2 border-b-2
    transition-all duration-200 ${config.borderColor} 
    ${isDragOver ? "border-gray-400 bg-gray-100" : ""}
    `}
      >
        <div className="h-96 overflow-y-auto p-3">
          {todos?.length === 0 ? (
            <Empty status={status} />
          ) : (
            todos?.map((todo) => (
              <TodoListCard
                todo={todo}
                key={todo.id}
                onMove={onMoveTodo}
                onDragEnd={onDragEnd}
                setShowViewModal={setShowViewModal}
                setShowEditModal={setShowEditModal}
                isDragging={draggedTodo === todo.id}
                setShowDeleteModal={setShowDeleteModal}
                onDragStart={() => onDragStart(todo.id)}
                onContextMenu={(e) => onContextMenu(e, todo.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
