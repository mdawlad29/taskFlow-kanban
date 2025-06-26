import { CheckSquare } from "lucide-react";

const Header = () => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl">
          <CheckSquare size={32} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          TaskFlow Kanban
        </h1>
      </div>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        Organize your tasks efficiently with our beautiful Kanban board. Drag,
        drop, and manage your workflow seamlessly.
      </p>
    </header>
  );
};

export default Header;
