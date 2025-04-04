import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiSignup } from "../api/beApi";
import AuthContext from "../auth/AuthContext";
import Header from "../components/Header";
import { AlertContext } from "../context/AlertContext";

const Signup = () => {
    const navigate = useNavigate();
    const { login, token } = useContext(AuthContext);

    useEffect(() => {
        // Utente già loggato -> Reindirizzo alla dashboard
        if (token) {
            navigate("/dashboard");
        }
    }, [token, navigate]);

    const [loading, setLoading] = useState(false);
    const { showAlert, clearAlert } = useContext(AlertContext);

    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        rePasssord: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearAlert();

        if (formData.password != formData.rePasssord) {
            showAlert("Le due password non coincidono", true);
            return;
        }

        setLoading(true);
        try {
            await apiSignup(
                formData.email,
                formData.username,
                formData.password
            );
            showAlert("Registrazione avvenuto con succcesso", false);
            setFormData({
                email: "",
                username: "",
                password: "",
                rePasssord: "",
            });
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
        <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8 relative">
            <div className="w-full max-w-md">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        alt="SmartBank"
                    />
                    <Header
                        pageName="Registrati"
                        titleClassName="text-center"
                    />
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
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            autoComplete="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="Inserisci la tua mail"
                                            className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-700 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Username
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
                                            placeholder="Inserisci il tuo username"
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
                                            placeholder="Scegli la tua password"
                                            className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-700 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="rePasssord"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Conferma Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            type="password"
                                            name="rePasssord"
                                            id="rePasssord"
                                            autoComplete="current-password"
                                            value={formData.rePasssord}
                                            onChange={handleChange}
                                            required
                                            placeholder="Renserisci la tua password"
                                            className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-700 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-gray-900 hover:bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-offset-2 cursor-pointer"
                                    >
                                        REGISTRATI
                                    </button>
                                </div>
                            </>
                        )}
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Sei già nostro cliente?{" "}
                        <a
                            href="/login"
                            className="font-semibold text-gray-900 hover:text-gray-700"
                        >
                            Accedi
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
