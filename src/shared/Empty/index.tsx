import { getColumnConfig } from "../../constants";
import { TodoStatus } from "../../types/todo";

export const Empty = ({ status }: { status: TodoStatus }) => {
  const config = getColumnConfig(status);
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
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
  );
};
