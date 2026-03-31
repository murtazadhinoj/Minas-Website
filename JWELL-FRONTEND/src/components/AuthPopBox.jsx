import  { React, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import exit_btn from '../assets/imgs/exit_btn.png';
import back_btn from '../assets/imgs/arrow.png';

import apple_logo from '../assets/imgs/apple_logo.png';
import google_logo from '../assets/imgs/google_logo.png';
import facebook_logo from '../assets/imgs/facebook_logo.png';
import { handleError, handleSuccess } from '../utils';

function AuthPopBox({ closeAuth }) {

    const navigate = useNavigate();

    const [isLoginPage, setIsLoginPage] = useState(true);


  // logic for fetching data from login form

  const [loginInfo, setloginInfo] = useState({
    email: '',
    password: ''
  
  });

  const handleLoginChange = (e) => {
     const { name, value } = e.target;
     const copyloginInfo = {...loginInfo};
     copyloginInfo[name] = value;
     setloginInfo(copyloginInfo);
  }

  const handleLogin   = async (e) => {
    e.preventDefault();
    // add logic for signup api call
    const { email, password } = loginInfo;
      if( !email || !password ){
        console.log("Email is:", email);
        console.log("pass is:", password);
        return handleError('All fields are required');
      }

      try{
            const url = `${import.meta.env.VITE_API_BASE_URL}/auth/login`;
            const response = await fetch(url, {
              method: 'POST',
              headers: {
                'content-type' : 'application/json'
              },
              body: JSON.stringify(loginInfo)
            });

            const result = await response.json();
            const {success, message , jwtToken, name, error} = result;

            console.log('LOGIN RESPONSE:', result);


            if(success){
              handleSuccess(message);
              localStorage.setItem('jwtToken', jwtToken);
              localStorage.setItem('loggedInUser', name);

              setTimeout(() => {
                
                closeAuth();
                navigate('/');

              }, 1000)
            } 
            else if(error) {
             const details = error?.details[0].message;
             handleError(details);
            }

            else if (!success){
              handleError(message);
            }

        } catch(err){
            handleError(err);
        }

  }

  



  // logic for fetching data from registration form

  const [registerInfo, setregisterInfo] = useState({
    firstName: '',
    lastName: '', 
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
     const { name, value } = e.target;
     const copyregisterInfo = {...registerInfo};
     copyregisterInfo[name] = value;
     setregisterInfo(copyregisterInfo);
  }

  const handleRegister   = async (e) => {
    e.preventDefault();
    // add logic for signup api call
    const { firstName, lastName, email, password, confirmPassword } = registerInfo;
      if( !firstName || !lastName || !email || !password || !confirmPassword ){
        
        return handleError('All fields are required');
      }

      try{
            const url = `${import.meta.env.VITE_API_BASE_URL}/auth/register`;
            const response = await fetch(url, {
              method: 'POST',
              headers: {
                'content-type' : 'application/json'
              },
              body: JSON.stringify(registerInfo)
            });

            const result = await response.json();
            const {success, message , error} = result;

            if(success){
              handleSuccess(message);
              setTimeout(() => {
                  setIsLoginPage(true);
              }, 1000)
            } 
            else if(error) {
             const details = error?.details[0].message;
             handleError(details);
            }

            else if (!success){
              handleError(message);
            }

        } catch(err){
            handleError(err);
        }

  }


  

  return (
<>
  {/* Overlay */}
  <div className="fixed inset-0 z-99999 flex items-center justify-center">
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={closeAuth}
    />

    {/* Modal */}
    <div className="relative w-[95%] max-w-[520px] bg-[#f3f3f3] rounded-2xl shadow-2xl animate-splitReveal">

      {/* Close Button */}
      <div className="absolute top-5 right-5 cursor-pointer" onClick={closeAuth}>
        <img src={exit_btn} className="w-5 h-5 opacity-70 hover:opacity-100 transition" />
      </div>

      {isLoginPage ? (

        <div className="px-10 py-12 text-center">

          {/* Title */}
          <h2 className="text-[26px] tracking-wide font-medium">
            LOGIN <span className="text-gray-400 text-[18px] mx-2">or</span> REGISTER
          </h2>

          <p className="mt-4 text-sm">
            Are you new? Please{" "}
            <span
              onClick={() => setIsLoginPage(false)}
              className="underline cursor-pointer"
            >
              register
            </span>{" "}
            , or login via
          </p>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mt-6">
            {[facebook_logo, google_logo, apple_logo].map((icon, i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition"
              >
                <img src={icon} className="w-5 h-5" />
              </div>
            ))}
          </div>

          {/* Form */}
          <form
            id="loginForm"
            onSubmit={handleLogin}
            className="mt-8 space-y-4"
          >
            <input
              type="email"
              name="email"
              value={loginInfo.email}
              onChange={handleLoginChange}
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />

            <input
              type="password"
              name="password"
              value={loginInfo.password}
              onChange={handleLoginChange}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </form>

          <div className="mt-4 text-sm underline cursor-pointer">
            forgot password?
          </div>

          <button
            type="submit"
            form="loginForm"
            className="mt-8 w-[65%] mx-auto bg-black text-white py-3 rounded-md text-sm tracking-wide hover:opacity-90 transition"
          >
            LOGIN
          </button>
        </div>

      ) : (

        <div className="px-10 py-12 text-center">

          {/* Back */}
          <div
            className="absolute top-5 left-5 cursor-pointer"
            onClick={() => setIsLoginPage(true)}
          >
            <img src={back_btn} className="w-5 h-5 opacity-70 hover:opacity-100 transition" />
          </div>

          <h2 className="text-[26px] tracking-wide font-medium">
            REGISTER
          </h2>

          <p className="mt-4 text-sm">
            Already a member?{" "}
            <span
              onClick={() => setIsLoginPage(true)}
              className="underline cursor-pointer"
            >
              login
            </span>
          </p>

          <form
            id="registerForm"
            onSubmit={handleRegister}
            className="mt-8 space-y-4"
          >
            <input
              type="text"
              name="firstName"
              value={registerInfo.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />

            <input
              type="text"
              name="lastName"
              value={registerInfo.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />

            <input
              type="email"
              name="email"
              value={registerInfo.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />

            <input
              type="password"
              name="password"
              value={registerInfo.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />

            <input
              type="password"
              name="confirmPassword"
              value={registerInfo.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </form>

          <p className="mt-6 text-xs px-4">
            By registering, you agree to your personal information being used to process your orders and support your experience.
          </p>

          <button
            type="submit"
            form="registerForm"
            className="mt-8 w-[65%] mx-auto bg-black text-white py-3 rounded-md text-sm tracking-wide hover:opacity-90 transition"
          >
            REGISTER
          </button>
        </div>
      )}
    </div>
  </div>
</>
  )
}

export default AuthPopBox
