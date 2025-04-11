import { useEffect } from "react";

type Props = {
  open: boolean;
  message: string;
  onClose: () => void;
};

const AlertDialog = ({ open, message, onClose }: Props) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 max-w-[350px] w-full">
      <div className="animate-slide-in bg-[#111111] w-full max-w-sm p-4 rounded-md border border-white/10 shadow-lg flex items-center justify-between relative slideOut">
        <p className="text-gray-100 text-sm">{message}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="text-sky-100 hover:text-sky-200 text-sm px-3 py-1.5 rounded-md transition-colors absolute top-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#dff2fe"
              className="cursor-pointer"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
