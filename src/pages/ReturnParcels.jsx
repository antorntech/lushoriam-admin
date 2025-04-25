import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

// Modal Component for updating the status
const UpdateStatusModal = ({ isOpen, onClose, returnParcel, onUpdate }) => {
  const [status, setStatus] = useState(returnParcel?.status || "pending");

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/returnparcels/update/${returnParcel._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        onUpdate(data.data); // Pass the updated return parcel data back
        toast.success("Status updated successfully!", { autoClose: 1000 });
        onClose(); // Close the modal
      } else {
        toast.error("Error updating status", { autoClose: 1000 });
      }
    } catch (err) {
      toast.error("Error updating status", { autoClose: 1000 });
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 p-5">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">
          Update Return Parcel Status
        </h2>
        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <select
            className="w-full px-4 py-2 border rounded-md"
            value={status}
            disabled={returnParcel?.status === "approved"}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          {returnParcel?.status !== "approved" ? (
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white py-2 px-4 rounded"
            >
              Update
            </button>
          ) : (
            <button className="bg-gray-300 text-white py-2 px-4 rounded">
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

const ReturnParcels = () => {
  const [returnParcels, setReturnParcels] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all return parcels from the server
  useEffect(() => {
    const fetchReturnParcels = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/returnparcels",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setReturnParcels(data.data);
        } else {
          toast.error("Failed to fetch return parcels");
        }
      } catch (err) {
        toast.error("Failed to fetch return parcels");
      }
    };

    fetchReturnParcels();
  }, []);

  // Open the modal with selected parcel's data
  const handleUpdateClick = (parcel) => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);
  };

  // Handle the update of a parcel's status
  const handleStatusUpdate = (updatedParcel) => {
    setReturnParcels((prevState) =>
      prevState.map((parcel) =>
        parcel._id === updatedParcel._id ? updatedParcel : parcel
      )
    );
  };

  return (
    <div>
      {/* Header Section */}
      <div className="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold">Return Parcels</h1>
          <p className="text-sm text-gray-500">
            {returnParcels?.length > 0
              ? "Return Parcels are available"
              : "No return Parcels available."}
          </p>
        </div>
      </div>

      {/* Faqs List */}
      {returnParcels?.length > 0 ? (
        // Table Layout
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Order ID
                </th>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Customer Name
                </th>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Mobile
                </th>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Status
                </th>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {returnParcels?.map((parcel, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-6 py-4 border-b">{parcel.orderId}</td>
                  <td className="px-6 py-4 border-b">{parcel.customerName}</td>
                  <td className="px-6 py-4 border-b">{parcel.mobile}</td>
                  <td className="px-6 py-4 border-b capitalize">
                    <span
                      className={`text-white px-2 py-1 rounded-md capitalize ${
                        parcel?.status === "pending"
                          ? "bg-yellow-600"
                          : parcel?.status === "approved"
                          ? "bg-green-600"
                          : parcel?.status === "rejected"
                          ? "bg-red-600"
                          : null
                      }`}
                    >
                      {parcel?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b text-sm">
                    <button
                      onClick={() => handleUpdateClick(parcel)}
                      className="text-orange-800 border-2 border-orange-800 px-2 py-1 rounded-md text-sm hover:bg-orange-800 hover:text-white transition-all duration-500"
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Loader />
      )}

      <UpdateStatusModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        returnParcel={selectedParcel}
        onUpdate={handleStatusUpdate}
      />
    </div>
  );
};

export default ReturnParcels;
