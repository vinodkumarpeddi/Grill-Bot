import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="relative w-20 h-20 flex justify-center items-center">
        {/* Outer Glowing Circle */}
        <div className="absolute w-full h-full rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
        <div className="absolute w-full h-full rounded-full border-4 border-transparent border-b-yellow-500 animate-spin-reverse"></div>

        {/* Pulsating Core */}
        <div className="absolute w-10 h-10 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loader;
