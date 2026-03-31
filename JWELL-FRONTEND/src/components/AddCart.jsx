import React, { useState } from "react";
import { useCartContext } from "../Context/cartContext";

function AddCart({ isOpen, closeCart, openCheckout }) {
  const { cart, increaseQty, decreaseQty, removeItem } = useCartContext();
  const [coupon, setCoupon] = useState("");

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/20 z-[9990] transition-opacity duration-300
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen bg-[#ebebeb] z-[9990]
          w-full md:w-1/2
          transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          flex flex-col
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* ── SCROLLABLE BODY ── */}
        <div className="flex-1 overflow-y-auto flex flex-col">

          {/* Header */}
          <div className="flex justify-between items-start px-8 pt-10 pb-8">
            <h2 className="text-[13px] tracking-[0.18em] uppercase font-normal text-black">
              {cart.length} Item(s) in your cart
            </h2>
            <button
              onClick={closeCart}
              className="text-black hover:opacity-50 transition-opacity"
              style={{ lineHeight: 1 }}
            >
              {/* X icon matching screenshot — thin strokes */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <line x1="1" y1="1" x2="17" y2="17" stroke="black" strokeWidth="1.2"/>
                <line x1="17" y1="1" x2="1" y2="17" stroke="black" strokeWidth="1.2"/>
              </svg>
            </button>
          </div>

          {/* Empty state */}
          {cart.length === 0 && (
            <p className="text-center text-gray-400 text-sm mt-16 px-8">
              Your cart is empty
            </p>
          )}

          {/* Cart Items */}
          <div className="px-6 flex flex-col gap-3">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="bg-white rounded-lg flex overflow-hidden"
                style={{ minHeight: "160px" }}
              >
                {/* Image panel */}
                <div className="w-[190px] min-w-[190px] bg-[#f5f5f5] flex items-center justify-center relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[100px] object-contain"
                  />
                  {/* Bookmark icon bottom-left */}
                  <div className="absolute bottom-3 left-3 opacity-40">
                    <svg width="14" height="17" viewBox="0 0 14 17" fill="none">
                      <path d="M1 1h12v15l-6-4-6 4V1z" stroke="black" strokeWidth="1"/>
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 px-5 py-4 flex flex-col justify-between">
                  {/* Top row */}
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] tracking-[0.18em] uppercase text-gray-500 underline underline-offset-2">
                        {item.category}
                      </p>
                      <h3 className="text-[14px] font-normal tracking-wide mt-1 uppercase">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-gray-500 mt-0.5 uppercase tracking-wide">
                        {item.color}, {item.size}
                      </p>
                    </div>
                    <p className="text-[13px] font-normal">€{item.price.toFixed(2)}</p>
                  </div>

                  {/* Add-ons */}
                  <div className="flex flex-col gap-1.5 mt-3">
                    {["Gift Box", "Add a note"].map((opt) => (
                      <div key={opt} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-[1.5px] bg-gray-400" />
                        </div>
                        <span className="text-[12px] text-gray-600">{opt}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom row — qty + remove */}
                  <div className="flex justify-between items-center mt-4">
                    {/* Quantity stepper */}
                    <div className="flex items-center border border-gray-200 rounded">
                      <button
                        onClick={() => decreaseQty(item)}
                        className="w-9 h-9 flex items-center justify-center text-base text-gray-600 hover:bg-gray-50 transition"
                      >
                        −
                      </button>
                      <span className="w-9 h-9 flex items-center justify-center text-[13px]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQty(item)}
                        className="w-9 h-9 flex items-center justify-center text-base text-gray-600 hover:bg-gray-50 transition"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item)}
                      className="flex items-center gap-1.5 text-[12px] text-gray-500 hover:text-black transition"
                    >
                      <span>Remove</span>
                      <svg width="13" height="15" viewBox="0 0 13 15" fill="none">
                        <rect x="1" y="3" width="11" height="11" rx="1" stroke="currentColor" strokeWidth="1"/>
                        <path d="M4 3V2a1 1 0 011-1h3a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1"/>
                        <line x1="0.5" y1="3" x2="12.5" y2="3" stroke="currentColor" strokeWidth="1"/>
                        <line x1="5" y1="6" x2="5" y2="11" stroke="currentColor" strokeWidth="1"/>
                        <line x1="8" y1="6" x2="8" y2="11" stroke="currentColor" strokeWidth="1"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coupon Code */}
          {cart.length > 0 && (
            <div className="px-6 mt-8 mb-6">
              <div className="flex items-start gap-6">
                <div className="flex flex-col gap-0.5 min-w-[120px]">
                  <span className="text-[11px] tracking-[0.12em] uppercase text-gray-600 font-normal">
                    Coupon Code /
                  </span>
                  <span className="text-[11px] tracking-[0.12em] uppercase text-gray-600 font-normal">
                    Gift Card
                  </span>
                </div>
                <div className="flex gap-0">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="INSERT"
                    className="bg-white border border-gray-200 px-4 py-3 text-[12px] tracking-widest uppercase
                      placeholder:text-gray-300 focus:outline-none w-[160px]"
                  />
                  <button className="bg-white border border-l-0 border-gray-200 px-4 py-3 hover:bg-gray-50 transition">
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                      <polyline points="1,6 6,11 15,1" stroke="black" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />
        </div>

        {/* ── STICKY FOOTER — Checkout Button ── */}
        {cart.length > 0 && (
          <button
            onClick={openCheckout}
            className="w-full bg-black text-white flex justify-between items-center px-8 py-6
              uppercase tracking-[0.18em] text-[12px] font-normal
              hover:opacity-90 transition-opacity flex-shrink-0"
          >
            <div className="flex items-center gap-3">
              <span>Proceed to Secure Checkout</span>
              {/* Shield checkmark icon */}
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                <path d="M9 1L1 4v6c0 5 3.5 8.5 8 9.5C13.5 18.5 17 15 17 10V4L9 1z"
                  stroke="white" strokeWidth="1.2" fill="none"/>
                <polyline points="5.5,10 8,12.5 12.5,7.5"
                  stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>€{subtotal.toFixed(2)}</span>
          </button>
        )}
      </div>
    </>
  );
}

export default AddCart;