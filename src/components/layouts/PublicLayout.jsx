import React from 'react';

const PublicLayout = ({ children }) => {
    return (
        <div className="flex h-screen overflow-hidden">
            <div
                className="w-3/5 bg-cover bg-center ml-7"
                style={{
                    backgroundImage: "url('/imgs/jewelery-img.jpg')",
                    height: "85vh",
                }}
            ></div>
            <div className="w-2/5 flex justify-center">
                <div className="w-full sm:w-3/4 mb-0 mt-5">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">
                            Welcome
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Please login or sign up to continue
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PublicLayout; 