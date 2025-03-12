import React from 'react';
import { mindpath } from '../assets';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

  const history = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault()
    const emailVal = e.target.email.value;
    sendPasswordResetEmail(auth,emailVal).then(data=>{
      alert("Check your Email")
      history("/LoginPage")
    }).catch(err=>{
      alert(err.code)
    })

  } 

  return (
    <div className="w-full overflow-hidden">
    <div className="text-center mt-[150px]">
        <img 
            src={mindpath} 
            alt="MindPath" 
            className="w-[200px] object-contain mx-auto mb-12" 
        />
        <h1 className="font-poppins font-bold ss:text-[40px] text-[30px] text-black">Forgot Password</h1>
        <p className="text-[#4b5563] font-poppins mt-2">
            Once you submit, a reset link will be sent to your email's inbox to reset your password.</p>
    </div>
    {/* Reset Password Form */}
    <div className="flex flex-col items-center dirtyWhite">
        <div className="card bg-white max-w-md shrink-0">                
            <form className="card-body" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-control">  
                    <label className="label">
                        <span className="block font-poppins text-gray-700 font-medium">Email</span>
                    </label>
                    <input
                        name="email"
                        type="email"
                        className="input input-bordered font-poppins"
                        placeholder='Enter your email'
                        required
                    />
                </div>
                <button type="submit" className="btn font-poppins font-medium bg-blue text-white rounded-md px-[160px] mt-4">
                    Submit
                </button>
            </form>
        </div>
    </div>
</div>
  )
}

export default ForgotPassword