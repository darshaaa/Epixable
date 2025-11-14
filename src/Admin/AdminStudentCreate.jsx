import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";

const AdminStudentCreate = () => {
  const [students, setStudents] = useState([]);
  const [studentData, setStudentData] = useState({
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

  const courses = ["Web Development", "Data Science", "UI/UX Design"];
  const batches = ["Batch A", "Batch B", "Batch C"];

  const inputClass =
  "w-full p-3 rounded-xl bg-gray-50 border border-purple-200 shadow-sm focus:bg-white focus:border-[#5D00BA] focus:ring-2 focus:ring-[#5D00BA] transition outline-none";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentData.fullName || !studentData.email || !studentData.course)
      return alert("Please fill all required fields!");

    setStudents([...students, { id: Date.now(), ...studentData }]);
    alert("Student Registered Successfully ✅");

    setStudentData({
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

  return (
    <div className="flex h-screen overflow-hidden font-poppins bg-[#F5F6FA]">
      {/* FIXED SIDEBAR */}
      <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg">
        <AdminSidebar />
      </div>

      {/* MAIN SCROLL AREA */}
      <div className="ml-64 flex-1 overflow-y-auto p-10">
        {/* Page Title with Icon */}
        <div className="flex items-center gap-3 mb-10">
          <span className="text-3xl bg-[#1B0138] text-white p-3 rounded-xl">👨‍🎓</span>
          <h1 className="text-4xl font-extrabold text-[#1B0138]">Student Registration</h1>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-500 max-w-5xl">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block font-semibold mb-1">Full Name</label>
              <input
                type="text"
                value={studentData.fullName}
                onChange={(e) =>
                  setStudentData({ ...studentData, fullName: e.target.value })
                }
                className={inputClass}
                placeholder="Enter full name"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block font-semibold mb-1">Gender</label>
              <select
                value={studentData.gender}
                onChange={(e) =>
                  setStudentData({ ...studentData, gender: e.target.value })
                }
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
              <label className="block font-semibold mb-1">Mobile Number</label>
              <input
                type="text"
                value={studentData.mobile}
                onChange={(e) =>
                  setStudentData({ ...studentData, mobile: e.target.value })
                }
                className={inputClass}
                placeholder="Enter mobile number"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold mb-1">Email Address</label>
              <input
                type="email"
                value={studentData.email}
                onChange={(e) =>
                  setStudentData({ ...studentData, email: e.target.value })
                }
                className={inputClass}
                placeholder="Enter email address"
              />
            </div>

            {/* Profession */}
            <div>
              <label className="block font-semibold mb-1">Profession</label>
              <input
                type="text"
                value={studentData.profession}
                onChange={(e) =>
                  setStudentData({ ...studentData, profession: e.target.value })
                }
                className={inputClass}
                placeholder="Enter profession"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block font-semibold mb-1">Full Address</label>
              <input
                type="text"
                value={studentData.address}
                onChange={(e) =>
                  setStudentData({ ...studentData, address: e.target.value })
                }
                className={inputClass}
                placeholder="Enter address"
              />
            </div>

            {/* Membership Category */}
            <div>
              <label className="block font-semibold mb-1">
                Membership Category
              </label>
              <select
                value={studentData.membershipCategory}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    membershipCategory: e.target.value,
                  })
                }
                className={inputClass}
              >
                <option value="">Select Category</option>
                <option>Regular</option>
                <option>Premium</option>
                <option>Lifetime</option>
              </select>
            </div>

            {/* Dates */}
            <div>
              <label className="block font-semibold mb-1">Start Date</label>
              <input
                type="date"
                value={studentData.startDate}
                onChange={(e) =>
                  setStudentData({ ...studentData, startDate: e.target.value })
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">End Date</label>
              <input
                type="date"
                value={studentData.endDate}
                onChange={(e) =>
                  setStudentData({ ...studentData, endDate: e.target.value })
                }
                className={inputClass}
              />
            </div>

            {/* Course */}
            <div>
              <label className="block font-semibold mb-1">Course</label>
              <select
                value={studentData.course}
                onChange={(e) =>
                  setStudentData({ ...studentData, course: e.target.value })
                }
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
                value={studentData.batch}
                onChange={(e) =>
                  setStudentData({ ...studentData, batch: e.target.value })
                }
                className={inputClass}
              >
                <option value="">Select Batch</option>
                {batches.map((batch) => (
                  <option key={batch}>{batch}</option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <div className="col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-[#1B0138] text-white px-8 py-3 rounded-xl shadow-md hover:bg-[#3A0070] transition font-poppins"
              >
                Save Student
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .font-poppins { font-family: 'Poppins', sans-serif; }
      `}</style>
    </div>
  );
};

export default AdminStudentCreate;
