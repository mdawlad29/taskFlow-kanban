import { useState } from "react";
import { AddTodoModal } from "../../modal/AddTodoModal";
import { useTodos } from "../../hooks/useTodos";
import { useContextMenu } from "../../hooks/useContextMenu";
import { TodoStatus } from "../../types/todo";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { ColumnCard } from "../../shared/Card";

const Column = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { todos, addTodo, moveTodo, getTodosByStatus } = useTodos();

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
    const todo = todos.find((t) => t.id === todoId);

    if (todo && todo.status !== newStatus) {
      if (newStatus === "ongoing") {
        moveTodo(todoId, newStatus);
      } else {
        moveTodo(todoId, newStatus);
      }
    }
  };

  return (
    <section className="container mx-auto px-4 mb-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <ColumnCard
          title="new task"
          status="new"
          todos={getTodosByStatus("new")}
          onAddTodo={() => setShowAddModal(true)}
          onContextMenu={showContextMenu}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => handleDragOver(e, "new")}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, "new", handleDropTodo)}
          draggedTodo={draggedTodo}
          dragOverColumn={dragOverColumn}
          onMoveTodo={handleMoveTodo}
        />

        <ColumnCard
          title="in progress"
          status="ongoing"
          todos={getTodosByStatus("ongoing")}
          onContextMenu={showContextMenu}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => handleDragOver(e, "ongoing")}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, "ongoing", handleDropTodo)}
          draggedTodo={draggedTodo}
          dragOverColumn={dragOverColumn}
          onMoveTodo={handleMoveTodo}
        />

        <ColumnCard
          title="completed"
          status="done"
          todos={getTodosByStatus("done")}
          onContextMenu={showContextMenu}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => handleDragOver(e, "done")}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, "done", handleDropTodo)}
          draggedTodo={draggedTodo}
          dragOverColumn={dragOverColumn}
          onMoveTodo={handleMoveTodo}
        />
      </div>

      <AddTodoModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addTodo}
      />
    </section>
  );
};

export default Column;
