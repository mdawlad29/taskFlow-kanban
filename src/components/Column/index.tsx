import { useState } from "react";
import Card from "../../shared/Card";
import { AddTodoModal } from "../../modal/AddTodoModal";
import { useTodos } from "../../hooks/useTodos";

const Column = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { addTodo } = useTodos();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <Card
          title="new task"
          status="new"
          todos={[]}
          onAddTodo={() => setShowAddModal(true)}
        />
        <Card title="in progress" status="ongoing" todos={[]} />
        <Card title="completed" status="done" todos={[]} />
      </div>

      <AddTodoModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addTodo}
      />
    </>
  );
};

export default Column;
