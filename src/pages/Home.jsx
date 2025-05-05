import React, { useEffect, useState } from "react";
import { Avatar } from "@material-tailwind/react";
import useGetData from "../utils/useGetData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

const ChartComponent = () => {
  const [activeTab, setActiveTab] = useState("1 week");

  const dataSets = {
    "1 week": [
      { name: "", sale: 20, base: 0 },
      { name: "", sale: 14, base: 0 },
      { name: "", sale: 65, base: 0 },
      { name: "", sale: 85, base: 0 },
      { name: "", sale: 98, base: 0 },
    ],
    "1 month": [
      { name: "", sale: 15, base: 0 },
      { name: "", sale: 45, base: 0 },
      { name: "", sale: 75, base: 0 },
      { name: "", sale: 95, base: 0 },
    ],
    "6 month": [
      { name: "", sale: 30, base: 0 },
      { name: "", sale: 50, base: 0 },
      { name: "", sale: 70, base: 0 },
      { name: "", sale: 90, base: 0 },
      { name: "", sale: 100, base: 0 },
      { name: "", sale: 110, base: 0 },
    ],
    "1 year": [
      { name: "", sale: 60, base: 0 },
      { name: "", sale: 80, base: 0 },
      { name: "", sale: 100, base: 0 },
      { name: "", sale: 120, base: 0 },
    ],
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 my-0 md:my-4">
      {/* Tab Buttons */}
      <div className="w-full flex justify-center gap-4 mb-6">
        {["1 week", "1 month", "6 month", "1 year"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full px-2 md:px-4 py-2 rounded-md border capitalize ${
              activeTab === tab
                ? "bg-primary text-white"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {tab.slice(0, 3)}
          </button>
        ))}
      </div>

      <div className="h-96 border border-gray-300 rounded-md">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dataSets[activeTab]}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              vertical={true}
              horizontal={false}
              stroke="#e5e7eb"
            />

            <ReferenceLine y={0} stroke="#9ca3af" strokeWidth={1} />

            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip cursor={{ stroke: "#ccc", strokeWidth: 1 }} />

            <Line
              type="monotone"
              dataKey="sale"
              stroke="#0cc0df"
              strokeWidth={2}
              activeDot={{ r: 5, fill: "30cc0df", stroke: "30cc0df" }}
              dot={{ r: 4, fill: "30cc0df", stroke: "30cc0df" }}
            />

            <Line
              type="linear"
              dataKey="base"
              stroke="transparent"
              dot={{ r: 6, fill: "white", stroke: "#0cc0df", strokeWidth: 2 }}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Home = () => {
  const [todaysConfirmedOrders, setTodaysConfirmedOrders] = useState(null);

  // Custom hook to fetch the data
  const todaysConfirmedData = useGetData("orders/todays/confirmed");

  useEffect(() => {
    if (todaysConfirmedData) {
      setTodaysConfirmedOrders(todaysConfirmedData?.confirmedOrdersCount); // Extract confirmedOrdersCount
    }
  }, [todaysConfirmedData]);

  const orders = useGetData("orders/simply");
  const reviews = useGetData("reviews");
  const returnParcel = useGetData("returnparcels");
  const products = useGetData("products");
  const expenses = useGetData("expenses");
  const activeProduct = products?.find(
    (product) => product.status === "Active"
  );

  const remainingProductPrice = activeProduct?.price * activeProduct?.quantity;

  const totalOrders = orders?.orders?.length;

  const pendingOrders = orders?.orders?.filter(
    (order) => order.status === "pending"
  );

  const completedOrders = orders?.orders?.filter(
    (order) => order.status === "delivered"
  );

  const totalSales = completedOrders?.reduce(
    (acc, order) => acc + order.totalAmount,
    0
  );

  const totalExpenses = expenses?.totalExpenseAmount;

  return (
    <div className="flex flex-col lg:flex-row items-start justify-between gap-5">
      <div className="w-full lg:w-[70%]">
        <div>
          <div className="relative custom-shadow2">
            <img
              src="/img/admin-banner.jpg"
              alt=""
              className="rounded-md w-full h-full object-contain"
            />
            <div className="absolute top-0 left-0 bg-green-200 w-full h-full custom-blur rounded-md">
              <div className="w-full h-full flex flex-col justify-center items-center">
                <h1 className="text-2xl md:text-5xl font-bold text-white">
                  Hi <span className="text-primary">Admin !</span>
                </h1>
                <p className="text-sm md:text-lg text-white text-center">
                  Welcome to Lushoriam
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-md p-5">
              <div className="">
                <h2 className="text-xl font-bold">Stock Products</h2>
                <p className="text-3xl font-bold text-primary">
                  {activeProduct?.quantity}
                </p>
              </div>
              <div className="">
                <img
                  src="/img/icons/total-products.png"
                  alt="total-products.png"
                  className="size-14 object-contain"
                />
              </div>
            </div>
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-md p-5">
              <div className="">
                <h2 className="text-xl font-bold">Pending Orders</h2>
                <p className="text-3xl font-bold text-primary">
                  {pendingOrders?.length}
                </p>
              </div>
              <div className="">
                <img
                  src="/img/icons/pending-orders.png"
                  alt="pending-orders.png"
                  className="size-12 object-contain"
                />
              </div>
            </div>
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-md p-5">
              <div className="">
                <h2 className="text-xl font-bold">Confirmed Orders</h2>
                <p className="text-3xl font-bold text-primary">
                  {todaysConfirmedOrders !== null ? todaysConfirmedOrders : 0}
                </p>
              </div>
              <div className="">
                <img
                  src="/img/icons/pending-orders.png"
                  alt="pending-orders.png"
                  className="size-12 object-contain"
                />
              </div>
            </div>
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-md p-5">
              <div>
                <h2 className="text-xl font-bold">Completed Orders</h2>
                <p className="text-3xl font-bold text-primary">
                  {completedOrders?.length}
                </p>
              </div>
              <div>
                <img
                  src="/img/icons/completed-orders.png"
                  alt="completed-orders.png"
                  className="size-14 object-contain"
                />
              </div>
            </div>
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-md p-5">
              <div>
                <h2 className="text-xl font-bold">Total Orders</h2>
                <p className="text-3xl font-bold text-primary">{totalOrders}</p>
              </div>
              <div>
                <img
                  src="/img/icons/total-orders.png"
                  alt="total-orders.png"
                  className="size-14 object-contain"
                />
              </div>
            </div>
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-md p-5">
              <div>
                <h2 className="text-xl font-bold">Total Return</h2>
                <p className="text-3xl font-bold text-primary">
                  {returnParcel?.data?.length}
                </p>
              </div>
              <div>
                <img
                  src="/img/icons/total-return.png"
                  alt="total-return.png"
                  className="size-14 object-contain"
                />
              </div>
            </div>
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-md p-5">
              <div>
                <h2 className="text-xl font-bold">Total Reviews</h2>
                <p className="text-3xl font-bold text-primary">
                  {reviews?.length}
                </p>
              </div>
              <div>
                <img
                  src="/img/icons/total-reviews.png"
                  alt="total-reviews.png"
                  className="size-14 object-contain"
                />
              </div>
            </div>
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-md p-5">
              <div>
                <h2 className="text-xl font-bold">Total Sales</h2>
                <p className="text-3xl font-bold text-primary">
                  {Number(totalSales).toLocaleString()}
                </p>
              </div>
              <div>
                <img
                  src="/img/icons/total-sales.png"
                  alt="total-sales.png"
                  className="size-14 object-contain"
                />
              </div>
            </div>
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-md p-5">
              <div>
                <h2 className="text-xl font-bold">Stock Balance</h2>
                <p className="text-3xl font-bold text-primary">
                  {Number(remainingProductPrice).toLocaleString()}
                </p>
              </div>
              <div>
                <img
                  src="/img/icons/total-sales.png"
                  alt="total-sales.png"
                  className="size-14 object-contain"
                />
              </div>
            </div>
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-md p-5">
              <div>
                <h2 className="text-xl font-bold">Total Expenses</h2>
                <p className="text-3xl font-bold text-primary">
                  {Number(totalExpenses).toLocaleString()}
                </p>
              </div>
              <div>
                <img
                  src="/img/icons/total-sales.png"
                  alt="total-sales.png"
                  className="size-14 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[30%] bg-white custom-shadow2 rounded-md flex flex-col items-center p-1 ">
        <div className="flex flex-col items-center">
          <div className="w-full text-center mt-1">
            <img src="/img/logo.svg" alt="Logo" className="w-44 md:w-52" />
            <h2 className="text-xl md:text-2xl font-bold">Sales Report</h2>
            <p className="text-sm text-gray-500">
              Sales report can be seen here
            </p>
          </div>
        </div>
        <div className="w-full mt-5 md:mt-0">
          <ChartComponent />
        </div>
      </div>
    </div>
  );
};

export default Home;
