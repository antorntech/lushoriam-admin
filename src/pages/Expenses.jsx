import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { toast } from "react-toastify";
import Pagination from "../components/Pagination";

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

      if (!response.ok) {
        throw new Error(data.message);
      } else {
        toast.success(data.message, { autoClose: 1000 });
      }
      onAddOrUpdate(formData?.name);
      onClose();

      formData.name = "";
      formData.amount = "";
      formData.description = "";
      formData.date = "";
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
            <label className="block mb-1 font-medium">Amount (TK)</label>
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

const ExpenseTable = ({
  title,
  expenses,
  subTotal,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div>
      <h1 className="text-lg font-bold">{title}</h1>
      <div className="mt-2 overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              {["SL", "Amount (TK)", "Description", "Date", "Actions"].map(
                (th, i) => (
                  <th
                    key={i}
                    className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700 whitespace-nowrap"
                  >
                    {th}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {expenses?.map((expense, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b">{index + 1}</td>
                <td className="px-6 py-4 border-b">{expense?.amount}</td>
                <td className="px-6 py-4 border-b" title={expense?.description}>
                  {expense?.description?.length > 20
                    ? `${expense.description.slice(0, 20)}...`
                    : expense.description}
                </td>
                <td className="px-6 py-4 border-b">{expense?.date}</td>
                <td className="px-6 py-4 border-b">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(expense)}
                      className="text-orange-800 border-2 border-orange-800 px-2 py-1 rounded-md text-sm hover:bg-orange-800 hover:text-white transition-all duration-300"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => onDelete(expense._id)}
                      className="text-red-800 border-2 border-red-800 px-2 py-1 rounded-md text-sm hover:bg-red-800 hover:text-white transition-all duration-300"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            <tr className="bg-gray-200 font-semibold">
              <td className="px-6 py-4 border-t">Subtotal</td>
              <td className="px-6 py-4 border-t">{subTotal} TK</td>
              <td className="px-6 py-4 border-t" colSpan={3}></td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

const Expenses = () => {
  const limit = 5;
  const [expenses, setExpenses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  // Separate state for expenses of each category
  const [antorExpenses, setAntorExpenses] = useState([]);
  const [rakibExpenses, setRakibExpenses] = useState([]);
  const [hridoyExpenses, setHridoyExpenses] = useState([]);

  const [antorSubTotal, setAntorSubTotal] = useState(0);
  const [rakibSubTotal, setRakibSubTotal] = useState(0);
  const [hridoySubTotal, setHridoySubTotal] = useState(0);

  // Separate pagination states for each category
  const [antorPage, setAntorPage] = useState(1);
  const [rakibPage, setRakibPage] = useState(1);
  const [hridoyPage, setHridoyPage] = useState(1);

  // Separate total pages for each category
  const [antorTotalPages, setAntorTotalPages] = useState(1);
  const [rakibTotalPages, setRakibTotalPages] = useState(1);
  const [hridoyTotalPages, setHridoyTotalPages] = useState(1);

  const [totalExpenses, setTotalExpenses] = useState(0);

  const fetchExpense = async (category, page = 1) => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/expenses?category=${category}&page=${page}&limit=${limit}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await response.json();

      if (category === "Antor") {
        setAntorExpenses(data?.expenses);
        setAntorSubTotal(data?.totalCatExpenseAmount);
        setAntorTotalPages(Math.ceil(data?.total / limit));
      } else if (category === "Rakib") {
        setRakibExpenses(data?.expenses);
        setRakibSubTotal(data?.totalCatExpenseAmount);
        setRakibTotalPages(Math.ceil(data?.total / limit));
      } else if (category === "Hridoy") {
        setHridoyExpenses(data?.expenses);
        setHridoySubTotal(data?.totalCatExpenseAmount);
        setHridoyTotalPages(Math.ceil(data?.total / limit));
      }
      setTotalExpenses(data?.totalExpenseAmount); // Total expenses across all categories
    } catch (error) {
      console.log("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpense("Antor", antorPage);
    fetchExpense("Rakib", rakibPage);
    fetchExpense("Hridoy", hridoyPage);
  }, [antorPage, rakibPage, hridoyPage]);

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedExpense(null);
  };

  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

  const openDeleteConfirmModal = (itemId) => {
    setSelectedItemId(itemId);
    toggleDeleteModal();
  };

  const handleDelete = async () => {
    if (selectedItemId) {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/expenses/delete/${selectedItemId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            method: "DELETE",
          }
        );
        if (!response.ok) {
          toast.error("Failed to delete expense");
        } else {
          toast.success("Expense deleted successfully", {
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          fetchExpense("Antor", antorPage);
          fetchExpense("Rakib", rakibPage);
          fetchExpense("Hridoy", hridoyPage);
        }
      } catch (error) {
        toast.error("An error occurred while deleting the expense");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <div>
          <div>
            <h1 className="text-xl font-bold">Expenses</h1>
            <p className="text-lg font-semibold">(Total: {totalExpenses} TK)</p>
          </div>
          <p>
            <span className="font-semibold">Note:</span> Expenses are divided
            among Antor, Rakib, and Hridoy.
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

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Antor Expenses Table with Pagination */}
        <ExpenseTable
          title="Expenses of Antor"
          expenses={antorExpenses}
          subTotal={antorSubTotal}
          onEdit={(expense) => {
            setSelectedExpense(expense);
            setIsOpen(true);
          }}
          onDelete={openDeleteConfirmModal}
          currentPage={antorPage}
          totalPages={antorTotalPages}
          onPageChange={setAntorPage}
        />

        {/* Rakib Expenses Table with Pagination */}
        <ExpenseTable
          title="Expenses of Rakib"
          expenses={rakibExpenses}
          subTotal={rakibSubTotal}
          onEdit={(expense) => {
            setSelectedExpense(expense);
            setIsOpen(true);
          }}
          onDelete={openDeleteConfirmModal}
          currentPage={rakibPage}
          totalPages={rakibTotalPages}
          onPageChange={setRakibPage}
        />

        {/* Hridoy Expenses Table with Pagination */}
        <ExpenseTable
          title="Expenses of Hridoy"
          expenses={hridoyExpenses}
          subTotal={hridoySubTotal}
          onEdit={(expense) => {
            setSelectedExpense(expense);
            setIsOpen(true);
          }}
          onDelete={openDeleteConfirmModal}
          currentPage={hridoyPage}
          totalPages={hridoyTotalPages}
          onPageChange={setHridoyPage}
        />
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
        message="Are you sure you want to delete this expense? This action cannot be undone."
      />
    </>
  );
};

export default Expenses;
