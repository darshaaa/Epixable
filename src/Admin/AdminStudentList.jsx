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

  const [editStudent, setEditStudent] = useState(null);
  const [formData, setFormData] = useState({});

  const openPopup = (student) => {
    setEditStudent(student.id);
    setFormData({ ...student });
  };

  const closePopup = () => {
    setEditStudent(null);
    setFormData({});
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveStudent = () => {
    setStudents(students.map((s) => (s.id === editStudent ? formData : s)));
    closePopup();
  };

  return (
    <div className="flex min-h-screen bg-[#F7F7F7] font-poppins">
      <AdminSidebar />

      <div className="flex-1 p-10 relative overflow-hidden max-w-full">
        {/* Page Title with Icon */}
        <div className="flex items-center gap-3 mb-10 mt-10">
          <span className="text-3xl bg-[#1B0138] text-white p-3 rounded-xl">👨‍🎓</span>
          <h1 className="text-4xl font-extrabold text-[#1B0138]">Student List</h1>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-500">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-3">
            All Students
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-[#1B0138] text-white z-10 shadow-md">
                <tr>
                  {[
                    "Full Name",
                    "Mobile",
                    "Email",
                    "Course",
                    "Batch",
                    "Expiry",
                    "Status",
                    "Action",
                  ].map((th) => (
                    <th key={th} className="p-4 text-left text-sm font-semibold">
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {students.map((student, index) => (
                  <tr
                    key={student.id}
                    className="bg-white border-b hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
                    style={{
                      animation: `fadeInRow 0.4s ease ${index * 0.05}s forwards`,
                      opacity: 0,
                    }}
                  >
                    <td className="p-4 font-medium text-gray-900">{student.fullName}</td>
                    <td className="p-4 text-gray-700">{student.mobile}</td>
                    <td className="p-4 text-gray-700">{student.email}</td>
                    <td className="p-4 text-gray-700">{student.course}</td>
                    <td className="p-4 text-gray-700">{student.batch}</td>
                    <td className="p-4 text-gray-700">{student.expiry}</td>
                    <td className="p-4">
                      <span
                        className={`px-4 py-1 rounded-full text-white text-sm font-semibold shadow-md ${
                          student.status === "Active"
                            ? "bg-green-600"
                            : "bg-red-500"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => openPopup(student)}
                        className="px-4 py-1 rounded-lg text-sm font-medium text-[#1B0138] bg-purple-100 hover:bg-purple-200 transition shadow-md"
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

        {/* POPUP */}
        {editStudent && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-20 backdrop-blur-sm z-50 p-4">
            <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow-2xl border border-purple-200 animate-slideDown">
              <h2 className="text-3xl font-extrabold mb-6 text-[#1B0138] border-b pb-3">
                ✍️ Edit Student Details
              </h2>

              <div className="flex flex-col gap-4">
                {[
                  { label: "Full Name", name: "fullName", type: "text" },
                  { label: "Mobile", name: "mobile", type: "text" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Course", name: "course", type: "text" },
                  { label: "Batch", name: "batch", type: "text" },
                  { label: "Expiry Date", name: "expiry", type: "date" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="text-sm mb-1 block">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg shadow-sm"
                    />
                  </div>
                ))}

                {/* Status */}
                <div>
                  <label className="text-sm mb-1 block">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg shadow-sm"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
                <button
                  onClick={closePopup}
                  className="px-6 py-2 bg-gray-100 rounded-full"
                >
                  Cancel
                </button>
                <button
                  onClick={saveStudent}
                  className="px-6 py-2 bg-green-600 text-white rounded-full"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        <style>{`
          .font-poppins { font-family: 'Poppins', sans-serif; }

          @keyframes fadeInRow {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideDown {
            from { transform: translateY(-60px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-slideDown {
            animation: slideDown 0.35s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default AdminStudentList;
