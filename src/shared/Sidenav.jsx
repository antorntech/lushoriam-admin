import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    link: "/",
    icon: "/img/icons/dashboard",
  },
  {
    title: "Products",
    link: "/products",
    icon: "/img/icons/product",
  },
  {
    title: "Orders",
    link: "/orders",
    icon: "/img/icons/order",
  },
  {
    title: "Return Parcels",
    link: "/return-parcels",
    icon: "/img/icons/returnparcel",
  },
  {
    title: "Sliders",
    link: "/sliders",
    icon: "/img/icons/slider",
  },
  {
    title: "Faqs",
    link: "/faqs",
    icon: "/img/icons/faq",
  },
  {
    title: "Reviews",
    link: "/reviews",
    icon: "/img/icons/review",
  },
  {
    title: "Expenses",
    link: "/expenses",
    icon: "/img/icons/expenses",
  },
];

const Sidenav = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const handleMenuClick = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="px-4 py-2 bg-[#050828] text-white fixed top-4 left-4 z-50 md:hidden rounded-md"
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full transform transition-transform z-50 bg-white w-[250px] ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="bg-white px-3 min-h-[70px] flex items-center justify-center">
          <Link to={"/"}>
            <img
              src="/img/logo.svg"
              alt="Logo"
              className="w-[150px] h-[40px]"
            />
          </Link>
        </div>
        <div className="p-3 flex flex-col h-full">
          <ul className="w-full flex flex-col">
            {menuItems.map((item, index) => (
              <li key={index} className="mb-1">
                {item.submenu ? (
                  <>
                    <div className="group">
                      <div
                        className={`rounded-md flex items-center justify-between menu-title p-2 cursor-pointer hover:text-[#050828] transition-all duration-500 ${
                          activeMenu === index
                            ? "bg-primary text-white hover:text-white"
                            : ""
                        }`}
                        onClick={() => handleMenuClick(index)}
                      >
                        <div className="flex items-center">
                          <img
                            src={
                              activeMenu === index
                                ? item.icon + "-light.png"
                                : item.icon + "-dark.png"
                            }
                            alt=""
                            className="mr-2"
                          />
                          <p>{item.title}</p>
                        </div>
                        <i
                          className={`fa-solid fa-angle-right transition-transform ${
                            activeMenu === index ? "rotate-90" : ""
                          }`}
                        ></i>
                      </div>
                      <div className="h-[1px] w-full bg-gray-200"></div>
                    </div>
                    {activeMenu === index && (
                      <ul className="pl-5 mt-1">
                        {item.submenu.map((subitem, subindex) => (
                          <li key={subindex}>
                            <Link
                              to={subitem.link}
                              className={`block p-2 rounded-md  ${
                                currentPath === subitem.link
                                  ? "bg-[#050828] text-white"
                                  : ""
                              }`}
                              onClick={toggleSidebar}
                            >
                              <i className="fa-solid fa-minus mr-2"></i>
                              {subitem.text}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <div className="group">
                    <Link
                      to={item.link}
                      className={`flex items-center p-2 rounded-md hover:text-[#050828] transition-all duration-500 ${
                        currentPath === item.link
                          ? "bg-primary text-white hover:text-white"
                          : ""
                      }`}
                      onClick={toggleSidebar}
                    >
                      <img
                        src={
                          currentPath === item.link
                            ? item.icon + "-light.png"
                            : item.icon + "-dark.png"
                        }
                        alt=""
                        className="mr-2"
                      />
                      <span className="text-[17px]">{item.title}</span>
                    </Link>
                    <div className="h-[1px] w-full bg-gray-200 rounded-md"></div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidenav;
