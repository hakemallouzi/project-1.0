import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PublicLayout from '../../components/layouts/PublicLayout';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Define validation schema
const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

const SignupPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        console.log('Form submitted with data:', data);
        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulate successful signup
            login({
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                // Add any additional user information here
            });

            toast.success('Signup successful!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: 'bg-green-500 text-white font-medium rounded-lg shadow-lg',
                bodyClassName: 'p-3',
            });

            reset();
            navigate('/dashboard');
        } catch (error) {
            console.error('Error during form submission:', error);
            toast.error('Signup failed. Please try again.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: 'bg-red-500 text-white font-medium rounded-lg shadow-lg',
                bodyClassName: 'p-3',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PublicLayout>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                className="mt-16"
                toastClassName="relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
                bodyClassName="text-sm font-medium block p-3"
                progressClassName="bg-white opacity-20"
            />
            <div className="text-center mb-4">
                <img src="imgs/Jewelry-Logo.jpg" alt="Logo" className="w-48 mx-auto h-100 m-0" />
            </div>

            <h1 className="text-2xl text-center mt-0 mb-2 dark:text-white">Create your account</h1>
            <h6 className="text-center mb-4 opacity-60 dark:text-white dark:opacity-80">Join stonique today</h6>

            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            First Name
                        </label>
                        <input
                            {...register('firstName')}
                            type="text"
                            className="w-full px-4 py-2 border shadow-sm focus:outline-none dark:bg-gray-300 dark:text-white focus:ring-2 focus:ring-blue-400"
                            placeholder="First Name"
                            disabled={isLoading}
                        />
                        {errors.firstName && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Last Name
                        </label>
                        <input
                            {...register('lastName')}
                            type="text"
                            className="w-full px-4 py-2 border shadow-sm focus:outline-none dark:bg-gray-300 dark:text-white focus:ring-2 focus:ring-blue-400"
                            placeholder="Last Name"
                            disabled={isLoading}
                        />
                        {errors.lastName && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName.message}</p>
                        )}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                    </label>
                    <input
                        {...register('email')}
                        type="email"
                        className="w-full px-4 py-2 border shadow-sm focus:outline-none dark:bg-gray-300 dark:text-white focus:ring-2 focus:ring-blue-400"
                        placeholder="Email"
                        disabled={isLoading}
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            {...register('password')}
                            type={showPassword ? 'text' : 'password'}
                            className="w-full px-4 py-2 border shadow-sm dark:bg-gray-300 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Password"
                            disabled={isLoading}
                        />
                        <img
                            src={showPassword ? "imgs/eye.svg" : "imgs/eye-closed.png"}
                            alt="Toggle password visibility"
                            className="absolute h-6 w-6 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
                    )}
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                            {...register('confirmPassword')}
                            type={showConfirmPassword ? 'text' : 'password'}
                            className="w-full px-4 py-2 border shadow-sm dark:bg-gray-300 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Confirm Password"
                            disabled={isLoading}
                        />
                        <img
                            src={showConfirmPassword ? "imgs/eye.svg" : "imgs/eye-closed.png"}
                            alt="Toggle password visibility"
                            className="absolute h-6 w-6 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                    </div>
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating account...' : 'Create Account'}
                </button>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
                            Login
                        </Link>
                    </p>
                </div>
            </form>
        </PublicLayout>
    );
};

export default SignupPage; 