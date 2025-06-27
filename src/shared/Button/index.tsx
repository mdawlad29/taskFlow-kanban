export const Button = ({
  type,
  title,
  onClick,
  className,
}: {
  title: string;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      type={type ?? "submit"}
      className={`${className} flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium`}
    >
      {title}
    </button>
  );
};
