import React from 'react';
import PrivateLayout from '../../components/layouts/PrivateLayout';

const DashboardPage = () => {
    return (
        <PrivateLayout>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold mb-4 dark:text-white">Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-300">
                    Welcome to your dashboard! This is a protected page that only authenticated users can access.
                </p>
            </div>
        </PrivateLayout>
    );
};

export default DashboardPage; 