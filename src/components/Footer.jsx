import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-pink-50 dark:bg-gray-800 shadow-lg mt-auto">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <p className="text-gray-600 dark:text-gray-300">
                            © {new Date().getFullYear()} Stonique. All rights reserved.
                        </p>
                    </div>
                    <div className="flex space-x-6">
                        <Link
                            to="/privacy"
                            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            to="/terms"
                            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            to="/contact"
                            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 