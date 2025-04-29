import {
  faArrowsRotate,
  faFileArrowDown,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../components/Invoice";
import Loader from "../loader/Loader";
import ReadyToParcel from "../components/ReadyToParcel";

const API_URL = "https://lushoriam-server-abnd.vercel.app";

const ReturnParcelModal = ({ show, onClose, onSubmit, formData, onChange }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Return Parcel Request</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Reason for Return</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={onChange}
            rows={4}
            placeholder="Write reason here..."
            className="w-full border border-gray-300 focus-within:border-primary outline-none rounded px-3 py-2"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const date = new Date().toLocaleDateString();
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [formData, setFormData] = useState({
    reason: "",
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/orders`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to update order status
  const handleStatusChange = async (orderId, newStatus, productId) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ productId, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      const data = await response.json();
      toast.success(data.message, { autoClose: 1000 });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Something went wrong! Try again.");
    }
  };

  // Function to open the modal for returning a parcel
  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setFormData({ reason: "" });
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  // Function to handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/returnparcels/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          customerId: selectedOrder._id,
          orderId: selectedOrder.orderId,
          customerName: selectedOrder.name,
          mobile: selectedOrder.mobile,
          reason: formData.reason,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Return request submitted!");
        handleCloseModal();
      } else {
        toast.error("Failed to submit return.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <div className="p-5 bg-white rounded-lg">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-5 gap-2">
        <div>
          <h2 className="text-2xl font-bold">Orders List ({orders.length})</h2>
          <p className="text-sm md:text-md text-gray-700">
            {orders.length
              ? "All orders are available here."
              : "Orders are not available here."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {orders && orders.length > 0 && (
            <button className="px-4 py-2 bg-green-500 rounded">
              <PDFDownloadLink
                document={<ReadyToParcel readyOrders={orders} />}
                fileName={`readytoparcel-${date}.pdf`}
              >
                {({ loading }) =>
                  loading ? (
                    <span className="text-white font-medium">Loading...</span>
                  ) : (
                    <span className="text-white">
                      Ready To Parcel
                      <FontAwesomeIcon
                        icon={faPrint}
                        className="ml-2 text-xl text-white"
                      />
                    </span>
                  )
                }
              </PDFDownloadLink>
            </button>
          )}

          <button
            onClick={fetchOrders}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
          >
            Refresh
            <FontAwesomeIcon
              icon={faArrowsRotate}
              className={`ml-2 transition-transform duration-300 ${
                loading ? "animate-spin" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {
        // Table section
        orders?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-4 py-2 border whitespace-nowrap">
                    Order ID
                  </th>
                  <th className="px-4 py-2 border whitespace-nowrap">
                    Customer
                  </th>
                  <th className="px-4 py-2 border whitespace-nowrap">
                    Address
                  </th>
                  <th className="px-4 py-2 border whitespace-nowrap">Mobile</th>
                  <th className="px-4 py-2 border whitespace-nowrap">
                    Product
                  </th>
                  <th className="px-4 py-2 border whitespace-nowrap">
                    Quantity
                  </th>
                  <th className="px-4 py-2 border whitespace-nowrap">
                    Delivery
                  </th>
                  <th className="px-4 py-2 border whitespace-nowrap">
                    Total Price (৳)
                  </th>
                  <th className="px-4 py-2 border whitespace-nowrap">Status</th>
                  <th className="px-4 py-2 border whitespace-nowrap">Action</th>
                  <th className="px-4 py-2 border whitespace-nowrap">Return</th>
                  <th className="px-4 py-2 border whitespace-nowrap">Print</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="text-center border-b">
                    <td className="px-4 py-3 border">{order.orderId}</td>
                    <td className="min-w-44 px-4 py-3 border">{order.name}</td>
                    <td className="min-w-64 px-4 py-3 border">
                      {order.address}
                    </td>
                    <td className="min-w-64 px-4 py-3 border">
                      {order.mobile}
                    </td>
                    <td className="min-w-44 px-4 py-3 border">
                      {order.productName}
                    </td>
                    <td className="px-4 py-3 border">{order.quantity}</td>
                    <td className="px-4 py-3 border">{order.delivery}</td>
                    <td className="px-4 py-3 border">{order.totalAmount}</td>
                    <td className="px-4 py-3 border">
                      <span
                        className={`text-white px-2 py-1 rounded-md capitalize ${
                          order.status === "pending"
                            ? "bg-yellow-600"
                            : order.status === "delivered"
                            ? "bg-green-600"
                            : order.status === "cancelled" ||
                              order.status === "rejected"
                            ? "bg-red-600"
                            : order.status === "returned"
                            ? "bg-gray-600"
                            : null
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 border">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(
                            order._id,
                            e.target.value,
                            order.productId
                          )
                        }
                        disabled={
                          order?.status === "returned" ||
                          order?.status === "delivered" ||
                          order?.status === "cancelled" ||
                          order?.status === "rejected"
                        }
                        className="px-3 py-1 border rounded bg-white focus:outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 border">
                      {order.status == "returned" ||
                      order.status == "delivered" ||
                      order.status == "cancelled" ||
                      order.status == "rejected" ? (
                        <button className="bg-gray-400 text-white px-3 py-1 rounded transition cursor-not-allowed">
                          Return
                        </button>
                      ) : (
                        <button
                          onClick={() => handleOpenModal(order)}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                        >
                          Return
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 border">
                      <PDFDownloadLink
                        document={<Invoice order={order} />}
                        fileName={`${order.orderId}.pdf`}
                      >
                        {({ loading }) =>
                          loading ? (
                            <FontAwesomeIcon
                              icon={faPrint}
                              className="text-xl text-gray-400"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faPrint}
                              className="text-xl text-primary"
                            />
                          )
                        }
                      </PDFDownloadLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // No data message
          <Loader />
        )
      }

      {/* Modal Component */}
      <ReturnParcelModal
        show={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
      />
    </div>
  );
};

export default Orders;
