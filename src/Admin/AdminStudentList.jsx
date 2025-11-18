import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { FaPlus } from "react-icons/fa"; // Import FaPlus icon

const AdminStudentList = () => {
  // --- Student Data State and Initial Data ---
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
      status: "Completed",
    },
  ]);

  // --- Search & Date Filter State ---
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // --- Modals and Form States ---
  const [editStudent, setEditStudent] = useState(null); // For Edit Popup
  const [formData, setFormData] = useState({}); // For Edit Form
  const [showCreatePopup, setShowCreatePopup] = useState(false); // For Create Popup

  // State for the new student creation form (from AdminStudentCreate)
  const [newStudentData, setNewStudentData] = useState({
    fullName: "",
    gender: "",
    mobile: "",
    email: "",
    profession: "",
    address: "",
    membershipCategory: "",
    startDate: "",
    endDate: "",
    course: "",
    batch: "",
  });

  // Data for Select options
  const courses = ["Web Development", "Data Science", "UI/UX Design"];
  const batches = ["Batch A", "Batch B", "Batch C"];

  // Class for Create Form Inputs
  const inputClass =
    "w-full p-3 rounded-xl bg-gray-50 border border-purple-200 shadow-sm focus:bg-white focus:border-[#5D00BA] focus:ring-2 focus:ring-[#5D00BA] transition outline-none";

  // --- Handlers for Create Student Popup (Modal) ---
  const handleCreateChange = (e) => {
    setNewStudentData({
      ...newStudentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (
      !newStudentData.fullName ||
      !newStudentData.email ||
      !newStudentData.course
    )
      return alert("Please fill all required fields!");

    const newStudent = {
      id: Date.now(),
      fullName: newStudentData.fullName,
      mobile: newStudentData.mobile,
      email: newStudentData.email,
      course: newStudentData.course,
      batch: newStudentData.batch,
      expiry: newStudentData.endDate || new Date().toISOString().split("T")[0],
      status: "Active",
    };

    setStudents([...students, newStudent]);
    alert("Student Registered Successfully ✅");
    setShowCreatePopup(false);

    // Reset form
    setNewStudentData({
      fullName: "",
      gender: "",
      mobile: "",
      email: "",
      profession: "",
      address: "",
      membershipCategory: "",
      startDate: "",
      endDate: "",
      course: "",
      batch: "",
    });
  };

  // --- Handlers for Edit Student Popup (Modal) ---
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

  // Utility to close modals with animation
  const closeModal = (setter) => {
    document
      .getElementById("modal-content")
      .classList.add("scale-90", "opacity-0");
    setTimeout(() => {
      setter(false);
    }, 300); // Match animation duration
  };

  // --- SEARCH + DATE FILTER LOGIC ---
  const filteredStudents = students.filter((s) => {
    const matchSearch =
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.mobile.includes(searchQuery) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.batch.toLowerCase().includes(searchQuery.toLowerCase());

    const matchDate = filterDate ? s.expiry === filterDate : true;

    return matchSearch && matchDate;
  });

  return (
    <div className="flex min-h-screen bg-[#F7F7F7] font-poppins">
      <AdminSidebar />

      <div className="flex-1 p-10 relative overflow-hidden max-w-full">
        {/* Page Title with Icon */}
        <div className="flex items-center gap-3 mb-10 mt-10">
          <span className="text-3xl bg-[#1B0138] text-white p-3 rounded-xl">
            👨‍🎓
          </span>
          <h1 className="text-4xl font-extrabold text-[#1B0138]">
            Student List
          </h1>
        </div>

        <div className="bg-gradient-to-br from-[#FFFFFF] to-[#7a6592] p-6 rounded-2xl shadow-xl">
          {/* TOP BAR (Search + Date Filter + Add Student) */}
          <div className="flex justify-between items-center mb-4 pb-3">
            <h2 className="text-xl font-semibold text-gray-800">
              All Students ({filteredStudents.length})
            </h2>

            <div className="flex gap-3">
              {/* Search */}
              <input
                type="text"
                placeholder="Search student..."
                className="p-2 rounded-lg border border-gray-300 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* Date Picker */}
              <input
                type="date"
                className="p-2 rounded-lg border border-gray-300 shadow-sm"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />

              {/* Add Student Button */}
              <button
                onClick={() => setShowCreatePopup(true)}
                className="flex items-center gap-2 bg-[#1B0138] text-white px-5 py-2 rounded-xl shadow-md hover:bg-[#3A0070] transition font-semibold"
              >
                <FaPlus /> Add Student
              </button>
            </div>
          </div>

          {/* STUDENT TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse ">
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
                    <th
                      key={th}
                      className="p-4 text-left text-sm font-semibold"
                    >
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className="bg-white border-b hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
                    style={{
                      animation: `fadeInRow 0.4s ease ${
                        index * 0.05
                      }s forwards`,
                      opacity: 0,
                    }}
                  >
                    <td className="p-4 font-medium text-gray-900">
                      {student.fullName}
                    </td>
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
                            : "bg-orange-500"
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

        {/* --- EDIT POPUP (UNCHANGED) --- */}
        {editStudent && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-20 backdrop-blur-sm z-50 p-4">
            <div
              className="bg-white w-full max-w-lg p-8 rounded-xl shadow-2xl border border-purple-200 animate-slideDown 
      max-h-[90vh] overflow-y-auto"
            >
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
                      value={formData[field.name] || ""}
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
                    value={formData.status || ""}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg shadow-sm"
                  >
                    <option>Active</option>
                    <option>Completed</option>
                    <option>Upcoming</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
                <button
                  onClick={closePopup}
                  className="px-6 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={saveStudent}
                  className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --------------- CREATE POPUP (FULL RESTORED + UNCHANGED) --------------- */}
        {showCreatePopup && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-10 backdrop-blur-sm z-50 p-4 overflow-y-auto">
            <div
              id="modal-content"
              className="bg-white w-full max-w-3xl p-8 my-10 rounded-2xl shadow-2xl border border-purple-200 transition-all duration-300 translate-y-0 opacity-100"
            >
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-3xl font-extrabold text-[#1B0138]">
                  📝 Register New Student
                </h2>
                <button
                  onClick={() => closeModal(setShowCreatePopup)}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* --- FULL REGISTRATION FORM (UNCHANGED) --- */}
              <form
                onSubmit={handleCreateSubmit}
                className="grid grid-cols-2 gap-6"
              >
                {/* Full Name */}
                <div>
                  <label className="block font-semibold mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={newStudentData.fullName}
                    onChange={handleCreateChange}
                    className={inputClass}
                    placeholder="Enter full name"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block font-semibold mb-1">Gender</label>
                  <select
                    name="gender"
                    value={newStudentData.gender}
                    onChange={handleCreateChange}
                    className={inputClass}
                  >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Mobile */}
                <div>
                  <label className="block font-semibold mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    value={newStudentData.mobile}
                    onChange={handleCreateChange}
                    className={inputClass}
                    placeholder="Enter mobile number"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-semibold mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={newStudentData.email}
                    onChange={handleCreateChange}
                    className={inputClass}
                    placeholder="Enter email address"
                  />
                </div>

                {/* Profession */}
                <div>
                  <label className="block font-semibold mb-1">Profession</label>
                  <input
                    type="text"
                    name="profession"
                    value={newStudentData.profession}
                    onChange={handleCreateChange}
                    className={inputClass}
                    placeholder="Enter profession"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block font-semibold mb-1">
                    Full Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={newStudentData.address}
                    onChange={handleCreateChange}
                    className={inputClass}
                    placeholder="Enter address"
                  />
                </div>

                {/* Membership */}
                <div>
                  <label className="block font-semibold mb-1">
                    Membership Category
                  </label>
                  <select
                    name="membershipCategory"
                    value={newStudentData.membershipCategory}
                    onChange={handleCreateChange}
                    className={inputClass}
                  >
                    <option value="">Select Category</option>
                    <option>Regular</option>
                    <option>Premium</option>
                    <option>Lifetime</option>
                  </select>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={newStudentData.startDate}
                      onChange={handleCreateChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={newStudentData.endDate}
                      onChange={handleCreateChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Course */}
                <div>
                  <label className="block font-semibold mb-1">Course *</label>
                  <select
                    name="course"
                    value={newStudentData.course}
                    onChange={handleCreateChange}
                    className={inputClass}
                  >
                    <option value="">Select Course</option>
                    {courses.map((course) => (
                      <option key={course}>{course}</option>
                    ))}
                  </select>
                </div>

                {/* Batch */}
                <div>
                  <label className="block font-semibold mb-1">Batch</label>
                  <select
                    name="batch"
                    value={newStudentData.batch}
                    onChange={handleCreateChange}
                    className={inputClass}
                  >
                    <option value="">Select Batch</option>
                    {batches.map((batch) => (
                      <option key={batch}>{batch}</option>
                    ))}
                  </select>
                </div>

                {/* Submit */}
                <div className="col-span-2 flex justify-end pt-4 border-t mt-4">
                  <button
                    type="submit"
                    className="bg-[#1B0138] text-white px-8 py-3 rounded-xl shadow-lg hover:bg-[#3A0070] transition font-poppins font-bold"
                  >
                    Save Student
                  </button>
                </div>
              </form>
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
