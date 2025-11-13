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

  // Example data — you can link with your Course & Batch pages
  const courses = ["Web Development", "Data Science", "UI/UX Design"];
  const batches = ["Batch A", "Batch B", "Batch C"];

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
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-[#1B0138] mb-6">
          Student Registration
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-300 p-6 rounded-xl shadow-md w-full max-w-4xl grid grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <div>
            <label className="block font-semibold mb-1">Full Name</label>
            <input
              type="text"
              value={studentData.fullName}
              onChange={(e) =>
                setStudentData({ ...studentData, fullName: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
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
              className="w-full p-2 border rounded-lg"
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
              className="w-full p-2 border rounded-lg"
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
              className="w-full p-2 border rounded-lg"
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
              className="w-full p-2 border rounded-lg"
              placeholder="Enter profession"
            />
          </div>

          {/* Full Address */}
          <div>
            <label className="block font-semibold mb-1">Full Address</label>
            <input
              type="text"
              value={studentData.address}
              onChange={(e) =>
                setStudentData({ ...studentData, address: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
              placeholder="Enter full address"
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
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select Category</option>
              <option>Regular</option>
              <option>Premium</option>
              <option>Lifetime</option>
            </select>
          </div>

          {/* Membership Dates */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block font-semibold mb-1">Start Date</label>
              <input
                type="date"
                value={studentData.startDate}
                onChange={(e) =>
                  setStudentData({ ...studentData, startDate: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold mb-1">End Date</label>
              <input
                type="date"
                value={studentData.endDate}
                onChange={(e) =>
                  setStudentData({ ...studentData, endDate: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Course */}
          <div>
            <label className="block font-semibold mb-1">Course</label>
            <select
              value={studentData.course}
              onChange={(e) =>
                setStudentData({ ...studentData, course: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
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
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select Batch</option>
              {batches.map((batch) => (
                <option key={batch}>{batch}</option>
              ))}
            </select>
          </div>

          <div className="col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-[#1B0138] text-white px-6 py-2 rounded-lg hover:bg-[#3a006b]"
            >
              Save Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminStudentCreate;
