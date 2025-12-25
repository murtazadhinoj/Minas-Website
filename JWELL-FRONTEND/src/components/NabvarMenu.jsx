import React from 'react'

function NabvarMenu({ closeMenu }) {
  return (
    <>
      {/* OVERLAY */}
      <div
        className="fixed inset-0 bg-black/40"
        onClick={closeMenu}
      />

      {/* MENU */}
      <div className="fixed top-0 left-0 w-[280px] h-screen bg-white shadow-lg p-6">
        
        <button
          onClick={closeMenu}
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
    </>
  )
}

export default NabvarMenu
