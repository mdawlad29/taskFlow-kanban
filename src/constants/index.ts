import { TodoStatus } from "../types/todo";

export const getColumnConfig = (status: TodoStatus) => {
  switch (status) {
    case "new":
      return {
        headerBg: "bg-gradient-to-r from-blue-500 to-blue-600",
        borderColor: "border-blue-200",
        emptyStateColor: "text-blue-400",
      };
    case "ongoing":
      return {
        headerBg: "bg-gradient-to-r from-orange-500 to-orange-600",
        borderColor: "border-orange-200",
        emptyStateColor: "text-orange-400",
      };
    case "done":
      return {
        headerBg: "bg-gradient-to-r from-green-500 to-green-600",
        borderColor: "border-green-200",
        emptyStateColor: "text-green-400",
      };
  }
};
