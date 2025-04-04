import { useContext, useState } from "react";
import {
    apiPostTerzePartiInsertDeposito,
    apiPostTerzePartiInsertPrelievo,
} from "../api/beApi";
import atmWallpaper from "../assets/atm_wallpaper.jpg";
import Header from "../components/Header";
import { AlertContext } from "../context/AlertContext";

const Atm = () => {
    const [tipoOperazione, setTipoOperazione] = useState(null);
    const { showAlert, clearAlert } = useContext(AlertContext);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        numeroCarta: "",
        meseScadenzaCarta: "",
        annoScadenzaCarta: "",
        cvvCarta: "",
        importo: "",
        idAtm: 1,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearAlert();
        setLoading(true);
        try {
            let response = null;
            if (tipoOperazione === "prelievo") {
                response = await apiPostTerzePartiInsertPrelievo(
                    formData.numeroCarta,
                    formData.meseScadenzaCarta,
                    formData.annoScadenzaCarta,
                    formData.cvvCarta,
                    formData.importo,
                    formData.idAtm
                );
            } else if (tipoOperazione === "deposito") {
                response = await apiPostTerzePartiInsertDeposito(
                    formData.numeroCarta,
                    formData.meseScadenzaCarta,
                    formData.annoScadenzaCarta,
                    formData.cvvCarta,
                    formData.importo,
                    formData.idAtm
                );
            } else {
                showAlert("Seleziona un'operazione", true);
                return;
            }
            showAlert("Operazione completata con successo", false);
        } catch (err) {
            if (err.response) showAlert(err.response.data.message, true);
            else showAlert(err.message, true);
        } finally {
            setLoading(false);
            setFormData({
                numeroCarta: "",
                meseScadenzaCarta: "",
                annoScadenzaCarta: "",
                cvvCarta: "",
                importo: "",
                idAtm: 1,
            });
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
        <div className="relative flex flex-col min-h-screen">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${atmWallpaper})`,
                    backgroundSize: "150%",
                    filter: "blur(15px)",
                    zIndex: -1,
                }}
            ></div>

            <main className="flex-grow bg-opacity-80 flex items-center justify-center">
                <div className="container mx-auto px-4 py-8">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white shadow-md rounded-lg p-6 mt-6"
                    >
                        <Header pageName="ATM" titleClassName="text-center" />

                        {loading ? (
                            <p className="text-gray-900 text-center mt-4">
                                Caricamento...
                            </p>
                        ) : (
                            <>
                                {/* Pulsanti */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                                    <button
                                        type="button"
                                        className={`px-6 py-4 font-bold rounded-lg border-2 focus:outline-none focus:ring-4 cursor-pointer ${
                                            tipoOperazione === "prelievo"
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-blue-600 border-blue-600 hover:bg-blue-100"
                                        }`}
                                        onClick={() =>
                                            setTipoOperazione("prelievo")
                                        }
                                    >
                                        Prelievo Internazionale
                                    </button>
                                    <button
                                        type="button"
                                        className={`px-6 py-4 font-bold rounded-lg border-2 focus:outline-none focus:ring-4 cursor-pointer ${
                                            tipoOperazione === "deposito"
                                                ? "bg-green-600 text-white border-green-600"
                                                : "bg-white text-green-600 border-green-600 hover:bg-green-100"
                                        }`}
                                        onClick={() =>
                                            setTipoOperazione("deposito")
                                        }
                                    >
                                        Deposito
                                    </button>
                                </div>

                                {/* Numero carte e CVV */}
                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label
                                            htmlFor="numeroCarta"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Numero Carta
                                        </label>
                                        <input
                                            id="numeroCarta"
                                            name="numeroCarta"
                                            value={formData.numeroCarta}
                                            type="text"
                                            maxLength="16"
                                            onChange={handleChange}
                                            placeholder="1234 5678 9012 3456"
                                            className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-700 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="cvv"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            CVV
                                        </label>
                                        <input
                                            id="cvv"
                                            type="password"
                                            name="cvvCarta"
                                            value={formData.cvvCarta}
                                            onChange={handleChange}
                                            maxLength="3"
                                            placeholder="123"
                                            className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-700 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Scadenza e Importo */}
                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label
                                            htmlFor="scadenza"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Scadenza (MM/YY)
                                        </label>
                                        <div className="flex items-center">
                                            <input
                                                id="mm"
                                                name="meseScadenzaCarta"
                                                value={
                                                    formData.meseScadenzaCarta
                                                }
                                                onChange={handleChange}
                                                type="text"
                                                maxLength="2"
                                                placeholder="MM"
                                                className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-700 sm:text-sm"
                                            />
                                            <span className="mx-2 text-gray-700">
                                                /
                                            </span>
                                            <input
                                                id="yy"
                                                name="annoScadenzaCarta"
                                                value={
                                                    formData.annoScadenzaCarta
                                                }
                                                onChange={handleChange}
                                                type="text"
                                                maxLength="2"
                                                placeholder="YY"
                                                className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-700 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="importo"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Importo (€)
                                        </label>
                                        <input
                                            id="importo"
                                            name="importo"
                                            value={formData.importo}
                                            onChange={handleChange}
                                            type="number"
                                            min="1"
                                            step="0.01"
                                            placeholder="0.00"
                                            className="mt-1 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-700 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Pulsante Esegui */}
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="w-full px-6 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 cursor-pointer"
                                    >
                                        Esegui Operazione
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Atm;
