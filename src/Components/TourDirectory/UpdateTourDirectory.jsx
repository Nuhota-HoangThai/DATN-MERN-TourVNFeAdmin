import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function UpdateTourDirectory() {
  const [directoryName, setDirectoryName] = useState("");
  const [directoryDescription, setDirectoryDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTourDirectory = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/tourDirectory/getDirectory/${id}`,
        );
        if (!response.ok) throw new Error("Could not fetch tour directory");

        const data = await response.json();
        setDirectoryName(data.directoryName);
        setDirectoryDescription(data.directoryDescription);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTourDirectory();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/tourDirectory/updateDirectory/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ directoryName, directoryDescription }),
        },
      );

      if (!response.ok) throw new Error("Could not update tour directory");

      navigate("/listTourDirectory");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-h-[600px] max-w-xl rounded-2xl bg-white p-8 shadow-2xl">
      <h2 className="mb-5 text-2xl font-semibold">Cập nhật danh mục tour</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="directoryName"
            className="block text-sm font-medium text-gray-700"
          >
            Tên danh mục tour
          </label>
          <input
            type="text"
            id="directoryName"
            value={directoryName}
            onChange={(e) => setDirectoryName(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="directoryDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Mô tả danh mục
          </label>
          <ReactQuill
            theme="snow"
            value={directoryDescription}
            onChange={setDirectoryDescription}
            className="mt-1"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
}

export default UpdateTourDirectory;
