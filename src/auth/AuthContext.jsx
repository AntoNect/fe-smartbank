import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState(
        localStorage.getItem("username") || null
    );
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [isContoAttivo, setContoAttivo] = useState(
        localStorage.getItem("contoAttivo") === "true"
    );

    // Funzione per salvare in sessione i dati dell'utente:
    //  • username • token • conto attivo
    const login = (username, token, isContoAttivo) => {
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
        localStorage.setItem("contoAttivo", isContoAttivo);
        setUsername(username);
        setToken(token);
        setContoAttivo(isContoAttivo);
    };

    // Funzione per rimuovere dalla sessione i dati dell'utente:
    //  • username • token • conto attivo
    const logout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        localStorage.removeItem("contoAttivo");
        setUsername(null);
        setToken(null);
        setContoAttivo(false);
    };

    // Funzione per aggiornare il valore del conto attivo
    const updateContoAttivo = (isContoAttivo) => {
        localStorage.setItem("contoAttivo", isContoAttivo);
        setContoAttivo(isContoAttivo);
    };

    return (
        <AuthContext.Provider
            value={{
                username,
                token,
                isContoAttivo,
                login,
                logout,
                updateContoAttivo,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
