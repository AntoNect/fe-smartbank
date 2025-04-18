import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiLogin } from "../api/beApi";
import AuthContext from "../auth/AuthContext";
import Header from "../components/Header";
import { AlertContext } from "../context/AlertContext";

const Login = () => {
    const navigate = useNavigate();
    const { login, token, isContoAttivo } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const { showAlert, clearAlert } = useContext(AlertContext);

    useEffect(() => {
        clearAlert();

        // Utente già loggato -> Reindirizzo alla dashboard se il conto è attivo, altrimenti alla compilazione del prifilo
        if (token) {
            if (isContoAttivo) navigate("/dashboard");
            else navigate("/profilo");
        }
    }, [token, navigate]);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearAlert();
        setLoading(true);
        try {
            const response = await apiLogin(
                formData.username,
                formData.password
            );
            login(response.username, response.token, response.contoAttivo);
        } catch (err) {
            if (err.response) showAlert(err.response.data.message, true);
            else showAlert(err.message, true);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12 lg:px-8 relative">
            <div className="fixed top-0 left-0 w-full bg-blue-50 border border-blue-200">
                <div className="container mx-auto px-4 py-3 flex items-center">
                    <div className="flex-shrink-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-6 w-6 text-blue-600"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-blue-800">
                            Project Work UniPegaso - De Filippis Antonio Pio -
                            Matr: 0312300708
                        </p>
                        <p className="text-sm text-blue-800"></p>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-md">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        alt="SmartBank"
                    />
                    <Header pageName="Accedi" titleClassName="text-center" />
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {loading ? (
                            <p className="text-gray-900 text-center mt-4">
                                Caricamento...
                            </p>
                        ) : (
                            <>
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Username o email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            autoComplete="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            required
                                            placeholder="Inserisci il tuo username o email"
                                            className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-700 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            autoComplete="current-password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            placeholder="Inserisci la tua password"
                                            className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-700 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-gray-900 hover:bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-offset-2 cursor-pointer"
                                    >
                                        ACCEDI
                                    </button>
                                </div>
                            </>
                        )}
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Non sei registrato?{" "}
                        <a
                            href="/signup"
                            className="font-semibold text-gray-900 hover:text-gray-700"
                        >
                            Registrati
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
