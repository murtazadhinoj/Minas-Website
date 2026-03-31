 import React, { useState, useEffect, useRef } from "react";  
  import Search_icon from "../assets/imgs/search_icon.png";
  import login_icon from "../assets/imgs/login_icon.png";
  import cart_icon from "../assets/imgs/add_cart.png";

  import NavbarMenu from "../components/NabvarMenu";
  import AuthPopBox from "../components/AuthPopBox";
  import AddCart from "../components/AddCart";
  import CheckOut from "../components/CheckOut";
  import OrderSuccess from "./orderSuccess";
  import { useCartContext } from "../Context/cartContext";

  function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [orderId, setOrderId] = useState(null);

const [isTransparent, setIsTransparent] = useState(true);
const [isHidden, setIsHidden] = useState(false);

const lastScrollY = useRef(0);

const { cart } = useCartContext();

const totalItems = cart.reduce(
  (total, item) => total + item.quantity,
  0
);

useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Detect direction
    if (currentScrollY > lastScrollY.current) {
      // Scrolling down
      setIsHidden(true);
    } else {
      // Scrolling up
      setIsHidden(false);
    }

    // Transparency logic
    if (currentScrollY > 50) {
      setIsTransparent(false);
    } else {
      setIsTransparent(true);
    }

    lastScrollY.current = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

    return (
      <>
        {/* NAVBAR */}
        <div className="pt-[11vh]">
            <div className="wrapper w-screen h-auto">
              
              <div
      className={`
        navbar_main 
        fixed top-0 left-0 w-full h-[11vh] z-50
        flex justify-between items-center px-4 
        transition-all duration-500 ease-in-out
       ${isTransparent 
  ? "bg-white/10 backdrop-blur-md" 
  : "bg-white shadow-md"}
        ${isHidden ? "-translate-y-full" : "translate-y-0"}
      `}
    >

                {/* LEFT */}
                <div className="left_box_nav flex justify-between items-center w-[30%]">
                    <div
                  className="burger_button group cursor-pointer flex flex-col justify-center items-center py-3 px-2 gap-[6px]" // gap-[6px] replicates your previous margin spacing
                  onClick={() => setMenuOpen(true)}
                >
                  {/* Line 1: Slides slightly Left */}
                  <div className="line1 bg-black h-px w-[30px] transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1.5"></div>
                  
                  {/* Line 2: Slides slightly Right */}
                  <div className="line2 bg-black h-px w-[30px] transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5"></div>
                </div>

                  {/* <div className="search_button h-[30px] w-[30px] flex justify-center items-center">
                    <img src={Search_icon} alt="search" />
                  </div> */}
                </div>

                {/* LOGO */}
                <div className="nav_logo">
                  <span>LOGO</span>
                </div>

                {/* RIGHT */}
                <div className="right_box_nav flex justify-between items-center w-[25%]">

                  <div
                    className="login_button h-[30px] w-[30px] flex justify-center items-center cursor-pointer"
                    onClick={() => setAuthOpen(true)}
                  >
                    <img src={login_icon} alt="login" />
                  </div>

                  <div
  className="add_cart_button h-[30px] w-[30px] flex justify-center items-center relative cursor-pointer"
  onClick={() => setCartOpen(true)}
>
  <img src={cart_icon} alt="cart" />

  {totalItems > 0 && (
    <div className="absolute -top-2 -right-2 bg-black text-white text-[10px] px-1.5 py-0.5 rounded-full">
      {totalItems}
    </div>
  )}
</div>
                </div>
              </div>
            </div>
        </div>
        {/* OVERLAYS */}

        {menuOpen && (
          <NavbarMenu closeMenu={() => setMenuOpen(false)} />
        )}

        {authOpen && (
          <AuthPopBox closeAuth={() => setAuthOpen(false)} />
        )}

        <AddCart
  isOpen={cartOpen}
  closeCart={() => setCartOpen(false)}
  openCheckout={() => {
    setCheckoutOpen(true);
  }}
/>


        {checkoutOpen && (
          <CheckOut
            closeCheckout={() => setCheckoutOpen(false)}
            openOrderSuccess={(id) => {
              setOrderId(id);
              setCheckoutOpen(false);
              setSuccessOpen(true);
            }}
              openAuth={() => setAuthOpen(true)}
          />
        )}

        {successOpen && (
          <OrderSuccess
            orderId={orderId}
            closeSuccess={() => setSuccessOpen(false)}
          />
        )}
      </>
    );
  }

  export default Navbar;
