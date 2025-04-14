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

                    {children}
                </div>
            </div>
        </div>
    );
};

export default PublicLayout; 