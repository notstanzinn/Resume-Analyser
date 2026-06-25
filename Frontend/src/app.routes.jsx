import {createBrowserRouter, Navigate} from "react-router"
import Login from "./features/auth/pages/Login.jsx"
import Signup from "./features/auth/pages/Signup.jsx"
import Protected from "./features/auth/components/Protected.jsx"


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><h1>Home Page</h1></Protected>
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