import { useContext, useEffect, useState } from "react";
import { apiInsertBonifico } from "../api/beApi";
import AuthContext from "../auth/AuthContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { AlertContext } from "../context/AlertContext";

const Bonifico = () => {
    const { token } = useContext(AuthContext);
    const { alert, showAlert, clearAlert } = useContext(AlertContext);

    const [formData, setFormData] = useState({
        nomeBeneficiario: "",
        ibanBeneficiario: "",
        importo: 0,
        causale: "",
        istantaneo: false,
        dataAddebito: "",
    });

    useEffect(() => {
        const fetchPageBonifico = async () => {
            clearAlert();
        };

        fetchPageBonifico();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearAlert();
        try {
            const response = await apiInsertBonifico(
                formData.nomeBeneficiario,
                formData.ibanBeneficiario,
                formData.importo,
                formData.causale,
                formData.istantaneo,
                formData.dataAddebito,
                token
            );
            if (formData.istantaneo)
                showAlert("Bonifico eseguito correttamente", false);
            else showAlert("Bonifico registrato correttamente", false);
            setFormData({
                nomeBeneficiario: "",
                ibanBeneficiario: "",
                importo: 0,
                causale: "",
                istantaneo: false,
                dataAddebito: "",
            });
        } catch (err) {
            if (err.response) showAlert(err.response.data.message, true);
            else showAlert(err.message, true);
        }
    };

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        console.log(name, type, value, checked);
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow bg-gray-100">
                <div className="container mx-auto px-4 py-8">
                    <Header pageName="Inserisci bonifico" />

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white shadow-md rounded-lg p-6 space-y-6"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="sm:col-span-1">
                                <label
                                    htmlFor="nomeBeneficiario"
                                    className="block text-sm font-medium text-gray-900"
                                >
                                    Nome Beneficiario
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="nomeBeneficiario"
                                        name="nomeBeneficiario"
                                        placeholder="Nome del beneficiario"
                                        maxLength={100}
                                        value={formData.nomeBeneficiario}
                                        onChange={handleChange}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-700 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-1">
                                <label
                                    htmlFor="ibanBeneficiario"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    IBAN Beneficiario
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="ibanBeneficiario"
                                        name="ibanBeneficiario"
                                        placeholder="IT00X0000000000000000000000"
                                        maxLength={27}
                                        pattern="[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}"
                                        value={formData.ibanBeneficiario}
                                        onChange={handleChange}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-700 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-1">
                                <label
                                    htmlFor="importo"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Importo
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        id="importo"
                                        name="importo"
                                        placeholder="0.00"
                                        min="0"
                                        max="1000000"
                                        step="1.00"
                                        value={formData.importo}
                                        onChange={handleChange}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-700 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-1">
                            <label
                                htmlFor="causale"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Causale
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="causale"
                                    name="causale"
                                    placeholder="Causale del bonifico"
                                    rows="3"
                                    maxLength={250}
                                    value={formData.causale}
                                    onChange={handleChange}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-700 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-1 mt-4 flex items-center gap-6">
                            <div className="flex items-center">
                                <label
                                    htmlFor="istantaneo"
                                    className="block text-sm font-medium text-gray-700 mr-4"
                                >
                                    Bonifico Istantaneo
                                </label>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id="istantaneo"
                                        name="istantaneo"
                                        checked={formData.istantaneo}
                                        onChange={handleChange}
                                        className="sr-only peer block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-700 sm:text-sm"
                                    />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-white dark:peer-focus:gray-900 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-gray-900 dark:peer-checked:bg-gray-900"></div>
                                </label>
                            </div>

                            <div className="flex-1">
                                <label
                                    htmlFor="dataAddebito"
                                    className={`block text-sm font-medium text-gray-700 ${
                                        formData.istantaneo ? "opacity-50" : ""
                                    }`}
                                >
                                    Programma Bonifico
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="dataAddebito"
                                        type="date"
                                        name="dataAddebito"
                                        value={formData.dataAddebito}
                                        onChange={handleChange}
                                        disabled={formData.istantaneo}
                                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-700 sm:text-sm ${
                                            formData.istantaneo
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                        }`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6 gap-x-6">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700  "
                            >
                                Invia Bonifico
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Bonifico;
