import { Plus } from "lucide-react";
import { Todo, TodoStatus } from "../../types/todo";
import { getColumnConfig } from "../../constants";

interface ColumnProps {
  title: string;
  status: TodoStatus;
  todos?: Todo[];
  onAddTodo?: () => void;
}

const Card = ({ title, status, todos, onAddTodo }: ColumnProps) => {
  const config = getColumnConfig(status);
  const canAddTodo = status === "new";

  return (
    <div className="flex flex-col h-full">
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
          flex-1 bg-gray-50 p-4 rounded-b-lg border-2 min-h-96
          transition-all duration-200 overflow-y-auto 
          ${config.borderColor}
        `}
      >
        <div className="flex flex-col items-center justify-center h-32 text-center">
          <div className={`text-4xl mb-2 ${config.emptyStateColor}`}>
            {status === "new" ? "📝" : status === "ongoing" ? "⚡" : "✅"}
          </div>

          <p className={`${config.emptyStateColor} font-medium`}>
            {status === "new"
              ? "Add your first task"
              : status === "ongoing"
              ? "No tasks in progress"
              : "No completed tasks yet"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
