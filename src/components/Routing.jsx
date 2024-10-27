import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginOptions from './LoginOptions';
import AdminLoginPage from './AdminPages/AdminLoginPage';
import RoomLoginPage from './UserPages/RoomLoginPage';
import HotelLoginPage from './HotelLoginPage';
import TestForm from '../TashForm';
import AdminDashboard from './AdminPages/AdminDashboard';
import RoomDashboard from './UserPages/RoomDashboard'

const Routing = () => {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <HotelLoginPage />
        },
        {
            path: '/login-options',
            element: <LoginOptions/>
        },
        {
            path: '/admin-login',
            element: <AdminLoginPage />
        },
        {
            path: '/admin-dashboard',
            element : <AdminDashboard/>
        },
        {
            path: '/room-dashboard',
            element : <RoomDashboard/>
        },
        {
            path: '/room-login',
            element: <RoomLoginPage/>
        },
        {
            path: '/test-form',
            element:<TestForm/>
        }
    ]);

    return (
        <RouterProvider router={router}>
            <div>

            </div>
        </RouterProvider>
    )
}

export default Routing;
