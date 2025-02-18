import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Slider from "../pages/Slider";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import AddSlider from "../pages/AddSlider";
import Faqs from "../pages/Faqs";
import AddFaq from "../pages/AddFaq";
import Reviews from "../pages/Reviews";
import AddReview from "../pages/AddReview";
import EditReview from "../pages/EditReview";
import EditFaq from "../pages/EditFaq";
import EditSlider from "../pages/EditSlider";
import Notification from "../pages/Notification";
import MyPdf from "../pages/MyPdf";
import Orders from "../pages/Orders";

const AppRoutes = () => {
  const user = localStorage.getItem("email");

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/sliders" element={<Slider />} />
          <Route path="/sliders/add-slider" element={<AddSlider />} />
          <Route path="/sliders/edit-slider/:id" element={<EditSlider />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/reviews/add-review" element={<AddReview />} />
          <Route path="/reviews/edit-review/:id" element={<EditReview />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/faqs/add-faq" element={<AddFaq />} />
          <Route path="/faqs/edit-faq/:id" element={<EditFaq />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/view-pdf/:id" element={<MyPdf />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
