import { Calendar } from "lucide-react";
import { Todo, TodoStatus } from "../../../types/todo";
import { getStatusTodoCardConfig } from "../../../constants";

interface TodoCardProps {
  todo: Todo;
  onContextMenu: (e: React.MouseEvent) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  isDragging: boolean;
  onMove: (todoId: string, newStatus: TodoStatus) => void;
}

export const TodoListCard: React.FC<TodoCardProps> = ({
  todo,
  onContextMenu,
  onDragStart,
  onDragEnd,
  isDragging,
  onMove,
}) => {
  const statusConfig = getStatusTodoCardConfig(todo.status);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as TodoStatus;

    if (newStatus === "ongoing") {
      onMove(todo.id, newStatus);
    } else {
      onMove(todo.id, newStatus);
    }
  };

  return (
    <div
      className={`
        group relative bg-white rounded-lg shadow px-4 py-2 mb-3 last-of-type:mb-0 cursor-move select-none
        transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 overflow-hidden
        ${statusConfig.bgColor}
        ${isDragging ? "opacity-50 shadow-lg scale-105" : ""}
      `}
      draggable
      onContextMenu={onContextMenu}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {/*<--- Status Label --->*/}
      <div
        className={`
      absolute top-0 left-0 h-full w-5 flex items-center justify-center
      ${statusConfig.bgColor} ${statusConfig.labelColor}
      
    `}
      >
        <p className="rotate-90 tracking-widest text-[10px] font-semibold">
          {statusConfig.label}
        </p>
      </div>

      {/*<--- Status Selector --->  */}
      <select
        value={todo.status}
        onChange={handleStatusChange}
        className={`border-none rounded-bl-[40px] w-24 text-center ${statusConfig.labelColor} py-0.5 text-sm cursor-pointer absolute top-0 right-0`}
      >
        <option disabled={todo.status === "new"} value="new">
          Pending
        </option>
        <option disabled={todo.status === "ongoing"} value="ongoing">
          Process
        </option>
        <option disabled={todo.status === "done"} value="done">
          Complete
        </option>
      </select>

      {/*<--- Content --->*/}
      <div className="ml-4">
        <h3 className="font-semibold text-gray-900 mb-1 mt-5 group-hover:text-gray-700 transition-colors">
          {todo.title?.slice(0, 35) + (todo.title?.length > 35 ? "..." : "")}
        </h3>

        <p className="text-gray-600 text-sm mb-2 leading-relaxed">
          {todo.description?.slice(0, 80) +
            (todo.description?.length > 80 ? "..." : "")}
        </p>

        <div className="flex items-center gap-1 text-[10px] text-gray-400">
          <Calendar size={10} />
          <span>Created {todo.createdAt.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};
