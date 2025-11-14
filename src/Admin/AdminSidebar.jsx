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
  const [showStudentMenu, setShowStudentMenu] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/admin/dashboard" },
    { name: "Knowledge Materials", icon: <FaBook />, path: "/admin/materials" },
    { name: "Attendance", icon: <FaClipboardList />, path: "/admin/attendance" },
    { name: "Recorded Videos", icon: <FaVideo />, path: "/admin/videos" },
    { name: "Courses", icon: <FaGraduationCap />, path: "/admin/courses" },
    { name: "Batch", icon: <FaUsers />, path: "/admin/batch" },
    { name: "Module", icon: <FaClipboardList />, path: "/admin/module" },

  ];

  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-64 bg-[#1B0138] text-white flex flex-col justify-between py-6 px-4 shadow-lg min-h-screen"
    >
      {/* Logo */}
      <div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <img
            src={logo}
            alt="Epixable Logo"
            className="w-48 h-auto object-contain"
          />
        </motion.div>

        {/* Main Menu */}
        <ul className="space-y-3 mt-18">
          {menuItems.map((item, index) => (
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

          {/* Student Dropdown */}
          <motion.li
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`p-3 rounded-xl cursor-pointer font-semibold transition duration-200 ${
              location.pathname.includes("/admin/student")
                ? "bg-white text-[#1B0138]"
                : "hover:bg-white hover:text-[#1B0138]"
            }`}
            onClick={() => setShowStudentMenu(!showStudentMenu)}
          >
            <div className="flex items-center gap-3">
              <FaUserGraduate /> Student
            </div>

            {/* Dropdown Submenu */}
            <AnimatePresence>
              {showStudentMenu && (
                <motion.ul
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 ml-6 space-y-2 text-sm"
                >
                  <li
                    onClick={() => navigate("/admin/student/create")}
                    className={`block px-2 py-2 rounded-lg cursor-pointer ${
                      location.pathname === "/admin/student/create"
                        ? "bg-white text-[#1B0138]"
                        : "hover:bg-white hover:text-[#1B0138]"
                    }`}
                  >
                    ➤ Create New
                  </li>
                  <li
                    onClick={() => navigate("/admin/student/list")}
                    className={`block px-2 py-2 rounded-lg cursor-pointer ${
                      location.pathname === "/admin/student/list"
                        ? "bg-white text-[#1B0138]"
                        : "hover:bg-white hover:text-[#1B0138]"
                    }`}
                  >
                    ➤ List
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.li>
        </ul>
      </div>

      {/* Logout */}
      <motion.div
        whileHover={{ scale: 1.05, x: 5 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 150 }}
        onClick={() => navigate("/login/admin")}
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:text-[#1B0138] cursor-pointer transition duration-200"
      >
        <FaSignOutAlt /> Logout
      </motion.div>
    </motion.div>
  );
};

export default AdminSidebar;
