import React, { useEffect, useState } from "react";
import { FaVideo, FaCalendarAlt, FaBell } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex min-h-screen bg-[#f5f3fa]">
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-semibold text-black mb-4">Welcome</h2>
        <h1 className="text-3xl font-bold text-black mb-6">Admin - Dashboard</h1>

        {/* Welcome Section */}
        <div className="bg-orange-500 p-6 rounded-2xl shadow-md flex justify-between items-center mb-8 mt-20">
          <div>
            <h3 className="text-2xl font-semibold text-white">Welcome, Mr. Admin!</h3>
            <p className="text-5xl font-bold text-white mt-2">{formattedTime}</p>
            <p className="text-white mt-2">{formattedDate}</p>
          </div>
          <img
            src="https://img.freepik.com/free-photo/business-meeting-coworkers_23-2148833661.jpg"
            alt="meeting"
            className="w-72 h-40 object-cover rounded-xl"
          />
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-8 mt-8">
          <div className="bg-[#EDE7F6] p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition transform hover:scale-105">
            <FaVideo className="text-[#52057B] text-4xl mx-auto mb-3" />
            <h4 className="text-2xl font-bold text-[#52057B] mb-3">Join Meeting</h4>
            <p className="text-lg text-gray-700">via invitation link</p>
          </div>

          <div className="bg-[#E1BEE7] p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition transform hover:scale-105">
            <FaCalendarAlt className="text-[#52057B] text-4xl mx-auto mb-3" />
            <h4 className="text-2xl font-bold text-[#52057B] mb-3">Upcoming Meetings</h4>
            <p className="text-lg text-gray-700">View upcoming sessions</p>
          </div>

          <div className="bg-[#C5CAE9] p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition transform hover:scale-105">
            <FaBell className="text-[#52057B] text-4xl mx-auto mb-3" />
            <h4 className="text-2xl font-bold text-[#52057B] mb-3">Latest Update</h4>
            <p className="text-lg text-gray-700">Check latest announcements</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

