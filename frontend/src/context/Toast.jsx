import "./Toast.css";
import { createContext, useContext, useState } from "react";

const Toast = ({ message, onClose }) => {
  return (
    <div onClick={onClose} className="toast">
      {message}
    </div>
  );
};

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: "", visible: false });

  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 2000);
  };

  const handleClose = () => {
    setToast({ message: "", visible: false });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && <Toast message={toast.message} onClose={handleClose} />}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
