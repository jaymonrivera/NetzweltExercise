import { createBrowserRouter, RouteObject } from "react-router-dom";
import LoginForm from "../../features/login/LoginPage";
import TerritoriesPage from "../../features/territories/TerritoryList";
import App from "../layout/App";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <TerritoriesPage /> },
            { path: 'account/login', element: <LoginForm /> },
            { path: 'territories/all', element: <TerritoriesPage /> },
       
        ]
    }
]

export const router = createBrowserRouter(routes)