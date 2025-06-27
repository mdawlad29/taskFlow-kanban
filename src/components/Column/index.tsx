import { useState } from "react";
import { useTodos } from "../../hooks/useTodos";
import { useContextMenu } from "../../hooks/useContextMenu";
import { TodoStatus } from "../../types/todo";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import AddTodoModal from "../../modal/AddTodoModal";
import TodoViewModal from "../../modal/TodoViewModal";
import EditTodoModal from "../../modal/EditTodoModal";
import ConfirmationModal from "../../modal/ConfirmationModal";
import { ColumnCard } from "../Card";

const Column = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<string | null>(null);
  const [showViewModal, setShowViewModal] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  const { todos, addTodo, moveTodo, deleteTodo, updateTodo, getTodosByStatus } =
    useTodos();

  const { showContextMenu } = useContextMenu();
  const {
    draggedTodo,
    dragOverColumn,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useDragAndDrop();

  const handleMoveTodo = (todoId: string, newStatus: TodoStatus) => {
    moveTodo(todoId, newStatus);
  };

  const handleDropTodo = (todoId: string, newStatus: TodoStatus) => {
    const todo = todos?.find((t) => t?.id === todoId);

    if (todo && todo?.status !== newStatus) {
      if (newStatus === "ongoing") {
        moveTodo(todoId, newStatus);
      } else {
        moveTodo(todoId, newStatus);
      }
    }
  };

  const handleConfirmDelete = () => {
    if (showDeleteModal) {
      deleteTodo(showDeleteModal);
      setShowDeleteModal(null);
    }
  };

  return (
    <>
      <section className="container mx-auto px-4 mb-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          <ColumnCard
            status="new"
            title="new task"
            onDragEnd={handleDragEnd}
            draggedTodo={draggedTodo}
            onMoveTodo={handleMoveTodo}
            onDragStart={handleDragStart}
            onDragLeave={handleDragLeave}
            todos={getTodosByStatus("new")}
            onContextMenu={showContextMenu}
            dragOverColumn={dragOverColumn}
            setShowViewModal={setShowViewModal}
            setShowEditModal={setShowEditModal}
            onAddTodo={() => setShowAddModal(true)}
            setShowDeleteModal={setShowDeleteModal}
            onDragOver={(e) => handleDragOver(e, "new")}
            onDrop={(e) => handleDrop(e, "new", handleDropTodo)}
          />

          <ColumnCard
            status="ongoing"
            title="in progress"
            onDragEnd={handleDragEnd}
            draggedTodo={draggedTodo}
            onMoveTodo={handleMoveTodo}
            onDragStart={handleDragStart}
            onDragLeave={handleDragLeave}
            onContextMenu={showContextMenu}
            dragOverColumn={dragOverColumn}
            todos={getTodosByStatus("ongoing")}
            setShowViewModal={setShowViewModal}
            setShowEditModal={setShowEditModal}
            setShowDeleteModal={setShowDeleteModal}
            onDragOver={(e) => handleDragOver(e, "ongoing")}
            onDrop={(e) => handleDrop(e, "ongoing", handleDropTodo)}
          />

          <ColumnCard
            status="done"
            title="completed"
            onDragEnd={handleDragEnd}
            draggedTodo={draggedTodo}
            onMoveTodo={handleMoveTodo}
            onDragStart={handleDragStart}
            onDragLeave={handleDragLeave}
            onContextMenu={showContextMenu}
            dragOverColumn={dragOverColumn}
            todos={getTodosByStatus("done")}
            setShowViewModal={setShowViewModal}
            setShowEditModal={setShowEditModal}
            setShowDeleteModal={setShowDeleteModal}
            onDragOver={(e) => handleDragOver(e, "done")}
            onDrop={(e) => handleDrop(e, "done", handleDropTodo)}
          />
        </div>
      </section>

      {/*<--- Add Todo Modal --->*/}
      <AddTodoModal
        onAdd={addTodo}
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />

      {/*<--- Edit Todo Modal --->*/}
      <EditTodoModal
        onUpdate={updateTodo}
        isOpen={showEditModal !== null}
        onClose={() => setShowEditModal(null)}
        todo={todos.find((t) => t.id === showEditModal) || null}
      />

      {/*<--- View Todo Modal --->*/}
      <TodoViewModal
        isOpen={!!showViewModal}
        onStatusChange={moveTodo}
        onClose={() => setShowViewModal(null)}
        todo={todos.find((t) => t.id === showViewModal) || null}
      />

      {/*<--- Confirmation Modal --->*/}
      <ConfirmationModal
        todo={todos.find((t) => t.id === showDeleteModal) || null}
        isOpen={!!showDeleteModal}
        onClose={() => setShowDeleteModal(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default Column;
