import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    apiCreateProfilo,
    apiGetCoordinateBancarie,
    apiGetProfilo,
    apiUpdateProfilo,
} from "../api/beApi";
import AuthContext from "../auth/AuthContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { AlertContext } from "../context/AlertContext";

const Profilo = () => {
    const navigate = useNavigate();
    const { token, isContoAttivo, updateContoAttivo } = useContext(AuthContext);
    const { showAlert, clearAlert } = useContext(AlertContext);
    const [formData, setFormData] = useState({
        nome: "",
        cognome: "",
        codiceFiscale: "",
        telefono: "",
        indirizzoResidenza: "",
        cittaResidenza: "",
        dataNascita: "",
    });
    const [coordinateData, setCoordinateData] = useState({
        iban: "",
        codNazionale: "",
        cinEuropeo: "",
        cin: "",
        abi: "",
        cab: "",
        numConto: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPageProfilo = async () => {
            if (isContoAttivo) {
                setLoading(true);
                clearAlert();
                try {
                    const response = await apiGetProfilo(token);
                    if (response && response.data) {
                        setFormData(response.data);
                    }
                    const responseCoordinate = await apiGetCoordinateBancarie(
                        token
                    );
                    if (responseCoordinate && responseCoordinate.data) {
                        setCoordinateData(responseCoordinate.data);
                    }
                } catch (err) {
                    if (err.response) showAlert(err.response.data, true);
                    else showAlert(err.message, true);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchPageProfilo();
    }, [token, isContoAttivo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearAlert();
        setLoading(true);
        try {
            if (isContoAttivo) {
                const response = await apiUpdateProfilo(
                    formData.telefono,
                    formData.indirizzoResidenza,
                    1,
                    formData.dataNascita,
                    token
                );
                if (response.status === 200) {
                    showAlert("Profilo aggiornato con successo!", false);
                } else {
                    showAlert(
                        "Si è verificato un errore durante l'aggiornamneot del profilo",
                        true
                    );
                }
                showAlert("Profilo aggiornato con successo!", false);
            } else {
                const response = await apiCreateProfilo(
                    formData.nome,
                    formData.cognome,
                    formData.codiceFiscale,
                    formData.telefono,
                    formData.indirizzoResidenza,
                    1,
                    formData.dataNascita,
                    token
                );
                if (response.status === 200) {
                    updateContoAttivo(true);
                    navigate("/dashboard");
                } else {
                    showAlert(
                        "Si è verificato un errore durante la creazione del profilo",
                        true
                    );
                }
            }
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
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-gray-100">
                <div className="container mx-auto px-4 py-8">
                    <Header
                        pageName={`${
                            isContoAttivo
                                ? "Il tuo Profilo"
                                : "Benvenuto, crea il tuo profilo"
                        }`}
                    />

                    {loading ? (
                        <p className="text-gray-900 text-center mt-4">
                            Caricamento...
                        </p>
                    ) : (
                        <div>
                            <form
                                onSubmit={handleSubmit}
                                className="bg-white shadow-md rounded-lg p-6 space-y-6"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* Nome */}
                                    <div className="sm:col-span-1">
                                        <label
                                            htmlFor="nome"
                                            className="block text-sm font-medium text-gray-900"
                                        >
                                            Nome
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                id="nome"
                                                name="nome"
                                                value={formData.nome}
                                                disabled={isContoAttivo}
                                                onChange={handleChange}
                                                placeholder="Inserisci il tuo nome"
                                                className={`block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-700 sm:text-sm ${
                                                    isContoAttivo
                                                        ? "bg-gray-100"
                                                        : "bg-white"
                                                }`}
                                            />
                                        </div>
                                    </div>

                                    {/* Cognome */}
                                    <div className="sm:col-span-1">
                                        <label
                                            htmlFor="cognome"
                                            className="block text-sm font-medium text-gray-900"
                                        >
                                            Cognome
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                id="cognome"
                                                name="cognome"
                                                value={formData.cognome}
                                                disabled={isContoAttivo}
                                                onChange={handleChange}
                                                placeholder="Inserisci il tuo cognome"
                                                className={`block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-700 sm:text-sm ${
                                                    isContoAttivo
                                                        ? "bg-gray-100"
                                                        : "bg-white"
                                                }`}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* Codice Fiscale */}
                                    <div className="sm:col-span-1">
                                        <label
                                            htmlFor="codiceFiscale"
                                            className="block text-sm font-medium text-gray-900"
                                        >
                                            Codice Fiscale
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                id="codiceFiscale"
                                                name="codiceFiscale"
                                                value={formData.codiceFiscale}
                                                disabled={isContoAttivo}
                                                onChange={handleChange}
                                                placeholder="Inserisci il tuo codice fiscale"
                                                className={`block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-700 sm:text-sm ${
                                                    isContoAttivo
                                                        ? "bg-gray-100"
                                                        : "bg-white"
                                                }`}
                                            />
                                        </div>
                                    </div>

                                    {/* Data di Nascita */}
                                    <div className="sm:col-span-1">
                                        <label
                                            htmlFor="dataNascita"
                                            className="block text-sm font-medium text-gray-900"
                                        >
                                            Data di Nascita
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="date"
                                                id="dataNascita"
                                                name="dataNascita"
                                                value={formData.dataNascita}
                                                onChange={handleChange}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-700 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* Indirizzo */}
                                    <div className="sm:col-span-1">
                                        <label
                                            htmlFor="indirizzoResidenza"
                                            className="block text-sm font-medium text-gray-900"
                                        >
                                            Indirizzo di Residenza
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                id="indirizzoResidenza"
                                                name="indirizzoResidenza"
                                                value={
                                                    formData.indirizzoResidenza
                                                }
                                                onChange={handleChange}
                                                placeholder="Via, numero civico"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-700 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Città di Residenza */}
                                    <div className="sm:col-span-1">
                                        <label
                                            htmlFor="cittaResidenza"
                                            className="block text-sm font-medium text-gray-900"
                                        >
                                            Città di Residenza
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                id="cittaResidenza"
                                                name="cittaResidenza"
                                                value={formData.cittaResidenza}
                                                onChange={handleChange}
                                                placeholder="Inserisci la città di residenza"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-700 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Telefono */}
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="telefono"
                                        className="block text-sm font-medium text-gray-900"
                                    >
                                        Numero di Telefono
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            id="telefono"
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            placeholder="Inserisci il tuo numero di telefono"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-700 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Pulsante Salva */}
                                <div className="flex justify-end mt-6 gap-x-6">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700"
                                    >
                                        {isContoAttivo ? "Salva" : "Crea"}
                                    </button>
                                </div>
                            </form>

                            {isContoAttivo && (
                                <div className="bg-white shadow-md rounded-lg p-6 mt-8">
                                    <h2 id="coordinate-bancarie" className="text-lg font-semibold text-gray-900 mb-4">
                                        Coordinate Bancarie
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {/* IBAN */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                IBAN
                                            </label>
                                            <p className="mt-1 text-base text-gray-900">
                                                {coordinateData.iban}
                                            </p>
                                        </div>

                                        {/* Codice Nazionale */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Codice Nazionale
                                            </label>
                                            <p className="mt-1 text-base text-gray-900">
                                                {coordinateData.codNazionale}
                                            </p>
                                        </div>

                                        {/* CIN Europeo */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                CIN Europeo
                                            </label>
                                            <p className="mt-1 text-base text-gray-900">
                                                {coordinateData.cinEuropeo}
                                            </p>
                                        </div>

                                        {/* CIN */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                CIN
                                            </label>
                                            <p className="mt-1 text-base text-gray-900">
                                                {coordinateData.cin}
                                            </p>
                                        </div>

                                        {/* ABI */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                ABI
                                            </label>
                                            <p className="mt-1 text-base text-gray-900">
                                                {coordinateData.abi}
                                            </p>
                                        </div>

                                        {/* CAB */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                CAB
                                            </label>
                                            <p className="mt-1 text-base text-gray-900">
                                                {coordinateData.cab}
                                            </p>
                                        </div>

                                        {/* Numero Conto */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Numero Conto
                                            </label>
                                            <p className="mt-1 text-base text-gray-900">
                                                {coordinateData.numConto}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Profilo;
