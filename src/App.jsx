import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";
import Bonifico from "./pages/Bonifico";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Operazione from "./pages/Operazione";
import Operazioni from "./pages/Operazioni";
import Profilo from "./pages/Profilo";
import Atm from "./pages/Atm";
import Signup from "./pages/Signup";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/profilo"
                        element={
                            <PrivateRoute>
                                <Profilo />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/bonifico"
                        element={
                            <PrivateRoute>
                                <Bonifico />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/operazioni"
                        element={
                            <PrivateRoute>
                                <Operazioni />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/operazione/:idOperazione"
                        element={
                            <PrivateRoute>
                                <Operazione />
                            </PrivateRoute>
                        }
                    />

                    <Route path="/atm" element={<Atm />} />

                    <Route path="*" element={<Login />} />

                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
