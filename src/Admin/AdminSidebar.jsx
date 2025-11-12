// import React from "react";
// import { FaHome, FaBook, FaVideo, FaUser, FaSignOutAlt } from "react-icons/fa";
// import { useNavigate, useLocation } from "react-router-dom";
// import logo from "../assets/LOGO.png";

// const AdminSidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const menuItems = [
//     { name: "Dashboard", icon: <FaHome />, path: "/admin/dashboard" },
//     { name: "Knowledge Materials", icon: <FaBook />, path: "/admin/materials" },
//     { name: "Recorded Videos", icon: <FaVideo />, path: "/admin/videos" },
//     { name: "Profile", icon: <FaUser />, path: "/admin/profile" },
//   ];

//   return (
//     <div className="w-64 bg-[#52057B] text-white flex flex-col justify-between py-6 px-4 shadow-lg min-h-screen">
//       <div>
//         {/* ✅ Logo Section */}
//         <div className="flex justify-center mb-6">
//           <img src={logo} alt="Epixable Logo" className="w-48 h-auto object-contain" />
//         </div>

//         {/* Menu Items */}
//         <ul className="space-y-3">
//           {menuItems.map((item) => (
//             <li
//               key={item.name}
//               onClick={() => navigate(item.path)}
//               className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer font-semibold transition ${
//                 location.pathname === item.path
//                   ? "bg-[#890596]"
//                   : "hover:bg-[#890596]"
//               }`}
//             >
//               {item.icon} {item.name}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Logout */}
//       <div
//         onClick={() => navigate("/login/admin")}
//         className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#890596] cursor-pointer"
//       >
//         <FaSignOutAlt /> Logout
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;
import React from "react";
import { FaHome, FaBook, FaVideo, FaUser, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/LOGO.png";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/admin/dashboard" },
    { name: "Knowledge Materials", icon: <FaBook />, path: "/admin/materials" },
    { name: "Attendance", icon: <FaClipboardList />, path: "/admin/attendance" },
    { name: "Recorded Videos", icon: <FaVideo />, path: "/admin/videos" },
    { name: "Profile", icon: <FaUser />, path: "/admin/profile" },
  ];

  return (
    <div className="w-64 bg-[#52057B] text-white flex flex-col justify-between py-6 px-4 shadow-lg min-h-screen">
      <div>
        {/* ✅ Logo Section */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Epixable Logo" className="w-48 h-auto object-contain" />
        </div>

        {/* Menu Items */}
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer font-semibold transition ${
                location.pathname === item.path
                  ? "bg-[#890596]"
                  : "hover:bg-[#890596]"
              }`}
            >
              {item.icon} {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Logout */}
      <div
        onClick={() => navigate("/login/admin")}
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#890596] cursor-pointer"
      >
        <FaSignOutAlt /> Logout
      </div>
    </div>
  );
};

export default AdminSidebar;
