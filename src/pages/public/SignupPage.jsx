import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/AuthContext';
import { signupSchema } from '../../schemas/authSchemas';
import PublicLayout from '../../components/layouts/PublicLayout';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../../components/forms/FormInput';

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
        resolver: yupResolver(signupSchema),
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
                        <FormInput
                            label="First Name"
                            type="text"
                            register={register}
                            errors={errors}
                            name="firstName"
                            placeholder="First Name"
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <FormInput
                            label="Last Name"
                            type="text"
                            register={register}
                            errors={errors}
                            name="lastName"
                            placeholder="Last Name"
                            disabled={isLoading}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <FormInput
                        label="Email"
                        type="text"
                        register={register}
                        errors={errors}
                        name="email"
                        placeholder="Email"
                        disabled={isLoading}
                    />
                </div>

                <div className="mb-4">
                    <FormInput
                        label="Password"
                        type="password"
                        register={register}
                        errors={errors}
                        name="password"
                        placeholder="Password"
                        disabled={isLoading}
                        showPassword={showPassword}
                        togglePassword={() => setShowPassword(!showPassword)}
                    />
                </div>

                <div className="mb-6">
                    <FormInput
                        label="Confirm Password"
                        type="password"
                        register={register}
                        errors={errors}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        disabled={isLoading}
                        showPassword={showConfirmPassword}
                        togglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
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