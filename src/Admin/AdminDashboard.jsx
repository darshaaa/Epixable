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
      <div className="flex-1 p-4">
        <h2 className="text-xl font-medium text-black mt-4 pl-13">Welcome</h2>
        <h1 className="text-3xl font-bold text-black mb-1 pl-13 ">
          Admin - Dashboard
        </h1>

        {/* Welcome Section */}
        <div className="bg-[#2E0057] pl-15 p-6 rounded-2xl  shadow-md flex justify-between items-center mb-8 mt-18 min-h-[220px] w-full">
          <div>
            <h3 className="text-xl font-medium text-white -ml-1">
              Welcome, Mr. Admin!
            </h3>
            <p className="text-[80px] font-bold text-white -mt-2 -ml-2">
              {formattedTime}
            </p>
            <p className="text-white -mt-5 -ml-1">{formattedDate}</p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-8 mt-8">
          {/* Join Session - First Card */}
          <div className="bg-[#FFF500] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 flex flex-col items-start text-left">
            {/* Transparent background circle */}
            <div className="w-16 h-16 flex items-center justify-center mb-4 rounded-2xl ml-3">
              <FaVideo className="text-black text-3xl " />
            </div>
            <h4 className="text-2xl font-bold text-black mb-0 ml-6">Join Session</h4>
            <p className="text-lg text-black ml-6">via invitation link</p>
          </div>

          {/* Upcoming Meetings */}
          <div className="bg-[#2043FF] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 flex flex-col items-start text-left">
            <div className="w-16 h-16 flex items-center justify-center mb-4 rounded-2xl ml-3">
              <FaCalendarAlt className="text-white text-3xl" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-0 ml-8">
              Upcoming Session
            </h4>
            <p className="text-lg text-white ml-8">View upcoming meetings</p>
          </div>

          {/* Latest Update */}
          <div className="bg-[#FF0080] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 flex flex-col items-start text-left">
            <div className="w-16 h-16 flex items-center justify-center mb-4 rounded-2xl ml-3">
              <FaBell className="text-white text-3xl" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-0 ml-8">
              Latest Update
            </h4>
            <p className="text-lg text-white ml-8">View latest news updates</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
