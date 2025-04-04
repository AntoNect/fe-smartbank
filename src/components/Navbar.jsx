import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../auth/AuthContext";

const Navbar = () => {
    const { logout, isContoAttivo } = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <img
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                            className="h-8 w-auto"
                        />
                    </div>

                    {isContoAttivo ? (
                        <>
                            <div className="hidden md:flex space-x-6">
                                <Link
                                    to="/dashboard"
                                    className="font-semibold text-gray-900"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/bonifico"
                                    className="font-semibold text-gray-900"
                                >
                                    Bonifico
                                </Link>
                                <Link
                                    to="/operazioni"
                                    className="font-semibold text-gray-900"
                                >
                                    Operazioni
                                </Link>
                            </div>

                            <div className="hidden md:flex items-center space-x-4 relative">
                                <a
                                    href="/atm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold"
                                >
                                    ATM
                                </a>
                                <div className="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt="User"
                                        className="h-8 w-8 rounded-full cursor-pointer"
                                        onClick={() => setIsOpen(!isOpen)}
                                    />
                                    {isOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                                            <button
                                                onClick={() =>
                                                    navigate("/profilo")
                                                }
                                                className="block w-full text-left px-4 py-2 font-semibold text-gray-900 hover:bg-gray-100"
                                            >
                                                Il tuo profilo
                                            </button>
                                            <button
                                                onClick={handleLogoutClick}
                                                className="block w-full text-left px-4 py-2 font-semibold text-red-600 hover:bg-gray-100"
                                            >
                                                Disconnettiti
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="md:hidden flex items-center">
                                <div
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="hover:font-semibold text-gray-900 focus:outline-none"
                                >
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    {isOpen ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="h-6 w-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="h-6 w-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                            />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="md:hidden flex items-center">
                                <div
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="hover:font-semibold text-gray-900 focus:outline-none"
                                >
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    {isOpen ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="h-6 w-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="h-6 w-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                            />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <div className="hidden md:flex items-center space-x-4 relative">
                                <div className="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt="User"
                                        className="h-8 w-8 rounded-full cursor-pointer"
                                        onClick={() => setIsOpen(!isOpen)}
                                    />
                                    {isOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                                            <button
                                                onClick={handleLogoutClick}
                                                className="block w-full text-left px-4 py-2 font-semibold text-red-600 hover:bg-gray-100"
                                            >
                                                Disconnettiti
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {isOpen && (
                    <div className="md:hidden">
                        <div className="space-y-2 px-2 pt-2 pb-3">
                            {isContoAttivo && (
                                <>
                                    <a
                                        href="/dashboard"
                                        className="block font-semibold text-gray-900 px-3 py-2 rounded-md text-base hover:bg-gray-100"
                                    >
                                        Dashboard
                                    </a>
                                    <a
                                        href="/bonifico"
                                        className="block font-semibold text-gray-900 px-3 py-2 rounded-md text-base hover:bg-gray-100"
                                    >
                                        Bonifico
                                    </a>
                                    <a
                                        href="/operazioni"
                                        className="block font-semibold text-gray-900 px-3 py-2 rounded-md text-base hover:bg-gray-100"
                                    >
                                        Operazioni
                                    </a>
                                    <a
                                        href="/profilo"
                                        className="block font-semibold text-gray-900 px-3 py-2 rounded-md text-base hover:bg-gray-100"
                                    >
                                        Il Tuo Profilo
                                    </a>
                                </>
                            )}

                            <button
                                onClick={handleLogoutClick}
                                className="block w-full text-left px-4 py-2 font-semibold text-red-600 hover:bg-gray-100"
                            >
                                Disconnettiti
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
