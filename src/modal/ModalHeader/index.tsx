import { X } from "lucide-react";

export const ModalHeader = ({
  icon,
  title,
  onClose,
  iconBgColor,
}: {
  title?: string;
  onClose: () => void;
  iconBgColor?: string;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <div className={`${iconBgColor} p-2 rounded-full`}>{icon}</div>

        <h2 className="text-xl font-semibold text-gray-900 capitalize">
          {title}
        </h2>
      </div>

      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X size={24} />
      </button>
    </div>
  );
};
