import React, { useState, useEffect } from 'react';
import styles from "../style";
import { Link } from "react-router-dom";

import pr1 from "../assets/pr1.jpg";
import pr2 from "../assets/pr2.jpg";
import pr3 from "../assets/pr3.jpg";
import pr4 from "../assets/pr4.jpg"; // Add more images as needed
import pr5 from "../assets/pr5.jpg";

const Appointment = () => {
  // Separate states for each image slider
  const [currentImageIndex1, setCurrentImageIndex1] = useState(0);
  const [currentImageIndex2, setCurrentImageIndex2] = useState(0);
  const [currentImageIndex3, setCurrentImageIndex3] = useState(0);

  // Separate image arrays for each slider
  const images1 = [pr5, pr4, pr1, pr2, pr3];
  const images2 = [pr1, pr3, pr2, pr5, pr4];
  const images3 = [pr2, pr1, pr3, pr4, pr5];

  // Effect for the first slider
  useEffect(() => {
    const interval1 = setInterval(() => {
      setCurrentImageIndex1((prevIndex) => (prevIndex + 1) % images1.length);
    }, 5000); // Change image every 2 seconds

    return () => clearInterval(interval1); // Cleanup interval on component unmount
  }, [images1.length]);

  // Effect for the second slider
  useEffect(() => {
    const interval2 = setInterval(() => {
      setCurrentImageIndex2((prevIndex) => (prevIndex + 1) % images2.length);
    }, 5000); // Change image every 2 seconds

    return () => clearInterval(interval2); // Cleanup interval on component unmount
  }, [images2.length]);

  // Effect for the third slider
  useEffect(() => {
    const interval3 = setInterval(() => {
      setCurrentImageIndex3((prevIndex) => (prevIndex + 1) % images3.length);
    }, 5000); // Change image every 2 seconds

    return () => clearInterval(interval3); // Cleanup interval on component unmount
  }, [images3.length]);

  return (
    <section id="trusted-clients" className={`flex flex-col items-center ${styles.paddingY}`}>
      <div className="text-center">
      <span className="font-poppins block text-xs font-medium tracking-widest text-center uppercase text-white">Join us now</span>
        <h1 className="font-poppins font-bold ss:text-[42px] text-[38px] text-white mb-4 mt-[20px]">
          Join Our Community of Professional Therapists
        </h1>
        <p className="font-poppins font-light text-white/80 ss:text-[18px] text-[16px]">
          Connect with clients seeking your expertise. </p>   
        <p className="font-poppins font-light text-white/80 ss:text-[18px] text-[16px]">
          Schedule a face-to-face interview to verify your eligibility and start your journey with us!</p>   
      </div>
      
      <button className="btn btn-wide font-poppins font-bold text-[15px] bg-white text-blue rounded-md m-[50px] mb-[50px]" onClick={()=>document.getElementById('my_modal_3').showModal()}>
        Schedule Interview
      </button>

      {/* Professional Images Slider */}
      <div className="flex justify-center gap-4 mt-4">
        {/* Slider 1 */}
        <img src={images1[currentImageIndex1]} alt={`Professional ${currentImageIndex1 + 1}`} className="w-50 h-80 object-cover rounded-lg" />
        
        {/* Slider 2 */}
        <img src={images2[currentImageIndex2]} alt={`Professional ${currentImageIndex2 + 1}`} className="w-50 h-80 object-cover rounded-lg" />
        
        {/* Slider 3 */}
        <img src={images3[currentImageIndex3]} alt={`Professional ${currentImageIndex3 + 1}`} className="w-50 h-80 object-cover rounded-lg" />
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-11/12 max-w-5xl p-12">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-poppins font-medium text-[24px] mb-2">Prepare for Your Interview Appointment</h3>
          <p className="">
            To verify your eligibility during the face-to-face interview, please bring the following documents:
          </p>
          <ul className="list-disc pl-5 py-2">
            <li>A copy of your current professional license.</li>
            <li>An updated resume.</li>
            <li>A government-issued photo ID for identity verification.</li>
          </ul>
          <li className="btn btn-wide font-poppins font-bold bg-blue text-white rounded-md mt-4">
            <Link to="/AppointmentPage">Proceed</Link>
          </li>
        </div>
      </dialog>
    </section>
  );
};

export default Appointment;