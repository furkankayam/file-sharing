import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiUpload } from "react-icons/fi";
import { API_URL } from "../../config.js";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const apiUrl = API_URL;

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleNavigateToFiles = () => {
    navigate("/files"); // /files sayfasına yönlendir
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${apiUrl}/upload-file`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatus("File uploaded successfully!");
      } else {
        setStatus("File upload failed.");
      }
    } catch (error) {
      setStatus("File upload failed.");
    }
  };

  return (
    <div className="dark:bg-[#1F2937] h-screen flex justify-center items-center w-full">
      <div className="flex flex-col items-center h-[300px] justify-center max-w-md mx-auto my-10 p-5 bg-white shadow-lg rounded-lg dark:bg-gray-800">
        <div className="w-[300px] flex justify-end">
          <button
            onClick={handleNavigateToFiles}
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600"
          >
            <FiMenu />
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Upload Your File
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex-row justify-center items-center"
        >
          <div>
            <input
              type="file"
              onChange={handleFileChange}
              required
              className="mb-4 border border-gray-300 rounded p-2 w-full dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[50px] h-[50px] flex justify-center items-center bg-blue-500 text-white rounded-full hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              <FiUpload className="text-xl" />
            </button>
          </div>
        </form>
        {status && (
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            {status}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
