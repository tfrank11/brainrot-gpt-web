import { Alert } from "@react95/core";
import React, { createContext, useCallback, useContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const AlertContext = createContext({
  message: "",
  setMessage: (v: string) => {},
  isOpen: false,
  setIsOpen: (v: boolean) => {},
});

const AlertProvider: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <AlertContext.Provider value={{ message, setMessage, isOpen, setIsOpen }}>
      {isOpen && (
        <Alert
          className="z-50 w-48"
          title="Error"
          message={message}
          buttons={[
            {
              value: "Ok",
              onClick: () => {
                setIsOpen(false);
              },
            },
          ]}
        />
      )}
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  const { setIsOpen, setMessage } = useContext(AlertContext);
  const alert = useCallback((message: string) => {
    setMessage(message);
    setIsOpen(true);
  }, []);

  return { alert };
};

export default AlertProvider;
