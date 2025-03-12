import React from 'react';
import styles from "../style";
import { Link, useLocation } from "react-router-dom";

const MindPathLogin = () => {
  return (
    <div className="flex items-center justify-center h-screen font-poppins bg-gray-100">
      <div className="text-center w-full p-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Unauthorized Access Warning
        </h2>
        <div className="max-w-md mx-auto">
          <p className="text-gray-700 mb-4 text-[12]">
            This area is restricted to authorized users only. If you do not have permission or were redirected here by mistake, please exit immediately. 
            Unauthorized access may be monitored and reported.
          </p>
        </div>
        <p className="text-gray-700 mb-6">
          If you are authorized to access this page, please proceed!
        </p>
        <li className="btn btn-wide font-poppins font-bold bg-blue text-white rounded-md mt-4">
            <Link to="/LoginPage">Proceed</Link>
        </li>
      </div>
    </div>
  );
};

export default MindPathLogin;