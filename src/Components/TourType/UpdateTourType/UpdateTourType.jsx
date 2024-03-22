import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/config";

function UpdateTourType() {
  const [typeName, setTypeName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTourType = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/tourType/getTourType/${id}`);
        if (!response.ok) throw new Error("Could not fetch tour type");

        const data = await response.json();
        setTypeName(data.tourType.typeName);
        setDescription(data.tourType.description);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTourType();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/tourType/updateType/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ typeName, description }),
      });

      if (!response.ok) throw new Error("Could not update tour type");

      navigate("/listType"); // Use navigate correctly
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-h-[600px] max-w-xl rounded-2xl bg-white p-8 shadow-2xl">
      <h2 className="mb-5 text-2xl font-semibold">Cập nhật loại tour</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="typeName"
            className="block text-sm font-medium text-gray-700"
          >
            Tên loại tour
          </label>
          <input
            type="text"
            id="typeName"
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Thông tin về loại tour
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            rows="4"
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

export default UpdateTourType;
