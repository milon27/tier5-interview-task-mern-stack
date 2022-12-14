import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import URL from "../../utils/constant/URL";
import AddUser from "../pages/AddUser";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/home/Home";
import _404 from "../pages/_404";
import ProtectedRoute from "./ProtectedRoute";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={URL.LOGIN} element={<Login />} />
                <Route path={URL.REGISTER} element={<Register />} />
                <Route path={URL.HOME} element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path={URL.ADD_USER} element={<ProtectedRoute><AddUser /></ProtectedRoute>} />

                <Route path="*" element={<_404 />} />
            </Routes>
        </BrowserRouter>
    )
}
