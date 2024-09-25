import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/"); // Ana sayfaya yönlendir
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-[#1F2937]">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-white">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
        Page Not Found
      </p>
      <button
        onClick={handleNavigateHome}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
      >
        Home
      </button>
    </div>
  );
};

export default NotFound;
