const Alert = ({ messaggio, isError = true, className = "" }) => {
    if (messaggio === null || messaggio === undefined || messaggio === "") {
        return null;
    }

    if (isError && messaggio == "Network Error") {
        messaggio = "Sessione scaduta, effettua nuovamente il login";
    }

    return (
        <div
            className={`${
                isError
                    ? "bg-red-100 border border-red-400 text-red-700"
                    : "bg-green-100 border border-green-400 text-green-700"
            } px-4 py-3 rounded relative mb-4 ${className}`}
            role="alert"
        >
            <span className="block sm:inline">{messaggio}</span>
        </div>
    );
};

export default Alert;
