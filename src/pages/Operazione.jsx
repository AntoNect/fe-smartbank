import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../auth/AuthContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { AlertContext } from "../context/AlertContext";

import { apiGetOperazione } from "../api/beApi";

const Operazione = () => {
    const { token } = useContext(AuthContext);
    const { idOperazione } = useParams();
    const [operazione, setOperazione] = useState(null);
    const { showAlert, clearAlert } = useContext(AlertContext);

    useEffect(() => {
        const fetchPaginaOperazione = async () => {
            try {
                clearAlert();

                const response = await apiGetOperazione(idOperazione, token);

                if (response && response.data) {
                    setOperazione(response.data);
                }
            } catch (err) {
                if (err.response) showAlert(err.response.data.message, true);
                else showAlert(err.message, true);
            }
        };

        fetchPaginaOperazione();
    }, [idOperazione, token]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-gray-100">
                <div className="container mx-auto px-4 py-8">
                    <Header pageName={`Operazione n. ${idOperazione}`} />

                    {!operazione ? (
                        <p className="text-gray-900 text-center mt-4">
                            Caricamento...
                        </p>
                    ) : (
                        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
                            <h2 class="text-2xl font-bold text-gray-800 mb-6">
                                {operazione.descTipoOperazione}
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Importo
                                    </label>
                                    <p className="mt-1 text-base text-gray-900">
                                        {operazione.importo} €
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Data Operazione
                                    </label>
                                    <p className="mt-1 text-base text-gray-900">
                                        {operazione.data}
                                    </p>
                                </div>

                                {operazione.codTipoOperazione == 1 ||
                                operazione.codTipoOperazione == 2 ? (
                                    <>
                                        {operazione.codTipoOperazione == 1 && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    IBAN Beneficiario
                                                </label>
                                                <p className="mt-1 text-base text-gray-900">
                                                    {operazione.bonifico.iban}
                                                </p>
                                            </div>
                                        )}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                {operazione.codTipoOperazione ==
                                                2
                                                    ? "Nome Mittente"
                                                    : "Nome Beneficiario"}
                                            </label>
                                            <p className="mt-1 text-base text-gray-900">
                                                {operazione.bonifico.nome}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Causale
                                            </label>
                                            <p className="mt-1 text-base text-gray-900">
                                                {operazione.bonifico.causale}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Bonifico Istantaneo
                                            </label>
                                            <p className="mt-1 text-base text-gray-900">
                                                {operazione.bonifico.istantaneo
                                                    ? "Sì"
                                                    : "No"}
                                            </p>
                                        </div>

                                        {!operazione.bonifico.istantaneo && (
                                            <>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Data Accredito
                                                    </label>
                                                    <p className="mt-1 text-base text-gray-900">
                                                        {
                                                            operazione.bonifico
                                                                .dataAccredito
                                                        }
                                                    </p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Data Addebito
                                                    </label>
                                                    <p className="mt-1 text-base text-gray-900">
                                                        {
                                                            operazione.bonifico
                                                                .dataAddebito
                                                        }
                                                    </p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Stato
                                                    </label>
                                                    <p className="mt-1 text-base text-gray-900">
                                                        {
                                                            operazione.bonifico
                                                                .descStato
                                                        }
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : operazione.codTipoOperazione == 3 ? (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Esercente
                                        </label>
                                        <p className="mt-1 text-base text-gray-900">
                                            {operazione.pagamento.esercente}
                                        </p>
                                    </div>
                                ) : operazione.codTipoOperazione == 4 ||
                                  operazione.codTipoOperazione == 5 ? (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                ATM
                                            </label>
                                            <p className="mt-1 text-base text-gray-900">
                                                {operazione.sportello.descAtm}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Operazione;
