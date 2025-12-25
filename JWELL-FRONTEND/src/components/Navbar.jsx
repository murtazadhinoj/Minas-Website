import React, { useState } from 'react'
import Search_icon from '../assets/imgs/search_icon.png'
import login_icon from '../assets/imgs/login_icon.png'
import cart_icon from '../assets/imgs/add_cart.png'
import NavbarMenu from '../components/NabvarMenu'
import AuthPopBox from '../components/AuthPopBox'
import AddCart from '../components/AddCart'

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <>
      <div className="wrapper w-screen h-auto">

        <div className="navbar_main w-full h-[11vh] flex justify-between items-center px-4">

          {/* LEFT */}
          <div className="left_box_nav flex justify-between items-center w-[30%]">

            <div
              className="burger_button cursor-pointer"
              onClick={() => setMenuOpen(true)}
            >
              <div className="line1 bg-black h-px w-[37px] m-2"></div>
              <div className="line2 bg-black h-px w-[37px] m-2"></div>
            </div>

            <div className="search_button h-[30px] w-[30px] flex justify-center items-center">
              <img src={Search_icon} alt="search" />
            </div>

          </div>

          {/* LOGO */}
          <div className="nav_logo">
            <span>LOGO</span>
          </div>

          {/* RIGHT */}
          <div className="right_box_nav flex justify-between items-center w-[25%]">

            {/* LOGIN */}
            <div
              className="login_button h-[30px] w-[30px] flex justify-center items-center cursor-pointer"
              onClick={() => setAuthOpen(true)}
            >
              <img src={login_icon} alt="login" />
            </div>

            <div className="add_cart_button h-[30px] w-[30px] flex justify-center items-center relative"
            onClick={() => setCartOpen(true)}>
              <img src={cart_icon} alt="cart" />
              <div className="cart_count absolute top-2 right-3">
                <span className="text-xs">1</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* MENUS */}
      {menuOpen && <NavbarMenu closeMenu={() => setMenuOpen(false)} />}
      {authOpen && <AuthPopBox closeAuth={() => setAuthOpen(false)} />}
        {cartOpen && <AddCart closeCart={() => setCartOpen(false)} /> }

    </>
  )
}

export default Navbar
