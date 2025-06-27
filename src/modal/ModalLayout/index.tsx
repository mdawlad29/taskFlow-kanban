import React from "react";

export const ModalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};
