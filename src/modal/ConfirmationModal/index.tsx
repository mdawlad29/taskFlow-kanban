import React from "react";
import { Todo } from "../../types/todo";
import { ModalLayout } from "../ModalLayout";
import { Button } from "../../shared/Button";
import { HelpCircle } from "lucide-react";

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
        <HelpCircle size={48} className="text-red-500 mb-4 mx-auto" />

        <p className="mb-6 text-center">
          <strong className="block text-2xl mb-2 text-green-600">
            Are you sure?
          </strong>{" "}
          You want to delete the task{" "}
          <span className="font-semibold">{todo?.title}</span>
        </p>

        <div className="flex gap-3">
          <Button
            type="button"
            title="Cancel"
            onClick={onClose}
            className="!text-gray-600 !bg-gray-100 hover:!bg-gray-200"
          />

          <Button
            type="button"
            title="Delete"
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 "
          />
        </div>
      </div>
    </ModalLayout>
  );
};

export default ConfirmationModal;
