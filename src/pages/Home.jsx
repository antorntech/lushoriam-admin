import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeCustomerSay from "../components/HomeCustomerSay";
import { Avatar } from "@material-tailwind/react";
import useGetData from "../utils/useGetData";

const Home = () => {
  const orders = useGetData("orders");
  const reviews = useGetData("reviews");
  const products = useGetData("products");
  const activeProduct = products?.find(
    (product) => product.status === "Active"
  );

  const pendingOrders = orders?.filter((order) => order.status === "pending");
  const completedOrders = orders?.filter(
    (order) => order.status === "delivered"
  );

  const totalSales = completedOrders?.reduce(
    (acc, order) => acc + order.totalAmount,
    0
  );

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
                <h2 className="text-xl font-bold">Total Products</h2>
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
                <p className="text-3xl font-bold text-primary">
                  {orders?.length}
                </p>
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
                <p className="text-3xl font-bold text-primary">{totalSales}</p>
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
      <div className="w-full lg:w-[30%] bg-white custom-shadow2 rounded-md flex flex-col items-center p-5">
        <div className="flex flex-col items-center">
          <div className="w-[90px] h-[90px] rounded-full bg-[#050828] flex items-center justify-center">
            <Avatar
              src="https://docs.material-tailwind.com/img/face-2.jpg"
              alt="avatar"
              size="xl"
            />
            {/* <h1 className="text-4xl font-semibold text-white">AD</h1> */}
          </div>
          <div className="w-full text-center mt-1">
            <h2 className="text-xl font-bold">Mr. Admin</h2>
            <p className="text-sm text-gray-500">Admin, Lushoriam</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
