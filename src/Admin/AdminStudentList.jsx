import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";

const AdminStudentList = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      fullName: "Deepak",
      mobile: "9636251414",
      email: "deepak@gmail.com",
      course: "Web Development",
      batch: "Batch A",
      expiry: "2025-10-27",
      status: "Active",
    },
    {
      id: 2,
      fullName: "Priya",
      mobile: "9876543210",
      email: "priya@gmail.com",
      course: "UI/UX Design",
      batch: "Batch B",
      expiry: "2025-12-15",
      status: "Inactive",
    },
  ]);

  const toggleStatus = (id) => {
    setStudents(
      students.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" }
          : s
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-[#1B0138] mb-6">
          Student List
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#1B0138] text-white">
                <th className="p-3 text-left">Full Name</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Course</th>
                <th className="p-3 text-left">Batch</th>
                <th className="p-3 text-left">Membership Expiry</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">{student.fullName}</td>
                  <td className="p-3">{student.mobile}</td>
                  <td className="p-3">{student.email}</td>
                  <td className="p-3">{student.course}</td>
                  <td className="p-3">{student.batch}</td>
                  <td className="p-3">{student.expiry}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                        student.status === "Active" ? "bg-green-600" : "bg-red-500"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleStatus(student.id)}
                      className="text-[#1B0138] font-semibold hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentList;
