import { Button, Card, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = "https://lushoriam-server-abnd.vercel.app";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  // Validation function
  const validateField = (name, value) => {
    if (!value)
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    if (name === "email" && !/\S+@\S+\.\S+/.test(value))
      return "Invalid email address.";
    if (name === "password" && value.length < 6)
      return "Password must be at least 6 characters.";
    return "";
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear errors on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/v1/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        toast.success("Successfully Logged In!", { autoClose: 1000 });
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        toast.error(data.message || "Login failed");
        setFormData({ email: "", password: "" });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center p-5 md:p-0"
      style={{ backgroundImage: "url('/img/login-bg.jpg')" }}
    >
      <div className="w-full md:max-w-[700px] p-6 flex items-center justify-center rounded-md login-blur">
        <Card
          color="transparent"
          shadow={false}
          className="p-6 w-full max-w-md"
        >
          <img
            src="/img/logo.svg"
            alt="Logo"
            width={200}
            className="mx-auto mb-4"
          />
          <p className="mb-5 text-center text-gray-900">
            Nice to meet you! Enter your details to login.
          </p>
          <form onSubmit={handleLogin} className="w-full mx-auto px-5">
            {Object.keys(formData).map((field) => (
              <div key={field} className="mb-4">
                <p className="mb-1 font-normal text-gray-400">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </p>
                <input
                  type={field === "password" ? "password" : "text"}
                  placeholder={
                    field === "email" ? "name@gmail.com" : "********"
                  }
                  className="w-full px-3 py-2 rounded-md border border-gray-900 bg-transparent text-white placeholder:text-gray-900 focus:border-primary focus:outline-none"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                />
                {errors[field] && (
                  <Typography className="text-red-800 text-sm mt-1">
                    {errors[field]}
                  </Typography>
                )}
              </div>
            ))}
            <Button
              type="submit"
              className="py-1.5 mt-5 w-full bg-primary hover:bg-secondary transition duration-500 flex items-center justify-center gap-2"
            >
              <span>Log In</span>
              <lord-icon
                src="https://cdn.lordicon.com/vduvxizq.json"
                trigger="loop"
                delay="2000"
                colors="primary:#ffffff"
                style={{ width: "20px", height: "30px" }}
              ></lord-icon>
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
