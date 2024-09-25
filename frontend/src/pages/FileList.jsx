import React, { useEffect, useState } from "react";
import { FiDownload, FiPlusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config.js";

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const apiUrl = API_URL;

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`${apiUrl}/files`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleNavigateToFiles = () => {
    navigate("/upload");
  };

  const handleDownload = (fileName) => {
    window.location.href = `${apiUrl}/download?fileName=${fileName}`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dark:bg-[#1F2937] w-full h-screen flex justify-center items-center">
      <div className="mx-10 p-5 w-[600px] bg-white shadow-lg rounded-lg dark:bg-gray-800">
        <div className="w-[550px] flex justify-end">
          <button
            onClick={handleNavigateToFiles}
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600"
          >
            <FiPlusCircle className="text-[15px]" />
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          File List
        </h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  File Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr
                  key={index}
                  className="bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 hover:dark:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {file}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDownload(file)}
                      className="text-blue-600 hover:underline dark:text-blue-500 hover:dark:text-blue-400"
                    >
                      <FiDownload className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FileList;
