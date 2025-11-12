import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import logoImage from "../assets/LOGO.png";
import backgroundImage from "../assets/academy-landing-page.jpg";

const LoginPage = () => {
  const { role } = useParams(); // "admin" or "user"
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [snackbar, setSnackbar] = useState({
    show: false,
    message: "",
    type: "",
  });

  const showSnackbar = (message, type = "error") => {
    setSnackbar({ show: true, message, type });
    setTimeout(() => setSnackbar({ show: false, message: "", type: "" }), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Remove backend call — simulate login success
    if (formData.email && formData.password) {
      showSnackbar("Login successful!", "success");

      // Simulate token store (optional)
      localStorage.setItem("token", "dummyToken123");
      localStorage.setItem(
        "user",
        JSON.stringify({ email: formData.email, role })
      );

      // ✅ Redirect after short delay
      setTimeout(() => {
        if (role === "admin") navigate("/admin/dashboard");
        else navigate("/studentquizz");
      }, 1000);
    } else {
      showSnackbar("Please enter email and password!", "error");
    }
  };

  return (
    <div
      className="flex w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Left Side */}
      <div className="flex-1 relative flex items-center justify-center bg-black/10">
        <img
          src={logoImage}
          alt="logo"
          className="absolute top-8 left-16 w-48 h-auto"
        />
      </div>

      {/* Right Form Section */}
      <form
        onSubmit={handleSubmit}
        className="absolute right-20 top-20 bg-white rounded-3xl flex flex-col justify-center items-start pl-15 pr-8 py-8 min-h-[70vh] w-[60vh] shadow-lg"
      >
        <h1 className="text-4xl font-normal text-black mb-3 self-start">
          {role === "admin" ? "Admin Login" : "User Login"}
        </h1>
        <p className="text-xl text-black mb-5 self-start">
          Welcome to Epixable Academy
        </p>

        {/* Email Input */}
        <div className="w-full mb-5">
          <label className="block text-black font-semibold mb-2">Email ID</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-[90%] p-3 border-2 border-gray-300 rounded-lg bg-gray-300 focus:outline-none focus:border-[#890596] text-lg font-semibold"
          />
        </div>

        {/* Password Input */}
        <div className="w-full mb-5">
          <label className="block text-black font-semibold mb-2">Password</label>
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
          Log in
        </button>

        {/* Register Link */}
        <p className="text-base text-black mt-4 self-start">
          Don’t have an account?{" "}
          <Link
            to={`/register/${role}`}
            className="text-[#890596] font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </form>

      {/* Snackbar Notification */}
      {snackbar.show && (
        <div
          className={`fixed bottom-5 right-5 px-5 py-3 rounded-lg text-white font-semibold shadow-lg transition-all duration-300 ${
            snackbar.type === "error" ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {snackbar.message}
        </div>
      )}
    </div>
  );
};

export default LoginPage;

