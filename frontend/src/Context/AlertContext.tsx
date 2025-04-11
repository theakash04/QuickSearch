import { createContext, useContext, useState } from "react";
import AlertDialog from "../components/AlertDialog";

const AlertContext = createContext({
  show: (_msg: string) => {},
});

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const show = (msg: string) => {
    setMessage(msg);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <AlertContext.Provider value={{ show }}>
      {children}
      <AlertDialog open={open} message={message} onClose={handleClose} />
    </AlertContext.Provider>
  );
};
