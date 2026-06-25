import {createBrowserRouter, Navigate} from "react-router"
import Login from "./features/auth/pages/Login.jsx"
import Signup from "./features/auth/pages/Signup.jsx"


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace /> 
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Signup />
    }
])