import { useState } from "react";
import { useTodos } from "../../hooks/useTodos";
import { useContextMenu } from "../../hooks/useContextMenu";
import { TodoStatus } from "../../types/todo";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { ColumnCard } from "../../shared/Card";
import AddTodoModal from "../../modal/AddTodoModal";
import TodoViewModal from "../../modal/TodoViewModal";

const Column = () => {
  const { showContextMenu } = useContextMenu();

  const [showAddModal, setShowAddModal] = useState(false);
  const { todos, addTodo, moveTodo, getTodosByStatus } = useTodos();
  const [showViewModal, setShowViewModal] = useState<string | null>(null);

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
            onAddTodo={() => setShowAddModal(true)}
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

      {/*<--- View Todo Modal --->*/}
      <TodoViewModal
        isOpen={!!showViewModal}
        onStatusChange={moveTodo}
        onClose={() => setShowViewModal(null)}
        todo={todos.find((t) => t.id === showViewModal) || null}
      />
    </>
  );
};

export default Column;
