import React, { useState } from "react";
import { useCartContext } from "../Context/cartContext";
import payment_gateway_img from "../assets/imgs/payment_gateways.webp";
import axios from "axios";

function CheckOut({ closeCheckout, openOrderSuccess }) {
  const { cart, clearCart } = useCartContext();

  // 🔹 BILLING DATA
  const [billingData, setBillingData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    town: "",
    state: "",
    address: "",
    apartment: "",
    postcode: "",
    email: "",
    phone: "",
  });

  // 🔹 OTHER STATES
  const [invoice, setInvoice] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  // 🔹 SUBTOTAL
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // 🔹 INPUT HANDLER
  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 PLACE ORDER (DUMMY – NO PAYMENT GATEWAY)
  const handlePlaceOrder = async () => {
    if (!acceptTerms) {
      alert("Please accept Terms & Conditions");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const orderData = {
      billingData,
      cart,
      subtotal,
      paymentMethod,
      invoice,
      newsletter,
    };

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/api/orders",
        orderData
      );

      if (res.data.success) {
        const orderId = res.data.order._id;

        clearCart();
        openOrderSuccess(orderId); // ✅ THIS OPENS SUCCESS PAGE
      }
    } catch (err) {
      console.error("ORDER ERROR:", err);
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout_wrapper fixed top-0 left-0 w-full h-screen bg-black z-[9999] p-5 overflow-y-auto">
      <div className="checkout_main w-full min-h-screen flex flex-col items-center gap-4">

        {/* HEADER */}
        <div className="checkout_header w-full flex justify-between items-end">
          <span className="text-white">SECURE CHECKOUT</span>
          <button
            onClick={closeCheckout}
            className="text-white text-xl pb-11 hover:opacity-70 transition"
          >
            ✕
          </button>
        </div>

        {/* RETURNING CUSTOMER */}
        <div className="returining_customer w-full rounded-lg bg-white flex flex-col gap-5 p-4 mt-5">
          <div className="returning_custom_heading font-semibold">
            Returning Customer?
          </div>
          <p>
            If you’re already a member of House of Minas click here to login,
            otherwise you may continue filling the form below.
          </p>
          <button className="py-2 px-17 border rounded-md hover:opacity-80 transition">
            login
          </button>
        </div>

        {/* BILLING DETAILS */}
        <div className="checkout_form w-full rounded-lg bg-white flex flex-col gap-5 p-4">
          <span className="mt-5">BILLING DETAILS</span>

          {/* INVOICE */}
          <div className="invoive w-full">
            <span>I WANT TO ISSUE AN INVOICE</span>
            <div className="invoice_box border flex justify-between w-[52%] p-1 mt-4 rounded-sm">
              <div
                className={`px-6 py-2 rounded-sm cursor-pointer transition ${
                  !invoice ? "bg-red-900 text-white" : ""
                }`}
                onClick={() => setInvoice(false)}
              >
                NO
              </div>
              <div
                className={`px-6 py-2 rounded-sm cursor-pointer transition ${
                  invoice ? "bg-green-600 text-white" : ""
                }`}
                onClick={() => setInvoice(true)}
              >
                YES
              </div>
            </div>
          </div>

          {/* FORM */}
          <form className="w-full flex flex-col gap-3">
            {Object.keys(billingData).map((key) => (
              <input
                key={key}
                name={key}
                placeholder={key.replace(/([A-Z])/g, " $1")}
                value={billingData[key]}
                onChange={handleBillingChange}
                className="w-full py-7 px-4 rounded-sm border"
              />
            ))}
          </form>
        </div>

        {/* PAYMENT */}
        <div className="payment_gatways w-full rounded-lg bg-white flex flex-col gap-5 p-4">
          <span>PAYMENT</span>
          <img src={payment_gateway_img} alt="" />

          {[
            { id: "COD", label: "CASH ON DELIVERY" },
            { id: "GPAY", label: "GOOGLE PAY" },
            { id: "CARD", label: "PAY WITH CARD" },
            { id: "PAYPAL", label: "PAY WITH PAYPAL" },
          ].map((p) => (
            <div
              key={p.id}
              className="flex gap-3 items-center cursor-pointer hover:opacity-80 transition"
              onClick={() => setPaymentMethod(p.id)}
            >
              <div
                className={`tick h-[2.1rem] w-[2.1rem] rounded-full ${
                  paymentMethod === p.id ? "bg-green-600" : "bg-black"
                }`}
              />
              <span>{p.label}</span>
            </div>
          ))}
        </div>

        {/* TERMS & NEWSLETTER */}
        <div className="conditions_boxes w-full rounded-lg text-white flex flex-col gap-5 p-4">
          <p>
            Your personal data will be used to process your order and support your
            experience throughout this website.
          </p>

          {/* TERMS */}
          <div className="T&C w-full">
            <span>I HAVE READ AND AGREE TO THE WEBSITE TERMS & CONDITION</span>
            <div className="invoice_box border flex justify-between w-[52%] p-1 mt-4 rounded-sm">
              <div
                className={`px-6 py-2 rounded-sm cursor-pointer transition ${
                  !acceptTerms ? "bg-red-900 text-white" : ""
                }`}
                onClick={() => setAcceptTerms(false)}
              >
                NO
              </div>
              <div
                className={`px-6 py-2 rounded-sm cursor-pointer transition ${
                  acceptTerms ? "bg-green-600 text-white" : ""
                }`}
                onClick={() => setAcceptTerms(true)}
              >
                YES
              </div>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div className="T&C w-full">
            <span>I WISH TO RECEIVE NEWS & UPDATES</span>
            <div className="invoice_box border flex justify-between w-[52%] p-1 mt-4 rounded-sm">
              <div
                className={`px-6 py-2 rounded-sm cursor-pointer transition ${
                  !newsletter ? "bg-red-900 text-white" : ""
                }`}
                onClick={() => setNewsletter(false)}
              >
                NO
              </div>
              <div
                className={`px-6 py-2 rounded-sm cursor-pointer transition ${
                  newsletter ? "bg-green-600 text-white" : ""
                }`}
                onClick={() => setNewsletter(true)}
              >
                YES
              </div>
            </div>
          </div>
        </div>

        {/* PLACE ORDER */}
        <div
          className="CheckOut-Box bg-white p-6 h-[13%] w-full mt-3 rounded-sm text-black flex justify-between items-center px-5 cursor-pointer hover:opacity-80 transition"
          onClick={handlePlaceOrder}
        >
          <span>{loading ? "PLACING ORDER..." : "PLACE ORDER"}</span>
          <span>€{subtotal}</span>
        </div>

      </div>
    </div>
  );
}

export default CheckOut;
