import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { toast } from "react-toastify";

const API_URL = "https://lushoriam-server-abnd.vercel.app";

const Faq = () => {
  // State variables
  const [faqs, setFaqs] = useState([]);
  const [isTableLayout, setIsTableLayout] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch faq data from the server
  const fetchFaqs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/faqs`);
      const data = await response.json();
      setFaqs(data);
    } catch (error) {
      toast.error("Error fetching faqs.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  // Toggle delete confirmation modal
  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

  // Open delete confirmation modal with selected faq ID
  const openDeleteConfirmModal = (itemId) => {
    setSelectedItemId(itemId);
    toggleDeleteModal();
  };

  // Handle delete action
  const handleDelete = async () => {
    if (selectedItemId) {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/faqs/delete/${selectedItemId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          toast.success("Faq deleted successfully", {
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          fetchFaqs(); // Refresh faq list
        } else {
          toast.error("Failed to delete faq");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the faq");
      }
    }
  };

  // Toggle between table and grid layout
  const toggleLayout = () => setIsTableLayout(!isTableLayout);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = faqs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(faqs.length / itemsPerPage);

  // Pagination controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Show loader while fetching data
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {/* Header Section */}
      <div className="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold">Faqs</h1>
          <p className="text-sm text-gray-500">
            {faqs.length > 0 ? "Faqs are available" : "No faqs available."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md mt-2 md:mt-0"
            onClick={toggleLayout}
          >
            Change Layout
          </button>
          <Link to="/faqs/add-faq">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 md:mt-0">
              Add Faq
            </button>
          </Link>
        </div>
      </div>

      {/* Faqs List */}
      {faqs.length > 0 ? (
        <>
          {isTableLayout ? (
            // Table Layout
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                      Question
                    </th>
                    <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                      Answer
                    </th>
                    <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((faq) => (
                    <tr key={faq.id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 border-b">
                        <h1 className="text-sm font-bold">{faq?.question}</h1>
                      </td>
                      <td className="px-6 py-4 border-b text-sm text-gray-500">
                        {faq?.answer.slice(0, 50)}...
                      </td>

                      <td className="px-6 py-4 border-b text-sm">
                        <div className="flex gap-2">
                          <Link to={`/faqs/edit-faq/${faq._id}`}>
                            <button className="text-orange-800 border-2 border-orange-800 px-2 py-1 rounded-md text-sm hover:bg-orange-800 hover:text-white transition-all duration-500">
                              <i class="fa-solid fa-pencil"></i>
                            </button>
                          </Link>
                          <button
                            onClick={() => openDeleteConfirmModal(faq._id)}
                            className="text-red-800 border-2 border-red-800 px-2 py-1 rounded-md text-sm hover:bg-red-800 hover:text-white transition-all duration-500"
                          >
                            <i class="fa-regular fa-trash-can"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // Grid Layout
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {currentItems.map((faq) => (
                <div
                  key={faq._id}
                  className="w-full flex flex-col shadow-md rounded-md p-3"
                >
                  <h1 className="text-lg font-bold">{faq.question}</h1>
                  <p className="text-sm">{faq.answer}</p>
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-2">
                    {/* Edit Faq */}
                    <Link to={`/faqs/edit-faq/${faq._id}`}>
                      <button className="text-orange-800 border-2 border-orange-800 px-2 py-1 rounded-md text-sm hover:bg-orange-800 hover:text-white transition-all duration-500">
                        <i className="fa-solid fa-pencil"></i>
                      </button>
                    </Link>
                    {/* Delete Faq */}
                    <button
                      onClick={() => openDeleteConfirmModal(faq._id)}
                      className="text-red-800 border-2 border-red-800 px-2 py-1 rounded-md text-sm hover:bg-red-800 hover:text-white transition-all duration-500"
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center mt-5">
            {/* Previous Page Button */}
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              <i className="fa-solid fa-angle-left"></i>
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* Next Page Button */}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </>
      ) : (
        <Loader />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={openDeleteModal}
        handleOpen={toggleDeleteModal}
        onDelete={handleDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this faq? This action cannot be undone."
      />
    </div>
  );
};

export default Faq;
