import { useContext } from "react";
import Alert from "../components/Alert";
import { AlertContext } from "../context/AlertContext";

const Header = ({ pageName, titleClassName = "" }) => {
    const { alert, showAlert, clearAlert } = useContext(AlertContext);
    return (
        <>
            <h1
                className={`text-2xl font-bold text-gray-800 mb-6 ${titleClassName}`}
            >
                {pageName}
            </h1>
            {alert && (
                <Alert messaggio={alert.messaggio} isError={alert.isError} />
            )}
        </>
    );
};

export default Header;
