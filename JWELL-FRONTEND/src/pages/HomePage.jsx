import React, { useEffect, useState } from 'react'
import AuthPopBox from '../components/AuthPopBox'
import delosRing from '../assets/imgs/delos_ring.webp'

function HomePage() {

  const [showAuth, setShowAuth] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState('')
  
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
    
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('loggedInUser')
      setTimeout(() => {
        setShowAuth(true)   
      }, 2500);  
    
  }

  return (
    <>

    {/* 👇 asset for future */}
      {/* <div className="wrapper bg-amber-300 h-auto w-screen">
        <video
          height="100%"
          width="100%"
          src="https://www.youtube.com/watch?v=hydk9hHO1Ko"
        />

        <p>
          welcome to the house {loggedInUser}
        </p>

        <button
          onClick={handleLogout}
          className="logout-btn bg-purple-950 text-white mt-5 rounded-3xl px-10 py-2"
        >
          logout
        </button>
      </div>

     
      {showAuth && (
        <AuthPopBox closeAuth={() => setShowAuth(false)} />
      )} */}
       
       <div className="home_wrapper bg-red-900 h-auto w-screen ">
              <div className="product_display_ring h-[100vh] w-[100vw] bg-amber-500 flex justify-center items-center ">
                   <div className="product_main bg-gray-50 h-[90%] w-[95%] flex flex-col justify-center items-center p-2">

                    <div className="product_top  h-[50%] w-[100%] flex gap-0.5 p-0.5">

                    <div className="product_ring bg-amber-300 h-[100%] w-[50%] rounded-[4px]">
                      
                      <div className="product_img bg-pink-300 h-[70%] w-[100%]">
                        <img className='h-[100%] w-[100%]' src={delosRing} alt="" />
                      </div>

                      <div className="product_info bg-white h-[30%] w-[100%]
                      flex flex-col justify-start items-start gap-1.5 p-1.5">

                        <div className="product_cat text-[0.65rem] underline">RINGS</div>
                        <div className="product_name text-[0.7rem]">DELOS RING</div>
                        <div className="product_price text-[0.6rem]">$410.00</div>
                      </div>
                    </div>
                     <div className="product_ring bg-amber-300 h-[100%] w-[50%] rounded-[4px]">
                      
                      <div className="product_img bg-pink-300 h-[70%] w-[100%]">
                        <img className='h-[100%] w-[100%]' src={delosRing} alt="" />
                      </div>

                      <div className="product_info bg-white h-[30%] w-[100%]
                      flex flex-col justify-start items-start gap-1.5 p-1.5">

                        <div className="product_cat text-[0.65rem] underline">RINGS</div>
                        <div className="product_name text-[0.7rem]">DELOS RING</div>
                        <div className="product_price text-[0.6rem]">$410.00</div>
                      </div>
                    </div>



                    </div>


                    <div className="product_bottom  h-[50%] w-[100%] flex gap-0.5 p-0.5">

                     <div className="product_ring bg-amber-300 h-[100%] w-[50%] rounded-[4px]">
                      
                      <div className="product_img bg-pink-300 h-[70%] w-[100%]">
                        <img className='h-[100%] w-[100%]' src={delosRing} alt="" />
                      </div>

                      <div className="product_info bg-white h-[30%] w-[100%]
                      flex flex-col justify-start items-start gap-1.5 p-1.5">

                        <div className="product_cat text-[0.65rem] underline">RINGS</div>
                        <div className="product_name text-[0.7rem]">DELOS RING</div>
                        <div className="product_price text-[0.6rem]">$410.00</div>
                      </div>
                    </div>
                 
                 
                     <div className="product_ring bg-amber-300 h-[100%] w-[50%] rounded-[4px]">
                      
                      <div className="product_img bg-pink-300 h-[70%] w-[100%]">
                        <img className='h-[100%] w-[100%]' src={delosRing} alt="" />
                      </div>

                      <div className="product_info bg-white h-[30%] w-[100%]
                      flex flex-col justify-start items-start gap-1.5 p-1.5">

                        <div className="product_cat text-[0.65rem] underline">RINGS</div>
                        <div className="product_name text-[0.7rem]">DELOS RING</div>
                        <div className="product_price text-[0.6rem]">$410.00</div>
                      </div>
                    </div>

                    </div>

                    
                    

                   </div>
              </div>
       </div>


    </>
  )
}

export default HomePage
