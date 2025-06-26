import { Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="text-center mt-12 text-gray-500">
      <div className="flex items-center justify-center gap-2">
        <Zap size={16} />
        <span>
          Right-click on tasks to move them • Drag and drop between columns •
          Use action buttons for quick moves
        </span>
      </div>
    </footer>
  );
};

export default Footer;
