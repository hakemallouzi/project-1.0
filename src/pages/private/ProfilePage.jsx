import React from 'react';
import PrivateLayout from '../../components/layouts/PrivateLayout';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
    const { user } = useAuth();

    return (
        <PrivateLayout>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold mb-6 dark:text-white">Profile Information</h1>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                        <p className="mt-1 text-gray-900 dark:text-white">{user?.firstName || 'Not set'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                        <p className="mt-1 text-gray-900 dark:text-white">{user?.lastName || 'Not set'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <p className="mt-1 text-gray-900 dark:text-white">{user?.email || 'Not set'}</p>
                    </div>
                </div>
            </div>
        </PrivateLayout>
    );
};

export default ProfilePage; 