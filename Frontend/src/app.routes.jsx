import {createBrowserRouter, Navigate} from "react-router"
import Login from "./features/auth/pages/Login.jsx"
import Signup from "./features/auth/pages/Signup.jsx"


export const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>Home Page</h1> 
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