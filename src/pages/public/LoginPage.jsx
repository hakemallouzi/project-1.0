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
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

      // Simulate successful login
      login({
        email: data.email,
        name: 'John Doe', // This would come from the API in a real app
      });

      toast.success('Login successful!', {
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
      toast.error('Login failed. Please try again.', {
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

  const handleLogout = () => {
    // Implement logout functionality
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

      <h1 className="text-2xl text-center mt-0 mb-2 dark:text-white">Welcome to stonique</h1>
      <h6 className="text-center mb-4 opacity-60 dark:text-white dark:opacity-80">Please login to your stonique account</h6>

      <div className="flex flex-col gap-3 w-full">
        <button className="w-full py-2 flex items-center justify-center gap-2 text-black dark:bg-gray-300 hover:border-black border-[1px] focus:outline-none">
          <img className="h-5 w-5 mr-1" src="imgs/google-logo.webp" alt="Google Icon" />
          Login with Google
        </button>

        <button className="w-full py-2 flex items-center justify-center gap-2 text-black dark:bg-gray-300 hover:border-black border-[1px] focus:outline-none">
          <img className="h-5 w-5 mr-1" src="imgs/apple-logo copy.png" alt="Apple Icon" />
          Login with Apple ID
        </button>

        <div className="flex items-center my-2 w-full">
          <hr className="flex-grow border-t-1 border-gray-300 dark:border-white" />
          <span className="mx-2 text-gray-500 dark:text-white">OR</span>
          <hr className="flex-grow border-t-1 border-gray-300 dark:border-white" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 w-full">
          <div className="mb-3">
            <input
              type="email"
              id="email"
              {...register('email')}
              className="w-full px-4 py-2 border shadow-sm focus:outline-none dark:bg-gray-300 dark:text-white focus:ring-2 focus:ring-blue-400"
              placeholder="Email"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-1 relative">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password')}
                className="w-full px-4 py-2 border shadow-sm dark:bg-gray-300 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Password"
                disabled={isLoading}
              />
              <img
                src={showPassword ? "imgs/eye.svg" : "imgs/eye-closed.png"}
                alt="Toggle password visibility"
                className="absolute h-6 w-6 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
            )}
          </div>

          <div className="text-right mb-4">
            <a href="/forgot-password" className="text-sm dark:text-white text-stone-300 hover:underline">
              Forgot your password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 text-white rounded-md ${isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p>
            <span className="opacity-60 dark:text-white">Don't have an account? </span>
            <Link to="/signup" className="font-extrabold hover:underline dark:text-white">Register now</Link>
          </p>
        </div>
      </div>
    </PublicLayout>
  );
};

export default LoginPage;
