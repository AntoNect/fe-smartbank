import { useContext, useEffect, useState } from "react";
import { apiGetCartaAttiva } from "../api/beApi";
import AuthContext from "../auth/AuthContext";

const CardModal = ({ onClose }) => {
    const { token } = useContext(AuthContext);
    const [cardData, setCardData] = useState({
        numero: "",
        scadenza: "",
        cvv: "",
    });

    useEffect(() => {
        const fetchCartaAttiva = async () => {
            try {
                const response = await apiGetCartaAttiva(token);
                if (response && response.data) {
                    setCardData(response.data);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchCartaAttiva();
    }, [token]);

    const formatCardNumber = (number) => {
        return number.replace(/(\d{4})(?=\d)/g, "$1 ");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="rounded-lg shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white hover:text-gray-100"
                >
                    ✕
                </button>
                <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-md rounded-lg p-8">
                    <h2 className="text-2xl font-bold">
                        La tua carta virtuale
                    </h2>
                    <div className="mt-6">
                        <p className="text-xl font-semibold">SmartBank Card</p>
                        <p className="mt-4 text-4xl font-bold tracking-widest">
                            {cardData.numero
                                ? formatCardNumber(cardData.numero)
                                : "**** **** **** ****"}
                        </p>
                        <div className="mt-6 flex justify-between">
                            <div>
                                <p className="text-lg">CVV</p>
                                <p className="font-semibold text-lg">
                                    {cardData.cvv ? cardData.cvv : "***"}
                                </p>
                            </div>
                            <div>
                                <p className="text-lg">Scadenza</p>
                                <p className="font-semibold text-lg">
                                    {cardData.scadenza
                                        ? cardData.scadenza
                                        : "**/**"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardModal;
