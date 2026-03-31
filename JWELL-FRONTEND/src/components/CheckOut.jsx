import React, { useState } from "react";
import { useCartContext } from "../Context/cartContext";
import payment_gateway_img from "../assets/imgs/payment_gateways.webp";
import axios from "axios";

function CheckOut({ closeCheckout, openOrderSuccess, openAuth }) {
  const { cart, clearCart, increaseQty, decreaseQty, removeItem } = useCartContext();

  const [billingData, setBillingData] = useState({
    firstName: "", lastName: "", country: "", town: "",
    state: "", address: "", apartment: "", postcode: "", email: "", phone: "",
  });

  const [invoice, setInvoice] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const vat = +(subtotal * 0.24).toFixed(2);
  const total = +(subtotal + vat).toFixed(2);

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!acceptTerms) { alert("Please accept Terms & Conditions"); return; }
    if (cart.length === 0) { alert("Cart is empty"); return; }

    const orderData = { billingData, cart, subtotal, paymentMethod, invoice, newsletter };

    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, orderData);
      if (res.data.success) {
        clearCart();
        openOrderSuccess(res.data.order._id);
      }
    } catch (err) {
      console.error("ORDER ERROR:", err);
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const fieldLabels = {
    firstName: "First Name", lastName: "Last Name", country: "Country",
    town: "City / Town", state: "State", address: "Street Address",
    apartment: "Apartment, suite, etc.", postcode: "Postcode / ZIP",
    email: "Email Address", phone: "Phone",
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-[9998]"
        onClick={closeCheckout}
      />

      {/* Side-by-side panel container */}
      <div className="fixed inset-0 z-[9999] flex pointer-events-none">

        {/* LEFT — Checkout Form (slides in from left) */}
        <div
          className="pointer-events-auto w-full md:w-1/2 h-full bg-white overflow-y-auto
          animate-slideInLeft"
          style={{ animation: "slideInLeft 0.4s cubic-bezier(0.22,1,0.36,1) both" }}
        >
          <style>{`
            @keyframes slideInLeft {
              from { transform: translateX(-100%); opacity: 0; }
              to   { transform: translateX(0);     opacity: 1; }
            }
            @keyframes slideInRight {
              from { transform: translateX(100%); opacity: 0; }
              to   { transform: translateX(0);    opacity: 1; }
            }
          `}</style>

          <div className="px-10 py-10 flex flex-col gap-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs tracking-[0.2em] uppercase text-gray-500">Secure Checkout</span>
              <button onClick={closeCheckout} className="text-xl text-gray-400 hover:text-black transition">✕</button>
            </div>

            {/* Returning Customer */}
            <div className="border border-gray-200 rounded-lg p-5 flex flex-col gap-3">
              <p className="text-sm font-medium">Returning Customer?</p>
              <p className="text-xs text-gray-500">
                Already a member of House of Minas?{" "}
                <span onClick={openAuth} className="underline cursor-pointer text-black">Click here to login</span>
                , otherwise continue below.
              </p>
            </div>

            {/* Billing Details */}
            <div className="border border-gray-200 rounded-lg p-5 flex flex-col gap-4">
              <p className="text-xs tracking-[0.2em] uppercase font-medium">Billing Details</p>

              {/* Invoice toggle */}
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-500 uppercase tracking-wide">Issue an Invoice?</span>
                <div className="flex border border-gray-200 rounded overflow-hidden text-xs">
                  <div
                    className={`px-4 py-1.5 cursor-pointer transition ${!invoice ? "bg-black text-white" : "text-gray-500"}`}
                    onClick={() => setInvoice(false)}
                  >NO</div>
                  <div
                    className={`px-4 py-1.5 cursor-pointer transition ${invoice ? "bg-black text-white" : "text-gray-500"}`}
                    onClick={() => setInvoice(true)}
                  >YES</div>
                </div>
              </div>

              {/* Form grid */}
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(billingData).map((key) => (
                  <input
                    key={key}
                    name={key}
                    placeholder={fieldLabels[key] || key}
                    value={billingData[key]}
                    onChange={handleBillingChange}
                    className={`border border-gray-200 rounded px-3 py-3 text-sm focus:outline-none focus:border-black transition
                      ${key === "address" || key === "email" || key === "phone" ? "col-span-2" : ""}`}
                  />
                ))}
              </div>
            </div>

            {/* Payment */}
            <div className="border border-gray-200 rounded-lg p-5 flex flex-col gap-4">
              <p className="text-xs tracking-[0.2em] uppercase font-medium">Payment</p>
              <img src={payment_gateway_img} alt="" className="h-6 object-contain object-left" />

              <div className="flex flex-col gap-3">
                {[
                  { id: "COD", label: "Cash on Delivery" },
                  { id: "GPAY", label: "Google Pay" },
                  { id: "CARD", label: "Payment with Credit Card via Stripe" },
                  { id: "PAYPAL", label: "Pay with PayPal" },
                ].map((p) => (
                  <div
                    key={p.id}
                    className="flex gap-3 items-center cursor-pointer group"
                    onClick={() => setPaymentMethod(p.id)}
                  >
                    <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center transition
                      ${paymentMethod === p.id ? "border-black" : "border-gray-300"}`}>
                      {paymentMethod === p.id && <div className="h-2 w-2 rounded-full bg-black" />}
                    </div>
                    <span className="text-sm text-gray-700">{p.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms & Newsletter */}
            <div className="flex flex-col gap-3">
              {[
                { label: "I have read and agree to the website Terms & Conditions", state: acceptTerms, set: setAcceptTerms },
                { label: "I wish to receive news & updates", state: newsletter, set: setNewsletter },
              ].map(({ label, state, set }, i) => (
                <div key={i} className="flex items-start gap-3 cursor-pointer" onClick={() => set(!state)}>
                  <div className={`mt-0.5 h-4 w-4 min-w-[1rem] border-2 rounded flex items-center justify-center transition
                    ${state ? "bg-black border-black" : "border-gray-300"}`}>
                    {state && <span className="text-white text-[10px]">✓</span>}
                  </div>
                  <span className="text-xs text-gray-600">{label}</span>
                </div>
              ))}
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-black text-white py-4 flex justify-between items-center px-6
              uppercase tracking-widest text-sm hover:opacity-90 transition rounded"
            >
              <span>{loading ? "Placing Order..." : "Place Order"}</span>
              <span>€{total}</span>
            </button>
          </div>
        </div>

        {/* RIGHT — Cart Summary (already visible, stays in place) */}
        <div
          className="pointer-events-auto w-full md:w-1/2 h-full bg-[#f5f5f5] overflow-y-auto
          hidden md:flex flex-col"
          style={{ animation: "slideInRight 0.4s cubic-bezier(0.22,1,0.36,1) both" }}
        >
          <div className="px-10 py-10 flex flex-col gap-6 flex-1">

            {/* Header */}
            <h2 className="text-xs tracking-[0.2em] uppercase text-gray-500">
              {cart.length} Item(s) in your cart
            </h2>

            {/* Cart Items */}
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`}
                className="bg-white rounded-xl p-5 flex gap-5">
                <div className="w-[80px] h-[80px] bg-[#f0f0f0] rounded-lg flex items-center justify-center flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-[60px] object-contain" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-[10px] tracking-widest uppercase text-gray-400">{item.category}</p>
                      <p className="text-sm font-medium mt-0.5">{item.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.color}, {item.size}</p>
                    </div>
                    <p className="text-sm font-medium">€{item.price}</p>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="border border-gray-200 rounded flex items-center text-sm">
                      <button onClick={() => decreaseQty(item)} className="px-3 py-1">−</button>
                      <span className="px-4 py-1 border-x border-gray-200">{item.quantity}</span>
                      <button onClick={() => increaseQty(item)} className="px-3 py-1">+</button>
                    </div>
                    <button onClick={() => removeItem(item)} className="text-xs underline text-gray-400 hover:text-black transition">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="px-10 py-8 border-t border-gray-200 bg-[#f5f5f5]">
            <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-4">
              Shipping cost estimated at checkout
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <div className="flex justify-between"><span>Shipping</span><span>€5.00</span></div>
              <div className="flex justify-between"><span>Subtotal</span><span>€{subtotal}</span></div>
              <div className="flex justify-between"><span>VAT (24%)</span><span>€{vat}</span></div>
            </div>
            <div className="flex justify-between font-medium text-base pt-4 mt-2 border-t border-gray-300">
              <span>Total</span>
              <span>€{total}</span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default CheckOut;