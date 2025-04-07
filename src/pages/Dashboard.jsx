import { useContext, useEffect, useState } from "react";
import { apiGetDashBoard } from "../api/beApi";
import AuthContext from "../auth/AuthContext";
import CardModal from "../components/CardModal";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import OperazioniList from "../components/OperazioniList";

const Dashboard = () => {
    const { token } = useContext(AuthContext);
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [dashboardData, setDashboardData] = useState({
        saldo: null,
        totEntrateUltimoMese: null,
        totUsciteUltimeMese: null,
        dataInizioUltimoMese: null,
        dataFineUltimoMese: null,
    });

    useEffect(() => {
        const fetchDashBoard = async () => {
            try {
                // setLoading(true);
                const response = await apiGetDashBoard(token);
                if (response && response.data) {
                    setDashboardData(response.data);
                }
            } catch (err) {
                if (err.response) showAlert(err.response.data, true);
                else showAlert(err.message, true);
            } finally {
                // setLoading(false);
            }
        };

        fetchDashBoard();
    }, [token]);

    const handleOpenModal = () => {
        setIsCardModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsCardModalOpen(false);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow bg-gray-100">
                <div className="container mx-auto px-4 py-8">
                    <Header pageName="Dashboard" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {/* Saldo attuale */}
                        <div className="bg-white shadow-md rounded-lg p-6 md:col-span-2">
                            <h2 className="text-xl font-bold text-gray-800">
                                Saldo attuale
                            </h2>
                            <p className="mt-4 text-3xl font-semibold text-green-600">
                                {dashboardData.saldo
                                    ? dashboardData.saldo.toFixed(2)
                                    : "0.00"}
                                €
                            </p>
                            <div className="mt-6 space-x-4 hidden">
                                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-500">
                                    Il tuo IBAN
                                </button>
                                <button className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-500">
                                    La tua carta
                                </button>
                            </div>
                        </div>

                        {/* La tua carta virtuale */}
                        <div
                            className="bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-md rounded-lg p-6 cursor-pointer"
                            onClick={handleOpenModal}
                        >
                            <h2 className="text-xl font-bold">
                                La tua carta virtuale
                            </h2>
                            <div className="mt-4">
                                <p className="text-lg font-semibold">
                                    SmartBank Card
                                </p>
                                <p className="mt-2 text-2xl font-bold tracking-widest">
                                    **** **** **** ****
                                </p>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <p className="text-sm">CVV</p>
                                        <p className="font-semibold">***</p>
                                    </div>
                                    <div>
                                        <p className="text-sm">Scadenza</p>
                                        <p className="font-semibold">**/**</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modal */}
                    {isCardModalOpen && (
                        <CardModal onClose={handleCloseModal}></CardModal>
                    )}

                    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            Ultimi 30 giorni{" "}
                            {dashboardData.dataInizioUltimoMese && (
                                <span className="text-gray-500 font-medium text-sm">
                                    dal {dashboardData.dataInizioUltimoMese} al{" "}
                                    {dashboardData.dataFineUltimoMese}
                                </span>
                            )}
                        </h3>
                        <dl className="grid grid-cols-1 md:grid-cols-3 gap-4 divide-x divide-gray-200">
                            <div className="flex flex-col items-start">
                                <dt className="text-sm font-medium text-gray-800">
                                    Totale Entrate
                                </dt>
                                <dd className="mt-2">
                                    <div className="text-lg font-semibold text-green-600">
                                        {dashboardData.totEntrateUltimoMese
                                            ? dashboardData.totEntrateUltimoMese.toFixed(
                                                  2
                                              )
                                            : "0.00"}
                                        €
                                    </div>
                                </dd>
                            </div>

                            <div className="flex flex-col items-start">
                                <dt className="text-sm font-medium text-gray-800">
                                    Totale Uscite
                                </dt>
                                <dd className="mt-2">
                                    <div className="text-lg font-semibold text-red-600">
                                        {dashboardData.totUsciteUltimeMese
                                            ? dashboardData.totUsciteUltimeMese.toFixed(
                                                  2
                                              )
                                            : "0.00"}
                                        €
                                    </div>
                                </dd>
                            </div>

                            <div className="flex flex-col items-start">
                                <dt className="text-sm font-medium text-gray-800">
                                    Totale Netto
                                </dt>
                                <dd className="mt-2">
                                    <div
                                        className={`text-lg font-semibold ${
                                            dashboardData.totEntrateUltimoMese +
                                                dashboardData.totUsciteUltimeMese >=
                                            0
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {(
                                            dashboardData.totEntrateUltimoMese +
                                            dashboardData.totUsciteUltimeMese
                                        ).toFixed(2)}
                                        €
                                    </div>
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800">
                            Attività recenti
                        </h2>
                        <OperazioniList isInteractive={false} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Dashboard;
