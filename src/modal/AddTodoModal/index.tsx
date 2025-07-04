import React, { useState } from "react";
import { Plus } from "lucide-react";
import { ModalHeader } from "../ModalHeader";
import { ModalLayout } from "../ModalLayout";
import { Button } from "../../shared/Button";

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string, description: string) => void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({
  onAdd,
  isOpen,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() && description.trim()) {
      onAdd(title.trim(), description.trim());
      setTitle("");
      setDescription("");
      onClose();
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalLayout>
      <ModalHeader
        title={"add new task"}
        onClose={handleClose}
        icon={<Plus size={20} className="text-blue-600" />}
        iconBgColor="!bg-blue-100"
      />

      {/*<--- Form --->*/}
      <form onSubmit={handleSubmit} className="p-3">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Task Title *
          </label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-sm w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter task title..."
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Description *
          </label>

          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="text-sm w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all resize-none focus:outline-none"
            placeholder="Describe your task in detail..."
            required
          />
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            title="Cancel"
            onClick={handleClose}
            className="!text-gray-600 !bg-gray-100 hover:!bg-gray-200"
          />

          <Button
            type="submit"
            title="Add Task"
            className="!bg-blue-600 hover:!bg-blue-700 !text-white "
          />
        </div>
      </form>
    </ModalLayout>
  );
};

export default AddTodoModal;
