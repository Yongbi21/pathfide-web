import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "../components";
import { Cog6ToothIcon, PowerIcon } from "@heroicons/react/24/solid";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // Initialize state for dropdown visibility
  const [adminEmail, setAdminEmail] = useState(""); // State to store admin's email
  const history = useNavigate();

  // Fetch the logged-in admin's email
  useEffect(() => {
    const fetchAdminEmail = () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setAdminEmail(currentUser.email); // Set the email in state
      }
    };
    fetchAdminEmail();
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Handle password reset form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailVal = e.target.email.value;

    sendPasswordResetEmail(auth, emailVal)
      .then(() => {
        alert("Check your Email");
        history("/LoginPage");
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-6 bg-white">
          <h1 className="font-poppins text-[24px] text-[#757575] font-light"></h1>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={toggleDropdown}
            >
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

        {/* Main Content */}
        <main className="flex-1 px-6 py-4">
          <h1 className="font-poppins text-[24px] text-black font-bold mb-6">
            Change Password
          </h1>
          <p className="text-[#4b5563] font-poppins mt-2">
            Once you submit, a reset link will be sent to your email's inbox to reset your password.
          </p>

          {/* Reset Password Form */}
          <div className="flex flex-col dirtyWhite">
            <div className="card bg-white max-w-md shrink-0">
              <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="block font-poppins text-gray-700 font-medium">
                      Email
                    </span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="input input-bordered font-poppins"
                    value={adminEmail} // Populate with the fetched email
                    readOnly // Make the input read-only
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn font-poppins font-medium bg-blue text-white rounded-md px-[160px] mt-4"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
