import { Alert } from "@react95/core";
import React, { createContext, useCallback, useContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface IAlertContext {
  message: string;
  setMessage: (v: string) => void;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

const AlertContext = createContext<IAlertContext>({
  message: "",
  setMessage: () => {},
  isOpen: false,
  setIsOpen: () => {},
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
  const alert = useCallback(
    (message: string) => {
      setMessage(message);
      setIsOpen(true);
    },
    [setIsOpen, setMessage]
  );

  return { alert };
};

export default AlertProvider;
