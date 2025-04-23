import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { toast } from "react-toastify";

const API_URL = "https://lushoriam-server-abnd.vercel.app";

const Product = () => {
  // State variables
  const [products, setProducts] = useState([]);
  const [isTableLayout, setIsTableLayout] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch product data from the server
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/products`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      toast.error("Error fetching products.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Toggle delete confirmation modal
  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

  // Open delete confirmation modal with selected product ID
  const openDeleteConfirmModal = (itemId) => {
    setSelectedItemId(itemId);
    toggleDeleteModal();
  };

  // Handle delete action
  const handleDelete = async () => {
    if (selectedItemId) {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/products/delete/${selectedItemId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          toast.success("Product deleted successfully", {
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          fetchProducts(); // Refresh product list
        } else {
          toast.error("Failed to delete product");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the product");
      }
    }
  };

  // Handle status update
  const handleStatusUpdate = async (updateId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/products/status/${updateId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const data = await response.json();

      // Check if `data` contains the updated product status
      if (data?.data?.status) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === updateId
              ? { ...product, status: data.data.status }
              : product
          )
        );
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const toggleLayout = () => setIsTableLayout(!isTableLayout);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

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
          <h1 className="text-xl font-bold">Products</h1>
          <p className="text-sm text-gray-500">
            {products.length > 0
              ? "Products are available"
              : "No products available."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {selectedItemId ? (
            <Link
              to={`/view-pdf/${selectedItemId}`}
              className="bg-cyan-500 text-white px-4 py-2 rounded-md"
            >
              View PDF
            </Link>
          ) : null}
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md mt-2 md:mt-0"
            onClick={toggleLayout}
          >
            Change Layout
          </button>
          <Link to="/products/add-product">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 md:mt-0">
              Add Product
            </button>
          </Link>
        </div>
      </div>

      {/* Products List */}
      {products.length > 0 ? (
        <>
          {isTableLayout ? (
            // Table Layout
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                      Banner
                    </th>
                    <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                      Title
                    </th>
                    <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                      Category
                    </th>
                    <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                      Price (৳)
                    </th>
                    <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                      Quantity
                    </th>
                    <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((product) => (
                    <tr key={product?._id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 border-b">
                        <img
                          // src={`http://localhost:8000${product?.banner}`}
                          src={product?.banner}
                          alt={product?.title}
                          className="w-32 md:w-20 h-12 rounded"
                        />
                      </td>
                      <td className="px-6 py-4 border-b text-sm">
                        {product?.title}
                      </td>
                      <td className="px-6 py-4 border-b text-sm">
                        {product?.category}
                      </td>
                      <td className="px-6 py-4 border-b text-sm">
                        {product?.price}
                      </td>
                      <td className="px-6 py-4 border-b text-sm">
                        {product?.quantity}
                      </td>
                      <td className="px-6 py-4 border-b text-sm">
                        <span className="relative">
                          <div
                            className={`w-2 h-2 rounded-full absolute -top-1 -right-2 ${
                              product?.status === "Active"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          ></div>
                          <span className="font-semibold">
                            {product?.status}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4 border-b text-sm">
                        <div className="flex gap-2">
                          <button
                            className={`text-sm px-2.5 py-1 rounded-md border-2 transition-all duration-500 ${
                              product?.status === "Active"
                                ? "text-green-800 border-green-800 hover:bg-green-800 hover:text-white"
                                : "text-red-800 border-red-800 hover:bg-red-800 hover:text-white"
                            }`}
                            onClick={() => handleStatusUpdate(product?._id)}
                          >
                            <i
                              className={`fa-solid fa-${
                                product?.status === "Active" ? "pause" : "play"
                              }`}
                            ></i>
                          </button>
                          <Link to={`/products/edit-product/${product?._id}`}>
                            <button className="text-orange-800 border-2 border-orange-800 px-2 py-1 rounded-md text-sm hover:bg-orange-800 hover:text-white transition-all duration-500">
                              <i className="fa-solid fa-pencil"></i>
                            </button>
                          </Link>
                          <button
                            onClick={() => openDeleteConfirmModal(product?._id)}
                            className="text-red-800 border-2 border-red-800 px-2 py-1 rounded-md text-sm hover:bg-red-800 hover:text-white transition-all duration-500"
                          >
                            <i className="fa-regular fa-trash-can"></i>
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
              {currentItems.map((product) => (
                <div
                  key={product?._id}
                  className="w-full flex flex-col shadow-md rounded-md p-3"
                >
                  {/* Product Image */}
                  <img
                    src={product?.banner}
                    // src={`http://localhost:8000${product?.banner}`}
                    alt={product?.title}
                    className="w-full h-full md:h-[250px] object-cover rounded"
                  />
                  {/* Product Details */}
                  <h1 className="text-xl font-bold mt-3">{product?.title}</h1>
                  <p className="text-sm text-gray-500">
                    {product?.details.slice(0, 80)}...
                  </p>
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-2">
                    {/* Edit Product */}
                    <Link to={`/products/edit-product/${product?._id}`}>
                      <button className="text-orange-800 border-2 border-orange-800 px-2 py-1 rounded-md text-sm hover:bg-orange-800 hover:text-white transition-all duration-500">
                        <i className="fa-solid fa-pencil"></i>
                      </button>
                    </Link>
                    {/* Delete Product */}
                    <button
                      onClick={() => openDeleteConfirmModal(product?._id)}
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
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    </div>
  );
};

export default Product;
