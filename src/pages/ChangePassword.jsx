import React, { useState, useEffect } from 'react';
import { sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { Sidebar } from '../components';
import { useNavigate, Link } from 'react-router-dom';
import { Cog6ToothIcon, PowerIcon } from "@heroicons/react/24/solid";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Listen for authentication changes and set the user email if available
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email); // Set the email if the user is logged in
      }
    });
    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        alert("Check your Email");
        navigate("/LoginPage");
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center p-6 bg-white">
          <h1 className="font-poppins text-[24px] text-[#757575] font-light"></h1>

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
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                <Link to="/Settings" className="flex items-center px-4 py-2 hover:bg-gray-100 font-poppins">
                  <Cog6ToothIcon className="h-5 w-5 mr-2" />
                  Settings
                </Link>
                <Link to="/LoginPage" className="flex items-center px-4 py-2 hover:bg-gray-100 font-poppins">
                  <PowerIcon className="h-5 w-5 mr-2" />
                  Logout
                </Link>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 px-6 py-4 font-poppins">
          <h1 className="font-poppins text-[24px] text-black font-bold mb-2">Change Password</h1>
          <p className="text-[#4b5563]">
            Once you submit, an email with a reset link will be sent to <span className="font-bold text-black">{userEmail}</span> inbox. 
            <p className="text-[#4b5563]">
            Follow the link to change your password.</p>
          </p>
          <div className="flex dirtyWhite">
            <div className="card bg-white max-w-md shrink-0">
              <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="block font-poppins text-gray-700 font-medium">Email</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="input input-bordered font-poppins"
                    placeholder="Enter your email"
                    value={userEmail} // Set the value to userEmail state
                    readOnly // Make it read-only if you want the email to be non-editable
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

export default ChangePassword;
