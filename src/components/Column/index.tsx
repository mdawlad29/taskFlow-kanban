import Card from "../../shared/Card";

const Column = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
      <Card title="new task" status="new" todos={[]} />
      <Card title="in progress" status="ongoing" todos={[]} />
      <Card title="completed" status="done" todos={[]} />
    </div>
  );
};

export default Column;
