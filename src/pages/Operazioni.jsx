import { useContext, useState } from "react";
import AuthContext from "../auth/AuthContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import OperazioniList from "../components/OperazioniList";

const Operazioni = () => {
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Stato per i filtri
    const [dataInizio, setDataInizio] = useState("");
    const [dataFine, setDataFine] = useState("");
    const [codTipoOperazione, setcodTipoOperazione] = useState("");

    // Oggetto filtro da passare al componente OperazioniList
    const [filter, setFilter] = useState({});

    const handleApplyFilters = () => {
        setFilter({
            dataInizio: dataInizio || null,
            dataFine: dataFine || null,
            codTipoOperazione: codTipoOperazione || null,
        });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow bg-gray-100">
                <div className="container mx-auto px-4 py-8">
                    <Header pageName="Lista Operazioni" />

                    <div className="bg-white shadow-md rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                            {/* Filtro per tipo operazione */}
                            <div className="relative">
                                <label
                                    htmlFor="codTipoOperazione"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Tipo Operazione
                                </label>
                                <select
                                    id="codTipoOperazione"
                                    value={codTipoOperazione}
                                    onChange={(e) =>
                                        setcodTipoOperazione(e.target.value)
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-gray-700 sm:text-sm"
                                >
                                    <option value="">Tutti</option>
                                    <option value="1">Bonifico Uscita</option>
                                    <option value="2">Bonifico Ingresso</option>
                                    <option value="3">Pagamento</option>
                                    <option value="4">Prelievo</option>
                                    <option value="5">Deposito</option>
                                </select>
                            </div>

                            {/* Filtro per data inizio */}
                            <div className="relative">
                                <label
                                    htmlFor="dataInizio"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Data Inizio
                                </label>
                                <input
                                    id="dataInizio"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-700 sm:text-sm"
                                    type="date"
                                    value={dataInizio}
                                    onChange={(e) =>
                                        setDataInizio(e.target.value)
                                    }
                                />
                            </div>

                            {/* Filtro per data fine */}
                            <div className="relative">
                                <label
                                    htmlFor="dataFine"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Data Fine
                                </label>
                                <input
                                    id="dataFine"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-700 sm:text-sm"
                                    type="date"
                                    value={dataFine}
                                    onChange={(e) =>
                                        setDataFine(e.target.value)
                                    }
                                />
                            </div>

                            {/* Pulsante Applica Filtri */}
                            <div className="relative">
                                <button
                                    onClick={handleApplyFilters}
                                    className="w-full px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 sm:text-sm"
                                >
                                    Applica Filtri
                                </button>
                            </div>
                        </div>

                        <OperazioniList
                            initialPageNumber={0}
                            pageSize={10}
                            filter={filter}
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Operazioni;
