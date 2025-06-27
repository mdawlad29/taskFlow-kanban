import React from "react";
import { Eye } from "lucide-react";
import { Todo, TodoStatus } from "../../types/todo";
import { ModalHeader } from "../ModalHeader";
import { getStatusTodoCardConfig } from "../../constants";
import { SelectField } from "../../shared/SelectField";

interface TodoViewModalProps {
  isOpen: boolean;
  todo: Todo | null;
  onClose: () => void;
  onStatusChange: (id: string, status: TodoStatus) => void;
}

const TodoViewModal: React.FC<TodoViewModalProps> = ({
  todo,
  isOpen,
  onClose,
  onStatusChange,
}) => {
  if (!isOpen || !todo) return null;
  const statusConfig = getStatusTodoCardConfig(todo.status);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as TodoStatus;
    onStatusChange(todo.id, newStatus);
    onClose();
  };

  console.log("todo", todo);

  return (
    <div className="fixed inset-0 bg-black/60 drop-shadow flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <ModalHeader
          title={"view task"}
          onClose={onClose}
          iconBgColor={statusConfig.bgColor}
          icon={<Eye size={24} className={`text-gray-600`} />}
        />

        {/* Content */}
        <div className="px-4 py-3">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-gray-900 font-semibold">Title</h3>
            <div className="flex gap-2 items-center">
              <h4 className="text-gray-900 font-semibold text-sm">
                Change Status:
              </h4>
              <SelectField todo={todo} onChange={handleStatusChange} />
            </div>
          </div>

          <p className="text-gray-700 mb-3">{todo?.title}</p>

          <div>
            <h3 className="text-gray-900 font-semibold">Description</h3>
            <p className="text-gray-700 text-justify">{todo?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoViewModal;
