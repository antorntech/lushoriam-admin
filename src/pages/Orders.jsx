import { useState } from "react";

const Orders = () => {
  // Sample orders data
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: "John Doe",
      product: "Printed Sunny Umbrella",
      quantity: 2,
      totalPrice: 1280,
      status: "Pending",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      product: "Elegant Raincoat",
      quantity: 1,
      totalPrice: 900,
      status: "Pending",
    },
    {
      id: 3,
      customerName: "David Johnson",
      product: "Classic Leather Wallet",
      quantity: 3,
      totalPrice: 2100,
      status: "Done",
    },
  ]);

  // Function to update order status
  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="p-5 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
        Orders List
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">Customer Name</th>
              <th className="px-4 py-2 border">Product</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Total Price (TK)</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center border-b">
                <td className="px-4 py-3 border">{order.id}</td>
                <td className="px-4 py-3 border">{order.customerName}</td>
                <td className="px-4 py-3 border">{order.product}</td>
                <td className="px-4 py-3 border">{order.quantity}</td>
                <td className="px-4 py-3 border">{order.totalPrice} TK</td>
                <td
                  className={`px-4 py-3 border font-semibold ${
                    order.status === "Pending"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {order.status}
                </td>
                <td className="px-4 py-3 border">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="px-3 py-1 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Done">Done</option>
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
