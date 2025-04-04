import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGetOperazioni } from "../api/BeApi";
import AuthContext from "../auth/AuthContext";
import { AlertContext } from "../context/AlertContext";

const OperazioniList = ({
    filter = {},
    initialPageNumber = 0,
    pageSize = 5,
    isInteractive = true,
}) => {
    const { token } = useContext(AuthContext);
    const [transazioni, setTransazioni] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(initialPageNumber);
    const { showAlert, clearAlert } = useContext(AlertContext);
    const navigate = useNavigate();

    const [firstPage, setFirstPage] = useState(true);
    const [lastPage, setLastPage] = useState(true);

    useEffect(() => {
        const fetchTransazioni = async () => {
            try {
                setLoading(true);
                clearAlert();

                const response = await apiGetOperazioni(
                    filter,
                    pageNumber,
                    pageSize,
                    token
                );

                if (response && response.data) {
                    setTransazioni(response.data.content);
                    setFirstPage(response.data.first);
                    setLastPage(response.data.last);
                } else {
                    console.log("errore", response);
                }
            } catch (err) {
                if (err.response) showAlert(err.response.data.message, true);
                else showAlert(err.message, true);
            } finally {
                setLoading(false);
            }
        };

        fetchTransazioni();
    }, [JSON.stringify(filter), pageNumber, pageSize, token]);

    const tipoOperazioni = {
        1: "Bonifico in Uscita",
        2: "Bonifico in Ingresso",
        3: "Pagamento",
        4: "Prelievo",
        5: "Deposito",
    };

    const handleOperazioneClick = (idOperazione) => {
        navigate(`/operazione/${idOperazione}`);
    };

    const handlePrecedenteButton = () => {
        setPageNumber(pageNumber - 1);
    };

    const handleSuccessivoButton = () => {
        setPageNumber(pageNumber + 1);
    };

    return (
        <div>
            {loading && (
                <p className="text-gray-900 text-center mt-4">Caricamento...</p>
            )}
            {!loading &&
                transazioni.length === 0 &&
                Object.keys(filter).length === 0 && (
                    <p className="text-gray-600 mt-4">
                        Inizia ad utilizzare la tua carta o ad effettuare
                        bonifici. Troverai le tue attività qui.
                    </p>
                )}
            {!loading &&
                transazioni.length === 0 &&
                Object.keys(filter).length > 0 && (
                    <p className="text-gray-600 mt-4">
                        Non si sono dati corrispondenti ai filtri inseriti
                    </p>
                )}
            {!loading && (
                <>
                    <ul className="mt-4 divide-y divide-gray-200">
                        {transazioni.map((transazione) => (
                            <li
                                key={transazione.idOperazione}
                                onClick={() =>
                                    handleOperazioneClick(
                                        transazione.idOperazione
                                    )
                                }
                                className="py-4 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out"
                            >
                                <div>
                                    <p className="text-sm font-medium text-gray-800">
                                        {`${
                                            tipoOperazioni[transazione.codTipo]
                                        }: ${transazione.descrizione}`}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {transazione.data}
                                    </p>
                                </div>
                                <p
                                    className={`text-sm font-semibold ${
                                        transazione.importo > 0
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {transazione.importo > 0 ? "+" : ""}€{" "}
                                    {transazione.importo.toFixed(2)}
                                </p>
                            </li>
                        ))}
                    </ul>

                    {isInteractive && (
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={handlePrecedenteButton}
                                disabled={firstPage}
                                className={`px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 ${
                                    firstPage
                                        ? "opacity-70 cursor-not-allowed"
                                        : "cursor-pointer"
                                }`}
                            >
                                Precedente
                            </button>
                            <button
                                onClick={handleSuccessivoButton}
                                disabled={lastPage}
                                className={`px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 ${
                                    lastPage
                                        ? "opacity-70 cursor-not-allowed"
                                        : "cursor-pointer"
                                }`}
                            >
                                Successivo
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default OperazioniList;
