import React, { useState, useEffect } from "react";
import { SquarePen } from "lucide-react";
import { ModalHeader } from "../ModalHeader";
import { Todo } from "../../types/todo";
import { getStatusTodoCardConfig } from "../../constants";
import { ModalLayout } from "../ModalLayout";
import { Button } from "../../shared/Button";

interface EditTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo: Todo | null;
  onUpdate: (id: string, title: string, description: string) => void;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({
  isOpen,
  onClose,
  todo,
  onUpdate,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
    }
  }, [todo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo && title.trim() && description.trim()) {
      onUpdate(todo.id, title.trim(), description.trim());
      onClose();
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    onClose();
  };

  if (!isOpen || !todo) return null;
  const statusConfig = getStatusTodoCardConfig(todo.status);

  return (
    <ModalLayout>
      <ModalHeader
        title="Edit Task"
        onClose={handleClose}
        iconBgColor={statusConfig.bgColor}
        icon={<SquarePen size={20} className="text-gray-600" />}
      />

      <form onSubmit={handleSubmit} className="p-3">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Task Title
          </label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-sm w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="Edit task title..."
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Description
          </label>

          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="text-sm w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-transparent transition-all resize-none focus:outline-none"
            placeholder="Edit task description..."
          />
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            title="Cancel"
            onClick={handleClose}
            className="!text-gray-600 !bg-gray-100 hover:!bg-gray-200"
          />
          <Button type="submit" title="Updated Task" />
        </div>
      </form>
    </ModalLayout>
  );
};

export default EditTodoModal;
