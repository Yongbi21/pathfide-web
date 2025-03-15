import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Cog6ToothIcon, UserCircleIcon, PowerIcon } from "@heroicons/react/24/solid";
import { Sidebar } from '../components';
import ServiceProvidersDataService from "../services/serviceproviders";
import AppointmentDataService from "../services/appointment.service";
import AdminDataService from "../services/admin";
import { auth } from '../firebase';

const Dashboard = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const authChannel = new BroadcastChannel('authChannel');

    const handleLogoutMessage = (event) => {
      if (event.data === 'logout') {
        // Clear local storage and redirect to login page
        localStorage.removeItem('authUser');
        navigate('/LoginPage');
      }
    };

    authChannel.addEventListener('message', handleLogoutMessage);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, store user info in localStorage
        localStorage.setItem('authUser', JSON.stringify(user));
      } else {
        // User is signed out, remove user info from localStorage
        localStorage.removeItem('authUser');
      }
    });

    // Cleanup subscription on unmount
    return () => {
      authChannel.removeEventListener('message', handleLogoutMessage);
      unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, store user info in localStorage
        localStorage.setItem('authUser', JSON.stringify(user));
      } else {
        // User is signed out, remove user info from localStorage
        localStorage.removeItem('authUser');
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false); // Initialize state for dropdown visibility
  const [serviceProviders, setServiceProviders] = useState([]); // State for service providers
  const [appointments, setAppointments] = useState([]); // State for appointments
  const [admins, setAdmins] = useState([]); // State for appointments
  const [loadingServiceProviders, setLoadingServiceProviders] = useState(true); // State for loading service providers
  const [loadingAppointments, setLoadingAppointments] = useState(true); // State for loading appointments
  const [loadingAdmins, setLoadingAdmins] = useState(true); // State for loading appointments

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
  };

  useEffect(() => {
    const fetchServiceProviders = async () => {
      setLoadingServiceProviders(true); // Start loading service providers
      try {
        const snapshot = await ServiceProvidersDataService.getLimitedServiceProviders(5); // Fetch 5 service providers
        const providersList = [];
        snapshot.forEach((doc) => {
          providersList.push({ id: doc.id, ...doc.data() });
        });
        setServiceProviders(providersList); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching service providers: ", error);
      } finally {
        setLoadingServiceProviders(false); // Stop loading service providers
      }
    };

    const fetchAppointments = async () => {
      setLoadingAppointments(true); // Start loading appointments
      try {
        const snapshot = await AppointmentDataService.getTotalAppointments(5); // Fetch 5 appointments
        const appointmentsList = [];
        snapshot.forEach((doc) => {
          appointmentsList.push({ id: doc.id, ...doc.data() });
        });
        setAppointments(appointmentsList); // Update state with fetched appointments
      } catch (error) {
        console.error("Error fetching appointments: ", error);
      } finally {
        setLoadingAppointments(false); // Stop loading appointments
      }
    };

    const fetchAdmins = async () => {
      setLoadingAdmins(true); // Start loading service providers
      try {
        const snapshot = await AdminDataService.getLimitedAdmins(5); // Fetch 5 service providers
        const adminsList = [];
        snapshot.forEach((doc) => {
          adminsList.push({ id: doc.id, ...doc.data() });
        });
        setAdmins(adminsList); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching admins: ", error);
      } finally {
        setLoadingAdmins(false); // Stop loading service providers
      }
    };

    fetchServiceProviders();
    fetchAppointments();
    fetchAdmins();
  }, []);

  return (
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="flex justify-between items-center p-6 bg-white">
            {/* Title */}
            <h1 className="font-poppins text-[24px] text-[#757575] font-light">Hello, Admin<span className="text-1xl wave"> &#128075; </span> </h1>

            {/* Profile Dropdown */}
            <div className="relative">
              <button className="flex items-center space-x-2 focus:outline-none" onClick={toggleDropdown}>
                <img
                    src="https://docs.material-tailwind.com/img/face-2.jpg"
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                    <Link to="/Settings">
                      <a className="flex items-center px-4 py-2 hover:bg-gray-100 font-poppins">
                        <Cog6ToothIcon className="h-5 w-5 mr-2" />
                        Settings
                      </a>
                    </Link>
                    <Link to="/LoginPage">
                      <a className="flex items-center px-4 py-2 hover:bg-gray-100 font-poppins">
                        <PowerIcon className="h-5 w-5 mr-2" />
                        Logout
                      </a>
                    </Link>
                  </div>
              )}
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 px-6 py-4">
            <h1 className="font-poppins text-[24px] text-black font-bold mb-6">Dashboard Section</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Card 1 - Appointments */}
              <div className="card bg-base-100 w-full shadow-xl font-poppins">
                <div className="card-body">
                  <h2 className="card-title text-black-600/2">Appointments</h2>
                  <h1 className="text-[50px] font-bold">{loadingAppointments ? "..." : appointments.length}</h1>
                  <p>{loadingAppointments ? "Loading..." : `${appointments.length} scheduled appointments`}</p>
                </div>
              </div>

              {/* Card 2 - Service Providers */}
              <div className="card bg-base-100 w-full shadow-xl font-poppins">
                <div className="card-body">
                  <h2 className="card-title">Service Providers</h2>
                  <h1 className="text-[50px] font-bold">{loadingServiceProviders ? "..." : serviceProviders.length}</h1>
                  <p>{loadingServiceProviders ? "Loading..." : `${serviceProviders.length} Active Service Providers`}</p>
                </div>
              </div>

              {/* Card 3 - Administrators */}
              <div className="card bg-base-100 w-full shadow-xl font-poppins">
                <div className="card-body">
                  <h2 className="card-title text-black-600/2">Administrators</h2>
                  <h1 className="text-[50px] font-bold">{loadingAdmins ? "..." : admins.length}</h1>
                  <p>{loadingAdmins ? "Loading..." : `${admins.length} Active Service Providers`}</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
  );
};

export default Dashboard;