import React from "react";

function OrderSuccess({ orderId, closeSuccess }) {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black z-[9999] flex justify-center items-center p-5">

      <div className="bg-white w-full h-full rounded-md flex flex-col justify-center items-center gap-6 text-center p-6">

        <h2 className="text-2xl font-semibold">
          🎉 Order Placed Successfully
        </h2>

        <p className="text-gray-600">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <div className="border px-4 py-2 rounded-md">
          <span className="text-sm text-gray-500">Order ID</span>
          <div className="font-mono text-sm mt-1">
            {orderId}
          </div>
        </div>

        <button
          onClick={closeSuccess}
          className="mt-6 px-6 py-3 bg-black text-white rounded-md"
        >
          CONTINUE SHOPPING
        </button>

      </div>
    </div>
  );
}

export default OrderSuccess;
