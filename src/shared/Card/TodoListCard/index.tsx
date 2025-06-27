import { Calendar, Eye } from "lucide-react";
import { Todo, TodoStatus } from "../../../types/todo";
import { getStatusTodoCardConfig } from "../../../constants";
import { SelectField } from "../../SelectField";

interface TodoCardProps {
  todo: Todo;
  isDragging: boolean;
  onDragEnd: () => void;
  onDragStart: () => void;
  setShowViewModal: (todoId: string) => void;
  onContextMenu: (e: React.MouseEvent) => void;
  onMove: (todoId: string, newStatus: TodoStatus) => void;
}

export const TodoListCard: React.FC<TodoCardProps> = ({
  todo,
  onMove,
  onDragEnd,
  isDragging,
  onDragStart,
  onContextMenu,
  setShowViewModal,
}) => {
  const statusConfig = getStatusTodoCardConfig(todo.status);

  const isTitleTruncated = todo.title.length > 35;
  const isDescriptionTruncated = todo.description.length > 80;
  const showEye = isTitleTruncated || isDescriptionTruncated;

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
      draggable
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onContextMenu={onContextMenu}
      className={`
        group relative bg-white rounded-lg shadow px-4 py-2 mb-3 last-of-type:mb-0 cursor-move select-none
        transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 overflow-hidden
        ${statusConfig.bgColor}
        ${isDragging ? "opacity-50 shadow-lg scale-105" : ""}
      `}
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
      <SelectField
        todo={todo}
        onChange={handleStatusChange}
        className={`rounded-bl-[40px] text-center text-sm cursor-pointer absolute top-0 right-0`}
      />

      {/*<--- Content --->*/}
      <div className="ml-4">
        <h3 className="font-semibold text-gray-900 mb-1 mt-5 group-hover:text-gray-700 transition-colors">
          {todo.title?.slice(0, 35) + (todo.title?.length > 35 ? "..." : "")}
        </h3>

        <p className="text-gray-600 text-sm mb-2 leading-relaxed">
          {todo.description?.slice(0, 80) +
            (todo.description?.length > 80 ? "..." : "")}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar size={12} />
            <span>Created {todo.createdAt.toLocaleDateString()}</span>
          </div>

          {showEye && (
            <Eye
              size={18}
              onClick={() => setShowViewModal(todo.id)}
              className="text-gray-600 cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
};
