import { getStatusTodoCardConfig } from "../../constants";
import { Todo } from "../../types/todo";

export const SelectField = ({
  todo,
  onChange,
  className,
}: {
  todo: Todo;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  const statusConfig = getStatusTodoCardConfig(todo.status);

  return (
    <select
      value={todo.status}
      onChange={onChange}
      className={`${className ?? ""} w-24 text-center ${
        statusConfig.labelColor
      } border-none px-2 py-0.5 rounded`}
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
  );
};
