import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { mindpath, logo } from '../assets';
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State for error messages
    const navigate = useNavigate(); // Initialize navigate
    const db = getFirestore(); // Initialize Firestore

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Sign in the user
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            // Fetch user role from Firestore
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const userType = userData.userType; // Assume userType is the field storing roles
    
                // Check if user is admin
                if (userType === 'superAdmin' || userType === 'generalAdmin') {
                    console.log("User logged in successfully.");
                    localStorage.setItem('authUser', JSON.stringify(user)); // Store user info in localStorage
                    navigate("/dashboard"); // Redirect to the dashboard page
                } else {
                    setError("Access denied: You do not have admin rights.");
                }
            } else {
                setError("No user found in the database.");
            }
        } catch (error) {
            console.error("Error logging in: ", error);
            setError("Login failed. Please check your credentials.");
        }
    };

    return (
        <>
            <div className="w-full overflow-hidden">
                <div className="text-center mt-[150px]">
                    <img 
                        src={logo} 
                        alt="MindPath" 
                        className="w-[120px] object-contain mx-auto" 
                    />
                    {/* <p className="font-poppins font-medium text-gray-100 text-black ss:text-[26px] text-[14px] mt-10">
                        Welcome Admin <span className="text-1xl wave"> &#128075; </span>
                    </p> */}
                    <p className="font-poppins font-medium text-gray-100 text-black text-[30px] mt-6 mb-4">
                        Welcome Admin 
                    </p>
                    
                    <div className="text-center">
                        <a className="font-poppins text-blue-500 hover:underline">
                            <Link to="/">Don't have an account yet? </Link>
                        </a>
                    </div>
                    
                </div>

                {/* Login Form */}
                <div className="flex flex-col items-center dirtyWhite">
                    <div className="card bg-white max-w-md shrink-0">                
                        <form className="card-body" onSubmit={handleSubmit}>
                            {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
                            <div className="form-control">  
                                <label className="label">
                                    <span className="block font-poppins text-gray-700 font-medium"></span>
                                </label>
                                <input
                                    type="email"
                                    className="input input-bordered font-poppins bg-red"
                                    placeholder='Email'
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="form-control">
                            <label className="label">
                                <span className="block font-poppins text-gray-700 font-medium"></span>
                            </label>
                            <div className="relative w-full">
                                <input
                                type={passwordShown ? "text" : "password"}
                                className="input input-bordered font-poppins w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                                placeholder='Password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                                <span
                                onClick={togglePasswordVisiblity}
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                >
                                {passwordShown ? (
                                    <EyeIcon className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                )}
                                </span>
                            </div>

                            {/* Forgot Password Link */}
                            <div className="mt-4 text-right">   
                                <a className="font-poppins text-blue-500 hover:underline">
                                <Link to="/ForgotPassword">Forgot Password? </Link>
                                </a>
                            </div>

                            </div>

                            <button type="submit" className="btn btn-wide font-poppins font-bold bg-blue text-white rounded-xl px-[160px] mt-2">
                                Login
                            </button>
                            
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
