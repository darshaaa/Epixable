import React, { useState } from "react";
import {
  FaHome,
  FaBook,
  FaVideo,
  FaUser,
  FaClipboardList,
  FaSignOutAlt,
  FaGraduationCap,
  FaUsers,
  FaUserGraduate,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/LOGO.png";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/admin/dashboard" },
    { name: "Knowledge Materials", icon: <FaBook />, path: "/admin/materials" },
    { name: "Recorded Videos", icon: <FaVideo />, path: "/admin/videos" },
    { name: "Courses", icon: <FaGraduationCap />, path: "/admin/courses" },
    { name: "Batch", icon: <FaUsers />, path: "/admin/batch" },
    { name: "Module", icon: <FaClipboardList />, path: "/admin/module" },
    { name: "Attendance", icon: <FaClipboardList />, path: "/admin/attendance" },
  ];

  return (
    <>
      {/* SIDEBAR */}
      <motion.div
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-64 bg-[#1B0138] text-white flex flex-col justify-between py-6 px-4 shadow-lg min-h-screen"
      >
        <div>
          <motion.div
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <img src={logo} alt="Epixable Logo" className="w-48 h-auto object-contain" />
          </motion.div>

          <ul className="space-y-3 mt-18">
            {menuItems.map((item) => (
              <motion.li
                key={item.name}
                onClick={() => navigate(item.path)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 200 }}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer font-semibold transition duration-200 ${
                  location.pathname === item.path
                    ? "bg-white text-[#1B0138]"
                    : "hover:bg-white hover:text-[#1B0138]"
                }`}
              >
                {item.icon} {item.name}
              </motion.li>
            ))}

            <motion.li
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 200 }}
              className={`p-3 rounded-xl cursor-pointer font-semibold transition duration-200 ${
                location.pathname.includes("/admin/student")
                  ? "bg-white text-[#1B0138]"
                  : "hover:bg-white hover:text-[#1B0138]"
              }`}
              onClick={() => navigate("/admin/list")}
            >
              <div className="flex items-center gap-3">
                <FaUserGraduate /> Student
              </div>
            </motion.li>
          </ul>
        </div>

        {/* LOGOUT BUTTON */}
        <motion.div
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 150 }}
          onClick={() => setShowLogoutPopup(true)}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:text-[#1B0138] cursor-pointer transition duration-200"
        >
          <FaSignOutAlt /> Logout
        </motion.div>
      </motion.div>

      {/* LOGOUT CONFIRMATION POPUP */}
      <AnimatePresence>
        {showLogoutPopup && (
          <>
            {/* Transparent Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setShowLogoutPopup(false)}
            />

            {/* Popup Box */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="fixed top-1/2 left-1/2 z-50 bg-white p-6 rounded-2xl shadow-xl w-80 -translate-x-1/2 -translate-y-1/2"
            >
              <h2 className="text-xl font-bold text-[#1B0138] mb-3">Confirm Logout</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to logout?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowLogoutPopup(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => navigate("/login/admin")}
                  className="px-4 py-2 rounded-lg bg-[#1B0138] text-white hover:bg-[#3A0070]"
                >
                  Yes, Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;
