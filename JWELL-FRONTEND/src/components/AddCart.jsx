  import React from "react";
  import { useCartContext } from "../Context/cartContext";

  function AddCart({ isOpen, closeCart, openCheckout }) {
  const { cart, increaseQty, decreaseQty, removeItem } = useCartContext();

  const subtotal = cart.reduce(
  (total, item) => total + item.price * item.quantity,
  0,
  );

  return (
  <>
  {/* add to cart section */}
  <div
    onClick={closeCart}
    className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 
    ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
  />

  <div
    className={`fixed top-0 right-0 h-screen bg-[#f5f5f5] z-50 
  w-full md:w-1/2
  transform transition-transform duration-300 ease-in-out
  ${isOpen ? "translate-x-0" : "translate-x-full"}`}
  >
    <div className="flex flex-col h-full">
      {/* HEADER */}

      <div className="flex-1 overflow-y-auto px-12 pt-10 pb-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-sm tracking-widest uppercase">
            {cart.length} Item(s) in your cart
          </h2>
          <button onClick={closeCart} className="text-xl">
            ✕
          </button>
        </div>

        {/* ITEM BOX */}
        {cart.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            Your cart is empty
          </p>
        )}

        {cart.map((item) => (
          <div
            key={`${item.id}-${item.size}-${item.color}`}
            className="bg-white rounded-2xl p-6 flex gap-8 mb-6"
          >
            {/* LEFT IMAGE BLOCK */}
            <div className="w-[160px] h-[160px] bg-[#f0f0f0] rounded-2xl flex items-center justify-center relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-[90px] object-contain"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex-1 flex flex-col justify-between">
              {/* TOP SECTION */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-gray-500">
                    {item.category}
                  </p>
                  <h3 className="text-lg font-medium mt-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.color}, {item.size}
                  </p>
                </div>

                <p className="text-base font-medium">€{item.price}</p>
              </div>

              {/* BOTTOM SECTION */}
              <div className="flex justify-between items-center mt-6">
                {/* Quantity */}
                <div className="border border-gray-300 rounded-lg flex items-center">
                  <button
                    onClick={() => decreaseQty(item)}
                    className="px-4 py-2 text-lg"
                  >
                    −
                  </button>

                  <span className="px-6 py-2">{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item)}
                    className="px-4 py-2 text-lg"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item)}
                  className="text-sm underline flex items-center gap-2"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* PRICING + CHECKOUT (ONLY IF CART HAS ITEMS) */}

        {cart.length > 0 && (
          <div className="border-t bg-white px-12 py-8 space-y-6">
            <div className="text-xs tracking-widest uppercase text-gray-500">
              Shipping cost estimated at checkout
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$0</span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>VAT</span>
                <span>$0</span>
              </div>
            </div>

            <div className="flex justify-between font-medium text-base pt-4 border-t">
              <span>Total</span>
              <span>${subtotal}</span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                closeCart();
                openCheckout();
              }}
              className="w-full bg-black text-white py-5 mt-6 
  flex justify-between items-center px-6 
  uppercase tracking-widest text-sm 
  transition-all duration-300 hover:opacity-90"
            >
              <span>Proceed to secure checkout</span>
              <span>${subtotal}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
  </>
  );
  }

  export default AddCart;
