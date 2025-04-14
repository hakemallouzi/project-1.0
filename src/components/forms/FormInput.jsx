import React from 'react';

const FormInput = ({ label, type, register, errors, name, placeholder, disabled }) => (
    <div className="mb-3">
        {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>}
        <input
            type={type}
            {...register(name)}
            className="w-full px-4 py-2 border shadow-sm focus:outline-none dark:bg-gray-300 dark:text-white focus:ring-2 focus:ring-blue-400"
            placeholder={placeholder}
            disabled={disabled}
        />
        {errors[name] && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[name].message}</p>
        )}

    </div>
);

export default FormInput; 