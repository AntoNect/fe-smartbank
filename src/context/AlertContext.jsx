import { createContext, useState } from "react";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({
        messaggio: null,
        isError: false,
    });

    const showAlert = (messaggio, isError = false) => {
        setAlert({ messaggio, isError });
    };

    const clearAlert = () => {
        setAlert({ messaggio: null, isError: false });
    };

    return (
        <AlertContext.Provider value={{ alert, showAlert, clearAlert }}>
            {children}
        </AlertContext.Provider>
    );
};
