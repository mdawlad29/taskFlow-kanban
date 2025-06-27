import { Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="text-center text-gray-500 md:text-sm text-xs py-5">
      <div className="flex items-center justify-center gap-2">
        <Zap size={16} />
        <span>
          Add button click to task create • Drag and drop between columns • Use
          action buttons for quick moves
        </span>
      </div>
    </footer>
  );
};

export default Footer;
