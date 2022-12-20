import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../App";
import RequireAuth from "./RequireAuth";
import NotFound from "../pages/NotFound/NotFound";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import EventFormPage from "../pages/EventFormPage/EventFormPage";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth />, children: [
                {path: '/profile/:username', element: <ProfilePage />},
                {path: '/events/create', element: <EventFormPage />},
            ]},
            {path: 'not-found', element: <NotFound />},
            // {path: 'server-error', element: <ServerError />},
            {path: '*', element: <Navigate replace to='/not-found' />},
        ]
    }
]

export const router = createBrowserRouter(routes);