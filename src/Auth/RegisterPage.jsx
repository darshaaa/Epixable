import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { api } from "../Axios/axios";
import logoImage from "../assets/LOGO.png";
import backgroundImage from "../assets/academy-landing-page.jpg";

const RegisterPage = () => {
  const { role } = useParams(); // "admin" or "user"
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await api.post(`/auth/register/${role}`, formData);
      console.log("Register Response:", response.data);

      const token =
        response.data.token ||
        response.data.accessToken ||
        response.data.userToken ||
        response.data.data?.token;

      if (token) {
        localStorage.setItem("token", token);
      }

      if (response.data.user || response.data.admin) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user || response.data.admin)
        );
      }

      setMessage(response.data.message || `${role} registered successfully!`);
      setTimeout(() => navigate(`/login/${role}`), 1000);
    } catch (error) {
      console.error("Registration Error:", error);
      setMessage(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div
      className="flex w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Left Side with Logo */}
      <div className="flex-1 relative flex items-center justify-center bg-black/10">
        <img
          src={logoImage}
          alt="logo"
          className="absolute top-8 left-16 w-48 h-auto"
        />
      </div>

      {/* Right Side Form */}
      <form
        onSubmit={handleSubmit}
        className="absolute right-20 top-20 bg-white rounded-3xl flex flex-col justify-center items-start pl-15 pr-8 py-8 min-h-[75vh] w-[60vh] shadow-lg"
      >
        <h1 className="text-4xl font-normal text-black mb-3 self-start">
          Register
        </h1>
        <p className="text-xl text-black mb-5 self-start">
          {role === "admin" ? "Admin" : "User"} Account Registration
        </p>

        {/* Username */}
        <div className="w-full mb-5">
          <label className="block text-black font-semibold mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-[90%] p-3 border-2 border-gray-300 rounded-lg bg-gray-300 focus:outline-none focus:border-[#890596] text-lg font-semibold"
          />
        </div>

        {/* Email */}
        <div className="w-full mb-5">
          <label className="block text-black font-semibold mb-2">
            Email ID
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-[90%] p-3 border-2 border-gray-300 rounded-lg bg-gray-300 focus:outline-none focus:border-[#890596] text-lg font-semibold"
          />
        </div>

        {/* Password */}
        <div className="w-full mb-5">
          <label className="block text-black font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-[90%] p-3 border-2 border-gray-300 rounded-lg bg-gray-300 focus:outline-none focus:border-[#890596] text-lg font-semibold"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-[90%] py-3 bg-[#52057B] hover:bg-[#890596] text-white font-bold text-base rounded-lg transition-colors duration-300"
        >
          Register
        </button>

        {/* Login Link */}
        <p className="text-base text-black mt-4 self-start">
          Already have an account?{" "}
          <Link
            to={`/login/${role}`}
            className="text-[#890596] font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>

        {/* Message */}
        {message && (
          <p
            className={`text-center mt-4 text-sm font-medium ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default RegisterPage;
