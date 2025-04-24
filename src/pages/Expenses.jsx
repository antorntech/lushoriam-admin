import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

const API_URL = "https://lushoriam-server-abnd.vercel.app";

const ExpenseModal = ({ isOpen, onClose, onAddOrUpdate, selectedExpense }) => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    if (selectedExpense) {
      let formattedDate = "";
      if (selectedExpense.date.includes("/")) {
        // Convert DD/MM/YYYY to YYYY-MM-DD
        const [day, month, year] = selectedExpense.date.split("/");
        formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
          2,
          "0"
        )}`;
      } else if (selectedExpense.date.includes("T")) {
        // ISO string format
        formattedDate = selectedExpense.date.split("T")[0];
      }

      setFormData({
        name: selectedExpense.name,
        amount: selectedExpense.amount,
        description: selectedExpense.description,
        date: formattedDate,
      });
    } else {
      setFormData({
        name: "",
        amount: "",
        description: "",
        date: "",
      });
    }
  }, [selectedExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDateToDDMMYYYY = (inputDate) => {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = formatDateToDDMMYYYY(formData.date);

    const updatedFormData = {
      ...formData,
      date: formattedDate,
    };

    try {
      const url = selectedExpense
        ? `${API_URL}/api/v1/expenses/update/${selectedExpense._id}`
        : `${API_URL}/api/v1/expenses/add`;

      const method = selectedExpense ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(updatedFormData),
      });

      const data = await response.json();
      onAddOrUpdate();
      onClose();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">
          {selectedExpense ? "Edit Expense" : "Add Expense"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <select
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="" disabled>
                Select Name
              </option>
              <option value="Antor">Antor</option>
              <option value="Rakib">Rakib</option>
              <option value="Hridoy">Hridoy</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 px-4 py-2 rounded text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary px-4 py-2 rounded text-white"
            >
              {selectedExpense ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const fetchExpense = async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/expenses`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.log("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpense();
  }, []);

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedExpense(null);
  };

  // Toggle delete confirmation modal
  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

  // Open delete confirmation modal with selected review ID
  const openDeleteConfirmModal = (itemId) => {
    setSelectedItemId(itemId);
    toggleDeleteModal();
  };

  // Handle delete action
  const handleDelete = async () => {
    if (selectedItemId) {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/expenses/delete/${selectedItemId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          toast.success("Review deleted successfully", {
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          fetchReviews(); // Refresh review list
        } else {
          toast.error("Failed to delete review");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the review");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <div>
          <h1 className="text-xl font-bold">Expenses</h1>
          <p>
            {expenses?.length > 0
              ? "Expenses are available"
              : "No expenses available"}
          </p>
        </div>
        <div>
          <button
            onClick={() => {
              setIsOpen(true);
              setSelectedExpense(null);
            }}
            className="bg-primary text-white px-4 py-2 rounded-md mt-2 md:mt-0"
          >
            Add Expense
          </button>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                Amount
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                Description
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses?.map((expense, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b">{expense?.name}</td>
                <td className="px-6 py-4 border-b">{expense?.amount}</td>
                <td className="px-6 py-4 border-b">
                  {expense?.description?.slice(0, 50)}...
                </td>
                <td className="px-6 py-4 border-b">
                  {new Date(expense?.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 border-b">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedExpense(expense);
                        setIsOpen(true);
                      }}
                      className="text-orange-800 border-2 border-orange-800 px-2 py-1 rounded-md text-sm hover:bg-orange-800 hover:text-white transition-all duration-300"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => openDeleteConfirmModal(expense._id)}
                      className="text-red-800 border-2 border-red-800 px-2 py-1 rounded-md text-sm hover:bg-red-800 hover:text-white transition-all duration-300"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ExpenseModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        selectedExpense={selectedExpense}
        onAddOrUpdate={fetchExpense}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={openDeleteModal}
        handleOpen={toggleDeleteModal}
        onDelete={handleDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this review? This action cannot be undone."
      />
    </>
  );
};

export default Expenses;
