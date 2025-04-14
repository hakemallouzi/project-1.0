import React from 'react';

const SocialLoginButton = ({ icon, text, onClick }) => (
    <button
        className="w-full py-2 flex items-center justify-center gap-2 text-black dark:bg-gray-300 hover:border-black border-[1px] focus:outline-none"
        onClick={onClick}
    >
        <img className="h-5 w-5 mr-1" src={icon} alt={`${text} Icon`} />
        {text}
    </button>
);

export default SocialLoginButton; 