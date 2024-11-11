// const AccountCard = () => {
//   const [isMenuOpen, setMenuOpen] = useState(false);

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen">
//       {/* Sidebar for larger screens and toggleable menu for smaller screens */}
//       <div
//         className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-64 p-4 transition-transform transform lg:translate-x-0 ${
//           isMenuOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:static`}
//       >
//         {/* Close button for smaller screens */}
//         <button
//           className="lg:hidden mb-4 text-white"
//           onClick={() => setMenuOpen(false)}
//         >
//           Close Menu
//         </button>
//         {/* Menu items */}
//         <nav className="space-y-2">
//           <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-700">
//             Account Settings
//           </a>
//           <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-700">
//             Profile
//           </a>
//           <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-700">
//             Notifications
//           </a>
//         </nav>
//       </div>

//       {/* Toggle button for smaller screens */}
//       <button
//         className="p-2 lg:hidden bg-gray-800 text-white fixed top-4 left-4"
//         onClick={() => setMenuOpen(!isMenuOpen)}
//       >
//         {isMenuOpen ? "Close Menu" : "Open Menu"}
//       </button>

//       {/* Main Account Card Content */}
//       <div className="flex-1 p-6 bg-gray-100">
//         <div className="bg-white shadow-md rounded-lg p-6">
//           {/* Stats */}
//           <div className="flex justify-around text-gray-600"></div>
//           <h2>アカウント削除</h2>
//           <p>
//             一度アカウントを削除すると、二度と元に戻せません。十分ご注意ください。
//           </p>
//           <button className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-900">
//             アカウント削除
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountCard;

"use client";
import React from "react";
import { useState } from "react";

const HamburgerMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      {/* Hamburger Icon Button */}
      <button
        className="p-2 bg-white border border-white text-black rounded-md"
        onClick={() => setMenuOpen(!isMenuOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        
        <button
          className="p-2 text-black absolute top-4 right-4"
          onClick={() => setMenuOpen(false)}
        >
          ✕
        </button>
        {/* Menu Items */}
        <nav className="mt-16 space-y-4 px-4">
          <a href="../settings/profile" className="block text-gray-800 hover:bg-gray-100 p-2 rounded">
            Profile
          </a>
          <a href="../settings/password" className="block text-gray-800 hover:bg-gray-100 p-2 rounded">
            Password
          </a>
          <a href="../settings/account" className="block text-gray-800 hover:bg-gray-100 p-2 rounded">
            Account
          </a>
        </nav>
      </div>
    </div>
  );
};

export default HamburgerMenu;
