import React, { useState, useEffect } from "react";
import Loader from "../loader/Loader";

// const API_URL = "https://lushoriam-server-abnd.vercel.app";
const API_URL = "http://localhost:8000";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (password.length < 6) {
      return setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
    }

    if (password !== confirmPassword) {
      return setError("পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না");
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/v1/admin/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "❌ পাসওয়ার্ড পরিবর্তনে সমস্যা হয়েছে");
      }

      setMessage("✅ পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message || "❌ পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">🔐 পাসওয়ার্ড পরিবর্তন</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2.5 rounded-md border border-gray-300  text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-primary focus:border-t-border-primary focus:outline-none"
            placeholder="নতুন পাসওয়ার্ড"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2.5 rounded-md border border-gray-300  text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-primary focus:border-t-border-primary focus:outline-none"
            placeholder="পাসওয়ার্ড নিশ্চিত করুন"
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Processing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

const Settings = () => {
  return (
    <div className="w-full">
      <ChangePassword />
    </div>
  );
};

export default Settings;
