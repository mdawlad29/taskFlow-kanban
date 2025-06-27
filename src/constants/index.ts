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

export const getStatusTodoCardConfig = (status: string) => {
  switch (status) {
    case "new":
      return {
        bgColor: "bg-blue-50 border-blue-200",
        labelColor: "bg-blue-100 text-blue-800",
        label: "New",
      };
    case "ongoing":
      return {
        bgColor: "bg-orange-50 border-orange-200",
        labelColor: "bg-orange-100 text-orange-800",
        label: "Ongoing",
      };
    case "done":
      return {
        bgColor: "bg-green-50 border-green-200",
        labelColor: "bg-green-100 text-green-800",
        label: "Done",
      };
    default:
      return {
        bgColor: "bg-gray-50 border-gray-200",
        labelColor: "bg-gray-100 text-gray-800",
        label: "Unknown",
      };
  }
};
