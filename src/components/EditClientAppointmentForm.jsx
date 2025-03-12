import React, { useState, useEffect } from 'react'; 
import { Link } from "react-router-dom";
import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid"; 

import AppointmentDataService from "../services/appointment.service"

const EditClientAppointmentForm = ({ id }) => {

  const [message, setMessage] = useState({ error: false, msg: "" });
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  
  // State variables...
  const [firstname, setfirstname] = useState("");
  const [middlename, setmiddlename] = useState("");
  const [surname, setsurname] = useState("");
  const [email, setemail] = useState("");
  const [suffix, setsuffix] = useState("");
  const [gender, setgender] = useState("");
  const [region, setregion] = useState("");
  const [province, setprovince] = useState("");
  const [cityMunicipality, setcityMunicipality] = useState("");
  const [barangay, setbarangay] = useState("");
  // const [dateTime, setdateTime] = useState("");
  const [status, setstatus] = useState("");
  // const [isAgree, setisAgree] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Validate required fields
    if (
      firstname === "" || 
      surname === "" || 
      gender === "" || 
      email === "" ||
      region === "" ||
      province === "" ||
      cityMunicipality === "" ||
      barangay === "" ||
      // dateTime === "" ||
      status === "" 
    ) {
      setMessage({ error: true, msg: "Alert: You must fill in all required fields marked with an asterisk (*) to proceed with your submission." });
      return;
    }

    const updatedAppointment = {
      firstname,
      middlename,
      surname,
      gender,
      email,
      suffix,
      region,
      province,
      cityMunicipality,
      barangay,
      // dateTime,
      // isAgree,
      status,
    };

    try {
      await AppointmentDataService.updateAppointment(id, updatedAppointment);
      setMessage({ error: false, msg: "Appointment Updated Successfully!" });
      setIsModalOpen(true); // Open the modal on successful submission
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  }; 

      // Fetch data for editing
  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await AppointmentDataService.getAppointment(id);
      console.log("The record is:", docSnap.data());
      setfirstname(docSnap.data().firstname); 
      setmiddlename(docSnap.data().middlename); 
      setsurname(docSnap.data().surname); 
      setgender(docSnap.data().gender); 
      setemail(docSnap.data().email); 
      setsuffix(docSnap.data().suffix); 
      setregion(docSnap.data().region); 
      setprovince(docSnap.data().province); 
      setcityMunicipality(docSnap.data().cityMunicipality); 
      setbarangay(docSnap.data().barangay); 
      setstatus(docSnap.data().status); 
      // setisAgree(docSnap.data().isAgree); 
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The ID here is:", id);
    if (id) {
      editHandler();
    }
  }, [id]);

  return (
    <div className="flex h-screen">
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
                <Link to="/Appointment" className="flex items-center gap-2">
                <ChevronLeftIcon strokeWidth={2} className="h-4 w-4" />
                <span>Back</span>
                </Link>
            </button>

            <h1 className="text-[24px] text-black font-bold mb-6">Interviewee Information</h1>
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
                            id="firstname"
                            value={firstname}
                            onChange={(e) => setfirstname(e.target.value)}
                            size="lg"
                            placeholder="Firstname"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            readOnly
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
                            id="middlename"
                            value={middlename}
                            onChange={(e) => setmiddlename(e.target.value)}
                            size="lg"
                            placeholder="Middlename"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            readOnly
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
                            id="surname"
                            value={surname}
                            onChange={(e) => setsurname(e.target.value)}
                            size="lg"
                            placeholder="Surname"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            readOnly
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
                                readOnly
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
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                readOnly
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
                                value={gender}
                                onChange={(e) => setgender(e.target.value)}
                                readOnly
                                className="w-full border border-t-blue-gray-200 focus:border-t-gray-900 px-4 py-2 rounded-lg text-gray-700"
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
                            readOnly
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
                            readOnly
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
                            readOnly
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
                            readOnly
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>
                </div>
                <Typography variant="h6" className="font-light text-[20px] mb-2 mt-4 text-[#B8B7B7]">
                    Appointment Status
                </Typography>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-2">
                                Status <span className="text-red-500">*</span>
                            </Typography>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setstatus(e.target.value)}
                                className="w-full border border-t-blue-gray-200 focus:border-t-gray-900 px-4 py-2 rounded-lg text-gray-700"
                            >
                                <option value="Upcoming" disabled>Upcoming</option>
                                <option value="Done">Done</option>
                                <option value="Ongoing">Ongoing</option>
                                <option value="No Show">No Show</option>
                            </select>
                        </div>   
                       </div>                

                <Button type="submit" variant="outlined" className="mt-8">Update Appointment</Button>
            </form>
            {/* Modal Confirmation */}
            {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="modal modal-open">
                <div className="modal-box">
                    <h2 className="font-poppins font-bold text-lg py-4">Appointment Updated🎉</h2>
                    <div className="modal-action">
                    <button className="btn" onClick={() => setIsModalOpen(false)}>Close</button>
                    </div>
                </div>
                </div>
            </div>
            )}   
        </main>
    </div>
  )
}

export default EditClientAppointmentForm;