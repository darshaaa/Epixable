import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";

const Attendance = () => {
  const [selectedBatch, setSelectedBatch] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  // ✅ Each student now has ID, Name, and Course
  const batchData = {
    "Batch A": [
      { id: "A101", name: "Rahul", course: "React.js" },
      { id: "A102", name: "Priya", course: "Node.js" },
      { id: "A103", name: "Kiran", course: "Python" },
      { id: "A104", name: "Sneha", course: "Java" },
    ],
    "Batch B": [
      { id: "B201", name: "Vikram", course: "C++" },
      { id: "B202", name: "Anita", course: "Web Development" },
      { id: "B203", name: "Ravi", course: "SQL" },
      { id: "B204", name: "Suma", course: "Data Science" },
    ],
    "Batch C": [
      { id: "C301", name: "Manoj", course: "Cyber Security" },
      { id: "C302", name: "Nisha", course: "JavaScript" },
      { id: "C303", name: "Ajay", course: "AI & ML" },
      { id: "C304", name: "Kavya", course: "Cloud Computing" },
    ],
  };

  const handleBatchChange = (batch) => {
    setSelectedBatch(batch);
    setStudents(batchData[batch] || []);
    setAttendance({});
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = () => {
    alert("✅ Attendance submitted successfully!");
    console.log("Attendance Data:", attendance);
  };

  return (
    <div className="flex min-h-screen bg-[#f5f3fa]">
      <AdminSidebar />

      <div className="flex-1 bg-[#f5f3fa] min-h-screen p-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Page / Attendance</h2>
          <h1 className="text-3xl font-bold text-black">Mark Attendance</h1>
        </div>

        {/* 🟡 Batch Selection */}
        <div className="bg-yellow-500 rounded-2xl shadow-md p-6 mb-8 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-[#52057B]">Select Batch</h3>
            <p className="text-sm text-gray-700">Choose the batch to view students</p>
          </div>

          <select
            value={selectedBatch}
            onChange={(e) => handleBatchChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-48 bg-white"
          >
            <option value="">-- Select Batch --</option>
            {Object.keys(batchData).map((batch) => (
              <option key={batch} value={batch}>
                {batch}
              </option>
            ))}
          </select>
        </div>

        {/* 🧾 Attendance Table */}
        {selectedBatch && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-[#52057B]">
              {selectedBatch} - Attendance List
            </h3>

            <div className="grid grid-cols-4 font-bold text-black border-b border-gray-200 pb-3 mb-2">
              <span>Student ID</span>
              <span>Student Name</span>
              <span>Course</span>
              <span>Attendance</span>
            </div>

            {students.map((student) => (
              <div
                key={student.id}
                className="grid grid-cols-4 items-center py-3 border-b border-gray-200 text-gray-700 text-sm"
              >
                <span>{student.id}</span>
                <span>{student.name}</span>
                <span>{student.course}</span>

                <div className="flex gap-3">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name={student.id}
                      value="Present"
                      checked={attendance[student.id] === "Present"}
                      onChange={() => handleAttendanceChange(student.id, "Present")}
                    />
                    Present
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name={student.id}
                      value="Absent"
                      checked={attendance[student.id] === "Absent"}
                      onChange={() => handleAttendanceChange(student.id, "Absent")}
                    />
                    Absent
                  </label>
                </div>
              </div>
            ))}

            <button
              onClick={handleSubmit}
              className="mt-6 bg-[#52057B] hover:bg-[#890596] text-white px-6 py-2 rounded-lg transition"
            >
              Submit Attendance
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
