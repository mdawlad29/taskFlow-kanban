import React from "react";
import { Todo } from "../../types/todo";
import { ModalLayout } from "../ModalLayout";

interface ConfirmationModalProps {
  isOpen: boolean;
  todo: Todo | null;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  todo,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !todo) return null;

  return (
    <ModalLayout>
      <div className="p-4 max-w-sm mx-auto bg-white rounded ">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Confirm Delete
        </h2>

        <p className="mb-6">
          Are you sure you want to delete the task <strong>{todo.title}</strong>
          ?
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default ConfirmationModal;
