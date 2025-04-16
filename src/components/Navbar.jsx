import React from 'react';
import { Link } from 'react-router-dom';
import CartIcon from './CartIcon';

const Navbar = ({ toggleTheme, isDarkMode }) => {
  // Function to show an alert
  const handlePhoneClick = () => {
    alert('Are you sure you want to call 05234523423?');
  };

  return (
    <div className="flex justify-between items-center h-14 text-black bg-red-100/40 dark:bg-gray-800  dark:text-gray-300  mb-7">
      <ul className="flex w-full justify-between">
        <li className="p-4 ml-20">
          <CartIcon />
        </li>
        <li className="p-4">
          <Link to="/shop" className="hover:text-stone-700">
            Shop
          </Link>
        </li>
        <li className="p-4 flex items-center mr-20">
          <img
            className="h-5 w-5 mr-2 bg-red-100/30 dark:bg-gray-800 cursor-pointer"
            src="/imgs/phone-icon.png"
            alt="Phone Icon"
            onClick={handlePhoneClick}
          />
          <span
            className="cursor-pointer"
            onClick={handlePhoneClick}
          >
            05234523423
          </span>
        </li>

        <li className="p-4">
          <button
            onClick={toggleTheme}
            className="text-xl font-semibold"
          >
            {isDarkMode ? '🌙' : '🌞'}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
