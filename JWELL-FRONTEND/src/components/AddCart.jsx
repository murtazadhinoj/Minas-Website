import React from 'react'

function AddCart({closeCart}) {
  return (
    <div>
        {/* OVERLAY */}
      <div
        className="fixed inset-0 bg-black/40"
        onClick={closeCart}
      />

       {/*add to cart section  */}

       {/* MENU */}
      <div className="fixed top-0 right-0 w-[280px] h-screen bg-white shadow-lg p-6">
        
        <button
          onClick={closeCart}
          className="mb-6 text-xl"
        >
          ✕
        </button>

        <ul className="space-y-4">
          <li>Home</li>
          <li>Shop</li>
          <li>About</li>
          <li>Contact</li>
        </ul>

      </div>


    </div>
  )
}

export default AddCart
