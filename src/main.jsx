import React, { useState, useEffect } from 'react'; 
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { 
  AboutPage,
  ContactUsPage, 
  AppointmentPage, 
  LoginPage, 
  Dashboard, 
  Appointment, 
  ServiceProviders, 
  Administrators,
  Settings,
  AddServiceProvider,
  EditServiceProvider,
  ForgotPassword,
  EditClientAppointment,
  AddAdmin,
  EditAdmin,
  ChangePassword,
  Availability,
  MindPathLogin,
} from "./pages";
import EditSPForm from './components/EditSPForm.jsx';
import EditAdminForm from './components/EditAdminForm.jsx';
import EditClientAppointmentForm from './components/EditClientAppointmentForm.jsx';


import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "AboutPage",
    element: <AboutPage />,
  },
  {
    path: "ContactUsPage",
    element: <ContactUsPage />,
  },
  {
    path: "AppointmentPage",
    element: <AppointmentPage />,
  },
  {
    path: "MindPathLogin",
    element: <MindPathLogin />,
  },
  {
    path: "LoginPage",
    element: <LoginPage />,
  },
  {
    path: "ForgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "Dashboard",
    element: <ProtectedRoute element={<Dashboard />} />, 
  },
  {
    path: "Appointment",
    element: <ProtectedRoute element={<Appointment />} />, 
  },
  {
    path: "EditClientAppointment/:id",
    element: <ProtectedRoute element={<EditClientAppointment />} />, 
  },
  {
    path: "ServiceProviders",
    element: <ProtectedRoute element={<ServiceProviders />} />, 
  },
  {
    path: "AddServiceProvider",
    element: <ProtectedRoute element={<AddServiceProvider />} />, 
  },
  {
    path: "EditServiceProvider/:uid",
    element: <ProtectedRoute element={<EditServiceProvider />} />, 
  },
  {
    path: "Administrators",
    element: <ProtectedRoute element={<Administrators />} />, 
  },
  {
    path: "AddAdmin",
    element: <ProtectedRoute element={<AddAdmin />} />, 
  },
  {
    path: "EditAdmin/:uid",
    element: <ProtectedRoute element={<EditAdmin />} />, 
  },
  {
    path: "EditAdminForm",
    element: <ProtectedRoute element={<EditAdminForm />} />, 
  },
  {
    path: "Settings",
    element: <ProtectedRoute element={<Settings />} />, 
  },
  {
    path: "EditSPForm",
    element: <ProtectedRoute element={<EditSPForm />} />, 
  },
  {
    path: "EditClientAppointmentForm",
    element: <ProtectedRoute element={<EditClientAppointmentForm />} />, 
  },
  {
    path: "ChangePassword",
    element: <ProtectedRoute element={<ChangePassword />} />, 
  },
  {
    path: "Availability",
    element: <ProtectedRoute element={<Availability />} />, 
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
