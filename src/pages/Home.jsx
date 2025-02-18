import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeCustomerSay from "../components/HomeCustomerSay";
import { Avatar } from "@material-tailwind/react";

const Home = () => {
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
            <div className="bg-white border border-gray-200 rounded-md p-5">
              <h2 className="text-xl font-bold">Pending Orders</h2>
              <p className="text-3xl font-bold text-primary">0</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-md p-5">
              <h2 className="text-xl font-bold">Completed Orders</h2>
              <p className="text-3xl font-bold text-primary">0</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-md p-5">
              <h2 className="text-xl font-bold">Total Sales</h2>
              <p className="text-3xl font-bold text-primary">0</p>
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
