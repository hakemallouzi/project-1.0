import React from 'react';

const PasswordInput = ({ register, errors, name, placeholder, disabled, showPassword, togglePassword }) => (
    <div className="mb-1 relative">
        <div className="relative">
            <input
                type={showPassword ? 'text' : 'password'}
                {...register(name)}
                className="w-full px-4 py-2 border shadow-sm dark:bg-gray-300 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={placeholder}
                disabled={disabled}
            />
            <img
                src={showPassword ? "imgs/eye.svg" : "imgs/eye-closed.png"}
                alt="Toggle password visibility"
                className="absolute h-6 w-6 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePassword}
            />
        </div>
        {errors[name] && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[name].message}</p>
        )}
    </div>
);

export default PasswordInput; 