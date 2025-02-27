import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(orders);

  // Function to update order status
  const handleStatusChange = async (orderId, newStatus, productId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId, status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      const data = await response.json();
      toast.success(data.message, {
        autoClose: 1000,
      });

      // Optionally, update the state to reflect the new status in UI
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
    <div className="p-5 bg-white shadow-md rounded-lg">
      <div className="mb-5">
        <h2 className="text-2xl font-bold">Orders List ({orders.length})</h2>
        {orders ? (
          <p className="text-sm md:text-md text-gray-700">
            All orders are available here.
          </p>
        ) : (
          <p className="text-sm md:text-md text-gray-700">
            Orders are not available here.
          </p>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-2 border whitespace-nowrap">Order ID</th>
              <th className="px-4 py-2 border whitespace-nowrap">
                Customer Name
              </th>
              <th className="px-4 py-2 border whitespace-nowrap">
                Customer Address
              </th>
              <th className="px-4 py-2 border whitespace-nowrap">Mobile</th>
              <th className="px-4 py-2 border whitespace-nowrap">Product</th>
              <th className="px-4 py-2 border whitespace-nowrap">Quantity</th>
              <th className="px-4 py-2 border whitespace-nowrap">Delivery</th>
              <th className="px-4 py-2 border whitespace-nowrap">
                Total Price (৳)
              </th>
              <th className="px-4 py-2 border whitespace-nowrap">Status</th>
              <th className="px-4 py-2 border whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center border-b">
                <td className="px-4 py-3 border whitespace-nowrap">
                  {order.orderId}
                </td>
                <td className="px-4 py-3 border whitespace-nowrap">
                  {order.name}
                </td>
                <td className="px-4 py-3 border whitespace-nowrap">
                  {order.address}
                </td>
                <td className="px-4 py-3 border whitespace-nowrap">
                  {order.mobile}
                </td>
                <td className="px-4 py-3 border whitespace-nowrap">
                  {order.productName}
                </td>
                <td className="px-4 py-3 border whitespace-nowrap">
                  {order.quantity}
                </td>
                <td className="px-4 py-3 border whitespace-nowrap">
                  {order.delivery}
                </td>
                <td className="px-4 py-3 border whitespace-nowrap">
                  {order.totalAmount}
                </td>
                <td className={`px-4 py-3 border `}>
                  <p
                    className={`text-white px-2 py-1 w-[110px] capitalize rounded-md ${
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
                  </p>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
