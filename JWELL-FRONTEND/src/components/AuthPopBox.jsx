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
            const url = "http://localhost:8080/auth/login";
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
                navigate('/home');

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
            const url = "http://localhost:8080/auth/register";
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
      {/* OVERLAY */}
      <div
        className="fixed inset-0 bg-black/40"
        onClick={closeAuth}
      />

      {/* POPUP BOX */}
      <div className="auth_wrapper h-auto w-screen  fixed inset-0 flex justify-center items-center overflow-y-auto pt-0">
      {isLoginPage && (

        <div className="login_parent  h-[95%] w-[85%] p-1 rounded-lg shadow-lg relative flex flex-col gap-0.5 ">

          <div className="auth_topbox  bg-white rounded-sm w-[100%] h-[35%] 500 flex flex-col gap-1 p-1 ">

            <div className="login_&_registration_btn 200 w-[100%] h-[40%] flex flex-col justify-center items-center relative">
              <div className="exit_btn w-[5%] justify-self-end absolute top-2 right-2 cursor-pointer" onClick={closeAuth}>
                <img src={exit_btn} alt="" />
              </div>
              
              <div className="login_&_reg_box bg-red-000 w-[80%] h-[65%] flex justify-center items-center gap-4">
   
                  <button className='login_page_btn text-[1.7rem]'>Login</button>
                  or
                  <button className='reg_page_btn text-[1.7rem]'
                  onClick={() => setIsLoginPage(false)}>Register</button>

              </div>

            </div>

            <div className="login_&_registration_text 200 w-[100%] h-[15%] flex justify-center items-center">
              <span className='bg-red-0 w-[80%] text-[0.9rem] text-center' >Are you new? Please <span className='underline '
              onClick={() => setIsLoginPage(false)}>register</span> , or login via</span>
            </div>

            <div className="via_auth 200 w-[100%] h-[40%] flex justify-center items-center">
              
              <div className="w-[85%] h-[95%] bg-amber-0  flex justify-evenly items-center">
                <div className="facebook_auth bg-pink-00 h-[70%] w-[21%] rounded-full border-1 flex justify-center items-center">
                  <img src={facebook_logo}  width={`25rem`} alt="" />
                </div>
                <div className="google_auth bg-pink-00 h-[70%] w-[21%] rounded-full border-1 flex justify-center items-center">
                  <img src={google_logo}  width={`25rem`} alt="" />
                </div>
                <div className="apple_auth bg-pink-00 h-[70%] w-[21%] rounded-full border-1 flex justify-center items-center">
                  <img src={apple_logo}  width={`25rem`} alt="" />
                </div>
              </div>
            </div>


          </div>

          <div className="auth_bottombox bg-white rounded-sm w-[100%] h-[65%] 700 flex flex-col gap-1 p-1 ">

            <div className="auth_formbox 300 w-[100%] h-[60%] flex flex-col justify-center items-center gap-4">
   

              <form id='loginForm'onSubmit={handleLogin}
              className='w-[100%] h-[95%] flex flex-col justify-center items-center gap-3' >
               
               
                <input
                onChange={handleLoginChange}
              value = {loginInfo.email}
              name='email'
                type="email" placeholder='Email Address' className='w-[95%] h-[40%] p-2 rounded-sm  border'/>
            
                <input
                onChange={handleLoginChange}
                value = {loginInfo.password}
                name='password'
                 type="password" placeholder='Password' className='w-[95%] h-[40%] p-2 rounded-sm border'/>
              </form>
              
            </div>

            <div className="forgot_password_btn 300 w-[100%] h-[10%] flex justify-center items-center ">
              <span className="forgot_password_text underline ">forgot password?</span>
            </div>

            <div className="login_btn h-[30%] w-[100%] 300 flex justify-center items-center ">
            <button
            type='submit'
            form='loginForm'
            onClick={(e) =>{e.stopPropagation()}}
            
            className=' bg-black h-[65%] w-[70%] rounded-md text-white'>LOGIN</button>
            </div>



          </div>

        </div>

        )}

        {!isLoginPage && (

         <div className="register_parent h-[140%] w-[85%] p-1 rounded-lg shadow-lg relative flex flex-col gap-0.5 bg-white mt-85 mb-3 ">

          <div className="exit_back_btns bg-red-0 w-[100%] h-[4%] flex justify-between items-center p-2"> 
            
            <div className="back_btn w-[8%]"
            onClick={() => setIsLoginPage(true)}>
              <img src={back_btn} alt="" />
            </div>
            
            <div className="exit_btn w-[6%]"
            onClick={closeAuth}>
              <img src={exit_btn} alt="" />
            </div>

          </div>

          <div className="welcome_text h-[15%] w-[100%]  flex flex-col justify-center items-center gap-5">
            <p className="text-[1.2rem] font-bol ">WELCOME TO HOUSE OF LINAS</p>
            <p className="text-[0.9rem] ">Already a member? Click here to <span className='underline' onClick={() => setIsLoginPage(true)}>login</span> .</p>
          </div>

            <div className="register_form  w-[100%]   h-[55%] flex flex-col justify-center items-center gap-4">

                <form
                id='registerForm'
                onSubmit={handleRegister}
                className='  w-[100%] h-[95%] flex flex-col justify-center items-center gap-3' action="">

                 <input
                  onChange={handleChange}
                  value = {registerInfo.firstName}
                 type="text" name='firstName' placeholder='First Name' className='w-[95%] h-[40%] p-2 rounded-sm  border'/>

                 <input
                  onChange={handleChange}
                  value = {registerInfo.lastName}
                 type="text" name='lastName' placeholder='Last Name' className='w-[95%] h-[40%] p-2 rounded-sm  border'/>


                <input
                  onChange={handleChange}
                  value = {registerInfo.email}
                type="email" name='email' placeholder='Email Address' className='w-[95%] h-[40%] p-2 rounded-sm  border'/>
            
                <input
                  onChange={handleChange}
                  value = {registerInfo.password}
                type="password" name='password' placeholder='Password' className='w-[95%] h-[40%] p-2 rounded-sm border'/>

                <input
                  onChange={handleChange}
                  value = {registerInfo.confirmPassword}
                type="password" name='confirmPassword' placeholder='Confirm Password' className='w-[95%] h-[40%] p-2 rounded-sm border'/>
              </form>
              

            </div>

            <div className="privacy_policy_text w-[100%] h-[12%]  flex justify-center items-center ">
              <p className='bg-red-0 h-[80%] w-[80%] text-[0.8rem]'>By registering, you agree to your personal information being used to process your orders, to support your experience on this site and for other purposes described in the Privacy Policy.</p>
            </div>

            <div className="register_btn  w-[100%] h-[12%]  flex justify-center items-center">
              <button
              type='submit'
              form='registerForm'

              
              className=' bg-black h-[65%] w-[70%] rounded-md text-white'>REGISTER</button>
            </div>




          
         
        </div>

        )}
      </div>

      
    </>
  )
}

export default AuthPopBox
