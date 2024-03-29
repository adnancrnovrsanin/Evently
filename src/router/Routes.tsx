import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../App";
import RequireAuth from "./RequireAuth";
import NotFound from "../pages/NotFound/NotFound";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import EventFormPage from "../pages/EventFormPage/EventFormPage";
import EventPage from "../pages/EventPage/EventPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import SettingsPage from "../pages/SettingsPage/SettingsPage";
import RegisterSuccess from "../pages/RegisterSuccess/RegisterSuccess";
import ConfirmEmail from "../pages/ConfirmEmail.tsx/ConfirmEmail";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import EmailSubmit from "../pages/EmailSubmit";
import ResetPassword from "../pages/ResetPassword";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth />, children: [
                {path: '/events/create', element: <EventFormPage />},
                {path: '/events/manage/:id', element: <EventFormPage />},
            ]},
            {path: '/profile/:username', element: <ProfilePage />},
            {path: '/events', element: <SearchPage />},
            {path: '/events/:id', element: <EventPage />},
            {path: '/account/registerSuccess', element: <RegisterSuccess />},
            {path: '/account/verifyEmail', element: <ConfirmEmail />},
            {path: '/account/forgotPassword', element: <EmailSubmit />},
            {path: '/account/resetPassword', element: <ResetPassword />},
            {path: '/settings', element: <SettingsPage />},
            {path: 'not-found', element: <NotFound />},
            // {path: 'server-error', element: <ServerError />},
            {path: '*', element: <Navigate replace to='/not-found' />}
        ]
    },
    { path: '/admin', element: <AdminDashboard />}
]

export const router = createBrowserRouter(routes);