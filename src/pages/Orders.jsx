import { faArrowsRotate, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../components/Invoice";

const API_URL = "https://lushoriam-server-abnd.vercel.app";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

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
      const response = await fetch(
        `http://localhost:8000/api/v1/orders/${orderId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, status: newStatus }),
        }
      );

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

  return (
    <div className="p-5 bg-white rounded-lg">
      {/* Header section */}
      <div className="flex justify-between items-center">
        <div className="mb-5">
          <h2 className="text-2xl font-bold">Orders List ({orders.length})</h2>
          <p className="text-sm md:text-md text-gray-700">
            {orders.length
              ? "All orders are available here."
              : "Orders are not available here."}
          </p>
        </div>
        <div>
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
                  <th className="px-4 py-2 border">Order ID</th>
                  <th className="px-4 py-2 border">Customer</th>
                  <th className="px-4 py-2 border">Address</th>
                  <th className="px-4 py-2 border">Mobile</th>
                  <th className="px-4 py-2 border">Product</th>
                  <th className="px-4 py-2 border">Quantity</th>
                  <th className="px-4 py-2 border">Delivery</th>
                  <th className="px-4 py-2 border whitespace-nowrap">
                    Total Price (৳)
                  </th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Action</th>
                  <th className="px-4 py-2 border">Print</th>
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
                            : order.status === "processing"
                            ? "bg-blue-600"
                            : order.status === "shipped"
                            ? "bg-purple-600"
                            : order.status === "delivered"
                            ? "bg-green-600"
                            : "bg-red-600"
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
                        className="px-3 py-1 border rounded bg-white focus:outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
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
          <div className="text-center text-gray-500 text-lg font-semibold mt-5">
            No orders found.
          </div>
        )
      }
    </div>
  );
};

export default Orders;
