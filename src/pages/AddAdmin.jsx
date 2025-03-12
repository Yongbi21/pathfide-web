import React, { useState, useEffect } from 'react'; 
import { Link } from "react-router-dom";
import { Sidebar } from '../components';
import { Cog6ToothIcon, UserCircleIcon, PowerIcon, ChevronLeftIcon } from "@heroicons/react/24/solid"; 
import {
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from '../firebase';

import AdminDataService from "../services/admin";
import { createUserWithEmailAndPassword } from 'firebase/auth';

import emailjs from '@emailjs/browser';


const checkEmailExists = async (email) => {
    const adminCollectionRef = collection(db, "users");
    const q = query(adminCollectionRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };


// Function to generate a random password of specified length
const generatePassword = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    return password;
}


const AddAdmin = () => {

    useEffect(() => {
        // Scroll to the top of the page when the component is mounted
        window.scrollTo(0, 0);
      }, []);

      const [firstName, setfirstName] = useState("");
      const [middleName, setmiddleName] = useState("");
      const [surName, setsurName] = useState("");
      const [email, setemail] = useState("");
      const [suffix, setsuffix] = useState("");
      const [gender, setgender] = useState("");
      const [region, setregion] = useState("");
      const [province, setprovince] = useState("");
      const [cityMunicipality, setcityMunicipality] = useState("");
      const [barangay, setbarangay] = useState("");



      const [message, setMessage] = useState({ error: false, msg: "" });
      const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

      const [newAccountEmail, setNewAccountEmail] = useState(""); // State to store the new account email
      const [newAccountPassword, setNewAccountPassword] = useState(""); // State to store the new account password
    
        // Generate a 7-character password
        const password = generatePassword(7);

      const handleSubmit = async (e) => {
        e.preventDefault();

        //Your EmailJS service ID, template ID, and Public Key
        const serviceId = 'service_g9e03es';
        const templateId = 'template_k5z60rd';
        const publicKey = 'p3JShQscBfPKFgNIb';

        //Create a new object that contains dynamic template parameters
        const templateParams = {
            from_name: 'MindPath',
            from_email: email,
            to_name: firstName,
            temp_pass: password,
        }; 

        // Send the email using EmailJS
        emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then((response) => {
            console.log('Email send successfully!', response);
            setfirstName('');
            setemail('');
            password('');
        })
        .catch((error) => {
            console.error('Error sending email:', error);
        });

        setMessage("");
    
        // Validate required fields
        if (
            firstName === "" || 
            surName === "" || 
            gender === "" || 
            email === "" ||
            region === "" ||
            province === "" ||
            cityMunicipality === "" ||
            barangay === "" 
        ) {
            setMessage({ error: true, msg: "Alert: You must fill in all required fields marked with an asterisk (*) to proceed with your submission." });
            return;
        }
    
        // Check if email already exists
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            setMessage({ error: true, msg: "Email already exists. Please use a different email." });
            return;
        }

    
        const newAdmin = {
            firstName,
            middleName,
            surName,
            gender,
            email,
            suffix,
            region,
            province,
            cityMunicipality,
            barangay,
            userType: "generalAdmin",
            accountStatus: "ACTIVE",
            password, // Include the generated password
        };
    
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const uid = user.uid; // Capture the UID from Firebase Auth
    
            // Add the UID to the newAdmin object
            newAdmin.uid = uid;
    
            console.log(user);
            console.log("User Registered Successfully!!");
    
            // Pass the UID to the addAdmin function
            await AdminDataService.addAdmin(newAdmin);
    
            setMessage({ error: false, msg: "Account Created Successfully!" });
            setNewAccountEmail(email); // Set the new account email
            setNewAccountPassword(password); // Set the new account password
            setIsModalOpen(true); // Open the modal on successful submission
        } catch (err) {
            setMessage({ error: true, msg: err.message });
        }
    
        // Clear form fields after submission
        setfirstName("");
        setmiddleName("");
        setsurName("");
        setgender("");
        setemail("");
        setsuffix("");
        setregion("");
        setprovince("");
        setcityMunicipality("");
        setbarangay("");
    };

        // Scroll to the top when there is an error message
        useEffect(() => {
            if (message.error) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, [message]);
        
    

    const [dropdownOpen, setDropdownOpen] = useState(false); // Initialize state for dropdown visibility

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
    };


  return (
    <div className="flex h-screen">
    {/* Sidebar */}
    <Sidebar />

    {/* Main Content Area */}
    <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-6 bg-white">
            {/* Title */}
            <h1 className="font-poppins text-[24px] text-[#757575] font-light"></h1>

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
        <main className="flex-1 px-6 py-4 font-poppins">
            {/* Conditional Warning Alert */}
            {message.error && (
            <div role="alert" className="alert alert-warning mb-4">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
                </svg>
                <span>{message.msg}</span>
            </div>
            )}

            <button className="flex items-center gap-3 mb-4 font-poppins text-thin" size="sm">
                <Link to="/Administrators" className="flex items-center gap-2">
                <ChevronLeftIcon strokeWidth={2} className="h-4 w-4" />
                <span>Back</span>
                </Link>
            </button>

            <h1 className="text-[24px] text-black font-bold mb-6">Add New Admin</h1>
            <form className="" onSubmit={handleSubmit}>
                <Typography variant="h6" className="font-light text-[20px] mb-2 text-[#B8B7B7]">
                    Personal Information
                </Typography>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-2">
                            Firstname <span className="text-red-500">*</span>
                        </Typography>
                        <Input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setfirstName(e.target.value)}
                            size="lg"
                            placeholder="Firstname"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-2">
                            Middlename
                        </Typography>
                        <Input
                            type="text"
                            id="middleName"
                            value={middleName}
                            onChange={(e) => setmiddleName(e.target.value)}
                            size="lg"
                            placeholder="Middlename"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-2">
                            Surname <span className="text-red-500">*</span>
                        </Typography>
                        <Input
                            type="text"
                            id="surName"
                            value={surName}
                            onChange={(e) => setsurName(e.target.value)}
                            size="lg"
                            placeholder="Surname"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-2">
                            Suffix
                        </Typography>
                            <select
                            id="gender"
                            value={suffix}
                            onChange={(e) => setsuffix(e.target.value)}
                            className="w-full border border-t-blue-gray-200  focus:border-t-gray-900 px-4 py-2 rounded-lg text-gray-700"
                            >
                            <option value="" disabled>
                                -- Select Suffix --
                            </option>
                            <option value="Jr.">Jr.</option>
                            <option value="Sr.">Sr.</option>
                            <option value="III">III</option>
                            <option value="IV">IV</option>
                            <option value="V">V</option>
                        </select>
                    </div>                       
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 mt-4">
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-2">
                                Email <span className="text-red-500">*</span>
                            </Typography>
                            <Input
                            type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                size="lg"
                                placeholder="Email"
                                className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${message.error && message.msg.includes("Email already exists") ? 'input-error' : ''}`}
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-2">
                                Gender <span className="text-red-500">*</span>
                            </Typography>
                            <select
                                id="gender"
                                className="w-full border border-t-blue-gray-200 focus:border-t-gray-900 px-4 py-2 rounded-lg text-gray-700" 
                                value={gender}
                                onChange={(e) => setgender(e.target.value)}
                                >
                                <option value="" disabled>
                                    -- Select Gender --
                                    </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                </select>
                        </div>
                    </div> 
                <Typography variant="h6" className="font-light text-[20px] mb-2 mt-4 text-[#B8B7B7]">
                    Complete Address
                </Typography>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-2">
                            Region <span className="text-red-500">*</span>
                        </Typography>
                        <Input
                        type="text"
                            id="region"
                            value={region}
                            onChange={(e) => setregion(e.target.value)}
                            size="lg"
                            placeholder="Region"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-2">
                            Province <span className="text-red-500">*</span>
                        </Typography>
                        <Input
                            type="text"
                            id="province"
                            value={province}
                            onChange={(e) => setprovince(e.target.value)}
                            size="lg"
                            placeholder="Province"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-2">
                            City/Municipality <span className="text-red-500">*</span>
                        </Typography>
                        <Input
                            type="text"
                            id="cityMunicipality"
                            value={cityMunicipality}
                            onChange={(e) => setcityMunicipality(e.target.value)}
                            size="lg"
                            placeholder="City/Municipality"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-2">
                            Barangay <span className="text-red-500">*</span>
                        </Typography>
                        <Input
                            type="text"
                            id="barangay"
                            value={barangay}
                            onChange={(e) => setbarangay(e.target.value)}
                            size="lg"
                            placeholder="Barangay"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>
                </div>
                <Button type="submit" variant="outlined" className="mt-8">Create Account</Button>
            </form>
        </main>
    </div>
{/* Modal Confirmation */}
{isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="font-poppins font-bold text-lg py-4">New Account Added! 🎉</h2>
        {/* <p>Email: {newAccountEmail}</p>
        <p>Password: {newAccountPassword}</p> */}
         <p>Account credentials have been sent to {newAccountEmail}. Please inform the user to check their inbox.</p>
        <div className="modal-action">
          <button className="btn" onClick={() => setIsModalOpen(false)}>Close</button>
        </div>
      </div>
    </div>
  </div>
)}          
</div>
  );
};

export default AddAdmin;