import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { FaPlus, FaSearch, FaTrash, FaTimes } from "react-icons/fa";

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
const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");

// --- Modals and Form States ---
const [editStudent, setEditStudent] = useState(null); 
const [formData, setFormData] = useState({}); 
const [showCreatePopup, setShowCreatePopup] = useState(false);


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

  // --- Handlers for Create Student Drawer ---
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

  // --- Handlers for Edit Student Drawer ---
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

  // Utility to close create drawer with animation (keeps existing behavior)
  const closeModal = (setter) => {
    const el = document.getElementById("modal-content");
    if (el) {
      el.classList.add("scale-90", "opacity-0");
    }
    setTimeout(() => {
      setter(false);
      if (el) {
        el.classList.remove("scale-90", "opacity-0");
      }
    }, 300); // Match animation duration
  };

  // --- DELETE STUDENT STATES & HANDLERS ---
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setStudents((prev) => prev.filter((s) => s.id !== deleteId));
    setShowDeleteConfirm(false);
    setDeleteId(null);
  };

  // --- SEARCH + DATE FILTER LOGIC ---
  const filteredStudents = students.filter((s) => {
  const matchSearch =
    s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.mobile.includes(searchQuery) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.batch.toLowerCase().includes(searchQuery.toLowerCase());

  // convert expiry to comparable date
  const expiryDate = new Date(s.expiry);
  const from = fromDate ? new Date(fromDate) : null;
  const to = toDate ? new Date(toDate) : null;

  const matchDate =
    (!from || expiryDate >= from) &&
    (!to || expiryDate <= to);

  return matchSearch && matchDate;
});


  return (
    <div className="flex min-h-screen bg-gray-300 font-poppins">
      <AdminSidebar />

      <div className="flex-1 p-10 relative overflow-hidden max-w-full">
        {/* Page Title with Icon */}
        <div className="flex items-center gap-3 mb-10 -mt-0">
          <span className="text-2xl bg-[#1B0138] text-white p-3 rounded-xl">
            👨‍🎓
          </span>
          <h1 className="text-2xl  font-bold text-[#1B0138]">Student List</h1>
        </div>

        <div className="bg-white p-6 rounded-2xl mt-18">
          {/* TOP BAR (Search + Date Filter + Add Student) */}
          <div className="flex justify-between items-center mb-4 pb-3">
            <h2 className="text-xl font-semibold text-gray-800">
              All Students ({filteredStudents.length})
            </h2>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="p-2 pl-10 rounded-full border border-gray-300 shadow-sm w-48"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* From Date */}
              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-600 -mt-5">
                  From
                </label>
                <input
                  type="date"
                  className="p-2 rounded-full border border-gray-300 shadow-sm"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              {/* To Date */}
              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-600 -mt-5">To</label>
                <input
                  type="date"
                  className="p-2 rounded-full border border-gray-300 shadow-sm "
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>

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
                            : student.status === "Ongoing"
                            ? "bg-yellow-500"
                            : "bg-orange-500"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="p-4 flex items-center gap-2">
                      <button
                        onClick={() => openPopup(student)}
                        className="px-4 py-1 rounded-lg text-sm font-medium text-[#1B0138] bg-purple-100 hover:bg-purple-200 transition shadow-md"
                      >
                        Edit
                      </button>

                      {/* DELETE: Red trash icon only */}
                      <button
                        onClick={() => handleDeleteClick(student.id)}
                        title="Delete student"
                        className="p-2 rounded-md bg-red-50 hover:bg-red-100 transition"
                      >
                        <FaTrash className="text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- EDIT DRAWER (RIGHT SIDE, Panel A) --- */}
        {editStudent && (
          <>
            <div
              className="fixed inset-0 z-40 pointer-events-auto"
              onClick={closePopup}
              aria-hidden
            />
            <div className="fixed top-0 right-0 h-full w-full max-w-md z-50">
              <div className="h-full bg-white shadow-2xl p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-[#1B0138]">
                    ✍️ Edit Student
                  </h2>
                  <button
                    onClick={closePopup}
                    className="p-2 rounded-md hover:bg-gray-100"
                  >
                    <FaTimes />
                  </button>
                </div>

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
                      <label className="text-sm mb-1 block">
                        {field.label}
                      </label>
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
                      <option>Ongoing</option>
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
          </>
        )}

        {/* --------------- CREATE DRAWER (RIGHT SIDE, Panel A) --------------- */}
        {showCreatePopup && (
          <>
            <div
              className="fixed inset-0 z-40 pointer-events-auto"
              onClick={() => closeModal(setShowCreatePopup)}
              aria-hidden
            />
            <div
              id="modal-content"
              className="fixed top-0 right-0 h-full w-full max-w-3xl z-50 transform transition-transform duration-300"
              style={{ transform: "translateX(0)" }}
            >
              <div className="h-full bg-white shadow-2xl p-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <h2 className="text-2xl font-bold text-[#1B0138]">
                    📝 Register New Student
                  </h2>
                  <button
                    onClick={() => closeModal(setShowCreatePopup)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-2 rounded-md"
                  >
                    <FaTimes />
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
                    <label className="block font-semibold mb-1">
                      Profession
                    </label>
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
                      <label className="block font-semibold mb-1">
                        End Date
                      </label>
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
          </>
        )}

        {/* 🚨 DELETE CONFIRMATION POPUP */}
        {showDeleteConfirm && (
          <>
            <div className="fixed inset-0 backdrop-blur-sm bg-transparent z-50" />
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <div className="bg-white/90 backdrop-blur-md border border-white/30 rounded-xl shadow-2xl w-80 p-6 text-center">
                <h3 className="text-xl font-bold mb-3 text-red-600">
                  Confirm Delete
                </h3>
                <p className="text-gray-700 mb-5">
                  Are you sure you want to delete this student? This action
                  cannot be undone.
                </p>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteId(null);
                    }}
                    className="px-4 py-2 bg-gray-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </>
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
