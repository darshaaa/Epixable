// Attendance.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaClipboardList } from "react-icons/fa";
import AdminSidebar from "../Admin/AdminSidebar";

// ---------------------- Sample Local Data ----------------------
const BATCHES = {
  "Batch A": {
    students: [
      {
        id: "A101",
        name: "Rahul Sharma",
        course: "React.js",
        percentage: 92,
        history: [
          { date: "2025-11-10", status: "Present" },
          { date: "2025-11-11", status: "Present" },
          { date: "2025-11-12", status: "Present" },
          { date: "2025-11-13", status: "Absent" },
          { date: "2025-11-14", status: "Present" },
        ],
      },
      {
        id: "A102",
        name: "Priya Singh",
        course: "Node.js",
        percentage: 88,
        history: [
          { date: "2025-11-10", status: "Present" },
          { date: "2025-11-11", status: "Absent" },
          { date: "2025-11-12", status: "Present" },
          { date: "2025-11-13", status: "Present" },
          { date: "2025-11-14", status: "Present" },
        ],
      },
      {
        id: "A103",
        name: "Kiran Yadav",
        course: "Python",
        percentage: 95,
        history: [
          { date: "2025-11-10", status: "Present" },
          { date: "2025-11-11", status: "Present" },
          { date: "2025-11-12", status: "Present" },
          { date: "2025-11-13", status: "Present" },
          { date: "2025-11-14", status: "Present" },
        ],
      },
      {
        id: "A104",
        name: "Sneha Reddy",
        course: "Java",
        percentage: 90,
        history: [
          { date: "2025-11-10", status: "Present" },
          { date: "2025-11-11", status: "Present" },
          { date: "2025-11-12", status: "Absent" },
          { date: "2025-11-13", status: "Present" },
          { date: "2025-11-14", status: "Present" },
        ],
      },
    ],
  },

  "Batch B": {
    students: [
      {
        id: "B201",
        name: "Vikram Kumar",
        course: "C++",
        percentage: 85,
        history: [
          { date: "2025-11-10", status: "Present" },
          { date: "2025-11-11", status: "Absent" },
          { date: "2025-11-12", status: "Present" },
        ],
      },
      {
        id: "B202",
        name: "Anita Desai",
        course: "Web Development",
        percentage: 80,
        history: [
          { date: "2025-11-10", status: "Absent" },
          { date: "2025-11-11", status: "Present" },
          { date: "2025-11-12", status: "Present" },
        ],
      },
    ],
  },

  "Batch C": {
    students: [
      {
        id: "C301",
        name: "Manoj Das",
        course: "Cyber Security",
        percentage: 87,
        history: [
          { date: "2025-11-10", status: "Present" },
          { date: "2025-11-11", status: "Present" },
        ],
      },
      {
        id: "C302",
        name: "Nisha Patel",
        course: "JavaScript",
        percentage: 90,
        history: [
          { date: "2025-11-10", status: "Present" },
          { date: "2025-11-11", status: "Present" },
        ],
      },
    ],
  },
};

const Attendance = () => {
  const [selectedBatch, setSelectedBatch] = useState("Batch A");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupView, setPopupView] = useState("select");
  const [popupSelectedBatch, setPopupSelectedBatch] = useState("Batch A");
  const [successMessage, setSuccessMessage] = useState(null);
  const [cardHistoryBatch, setCardHistoryBatch] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [batchDates, setBatchDates] = useState([]);

  // Load batch data
  useEffect(() => {
    const batch = BATCHES[selectedBatch];

    if (batch) {
      setStudents(batch.students);
      setAttendance({});

      const allDates = new Set();
      batch.students.forEach((s) =>
        s.history.forEach((h) => allDates.add(h.date))
      );

      const sortedDates = Array.from(allDates).sort(
        (a, b) => new Date(b) - new Date(a)
      );

      setBatchDates(sortedDates);
      setSelectedDate(sortedDates[0] || "");
    }
  }, [selectedBatch]);

  const openPopup = () => {
    setPopupSelectedBatch(selectedBatch);
    setPopupView("select");
    setPopupOpen(true);
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = () => {
    const present = Object.values(attendance).filter(
      (s) => s === "Present"
    ).length;

    setSuccessMessage(
      `Attendance for ${selectedBatch} submitted! (${present} Present, ${
        students.length - present
      } Absent).`
    );

    setTimeout(() => setSuccessMessage(null), 4000);
    setPopupView("select");
  };

  // Student Card Component
  const StudentCard = ({ student, index, isHistory }) => {
    const currentStatus = attendance[student.id] || "Absent";
    const isPresent = currentStatus === "Present";

    const getStatusColor = () => {
      if (isHistory) {
        const n = student.percentage;
        if (n >= 90) return "bg-green-600";
        if (n >= 80) return "bg-yellow-500";
        return "bg-red-600";
      }
      return isPresent ? "bg-green-600" : "bg-red-600";
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.03 }}
        className="grid grid-cols-12 items-center p-4 rounded-xl bg-white shadow-sm border-l-4 mb-3"
        style={{
          borderColor: isHistory
            ? "#52057B"
            : isPresent
            ? "#16A34A"
            : "#DC2626",
        }}
      >
        <div className="col-span-12 md:col-span-4">
          <p className="text-xs text-gray-500">{student.id}</p>
          <p className="text-lg font-semibold text-gray-900">{student.name}</p>
        </div>

        <div className="col-span-12 md:col-span-3 mt-2 md:mt-0">
          <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
            {student.course}
          </span>
        </div>

        {!isHistory && (
          <div className="col-span-12 md:col-span-5 flex justify-end space-x-6 mt-3 md:mt-0">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={student.id}
                value="Present"
                checked={currentStatus === "Present"}
                onChange={() => handleAttendanceChange(student.id, "Present")}
                className="form-radio h-5 w-5"
              />
              <span>Present</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={student.id}
                value="Absent"
                checked={currentStatus === "Absent"}
                onChange={() => handleAttendanceChange(student.id, "Absent")}
                className="form-radio h-5 w-5"
              />
              <span>Absent</span>
            </label>
          </div>
        )}

        {isHistory && (
          <div className="col-span-12 md:col-span-5 flex justify-end mt-3 md:mt-0">
            <div
              className={`w-20 text-center text-white font-bold py-1 rounded-full ${getStatusColor()}`}
            >
              {student.percentage}%
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  const presentCount = Object.values(attendance).filter(
    (a) => a === "Present"
  ).length;

  const absentCount = students.length - presentCount;

  return (
    <>
      <div className="flex min-h-screen bg-gray-300 font-poppins overflow-hidden">
        <AdminSidebar />

        <div className="flex-1 p-4 sm:p-8 overflow-y-auto h-screen">
          {/* Header */}
          <div className="mb-6 flex items-center gap-4 mt-2">
            <div className="bg-[#1B0138] p-3 rounded-xl text-white">
              <FaClipboardList size={20} />
            </div>
            <h1 className="text-2xl  font-bold text-[#1B0138]">
              Attendance Dashboard
            </h1>
          </div>

          {/* Success Alert */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="fixed top-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-xl z-[60]"
              >
                {successMessage}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-white rounded-2xl p-6 sm:p-8 mt-21">
            {/* Select batch */}
            <div className="flex justify-start mb-6">
              <button
                onClick={openPopup}
                className="bg-[#52057B] hover:bg-[#6A0DAD] text-white font-bold px-6 py-3 rounded-lg"
              >
                📌 Select Batch
              </button>
            </div>

            {/* Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-[#52057B]">
                <h3 className="text-sm font-semibold text-gray-500">
                  Current Batch
                </h3>
                <p className="text-2xl font-bold mt-2 text-[#1B0138]">
                  {selectedBatch}
                </p>
                <span className="text-xs text-gray-400">
                  Students: {students.length}
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-green-600">
                <h3 className="text-sm font-semibold text-gray-500">
                  Present Today
                </h3>
                <p className="text-2xl font-bold mt-2 text-green-700">
                  {presentCount}
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-red-600">
                <h3 className="text-sm font-semibold text-gray-500">
                  Absent Today
                </h3>
                <p className="text-2xl font-bold mt-2 text-red-700">
                  {absentCount}
                </p>
              </div>

              <div className="bg-gradient-to-r from-[#52057B] to-[#1B0138] text-white p-4 rounded-2xl shadow-lg">
                <h3 className="text-sm font-semibold opacity-90">
                  Attendance %
                </h3>
                <p className="text-3xl font-extrabold mt-2">
                  {students.length
                    ? Math.round((presentCount / students.length) * 100)
                    : 0}
                  %
                </p>
              </div>
            </div>

            {/* Student List */}
            <div className="p-4 sm:p-6 bg-[#f0f2f5] rounded-xl shadow-inner">
              <div className="flex items-center justify-between mb-6 border-b pb-3">
                <h3 className="text-2xl font-bold">
                  {selectedBatch} - Students
                </h3>

                {/* 🔥 Calendar Date Picker (only thing changed) */}
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border border-gray-300 bg-white px-3 py-2 rounded-lg text-sm font-semibold w-40"
                />
              </div>

              {/* Filter by date */}
              <div className="space-y-4">
                {students
                  .filter((s) =>
                    s.history.some((h) => h.date === selectedDate.trim())
                  )
                  .map((student, i) => (
                    <StudentCard
                      key={student.id}
                      student={student}
                      index={i}
                      isHistory={false}
                    />
                  ))}

                {/* No records */}
                {students.filter((s) =>
                  s.history.some((h) => h.date === selectedDate.trim())
                ).length === 0 && (
                  <p className="text-center text-gray-500 py-10">
                    No records found for this date.
                  </p>
                )}
              </div>

              {/* Submit */}
              {students.length > 0 && (
                <div className="text-center pt-6">
                  <button
                    onClick={handleSubmit}
                    className="bg-[#52057B] hover:bg-[#6A0DAD] text-white font-bold px-8 py-3 rounded-xl shadow-lg"
                  >
                    🚀 Submit Today's Attendance
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      <AnimatePresence>
        {popupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex justify-end z-50"
          >
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              className="bg-white w-full max-w-lg h-full p-6 rounded-l-3xl shadow-xl border-l-8 border-[#52057B]"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#1B0138]">
                  Select Batch
                </h2>

                <button
                  onClick={() => setPopupOpen(false)}
                  className="text-2xl text-gray-500 hover:text-black"
                >
                  ✖
                </button>
              </div>

              {/* Dropdown */}
              <select
                value={popupSelectedBatch}
                onChange={(e) => setPopupSelectedBatch(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg mb-4"
              >
                {Object.keys(BATCHES).map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>

              <button
                onClick={() => {
                  setSelectedBatch(popupSelectedBatch);
                  setPopupOpen(false);
                }}
                className="w-full bg-[#52057B] hover:bg-[#6A0DAD] text-white py-3 rounded-lg mb-3"
              >
                📝 Mark Attendance
              </button>

              <button
                onClick={() => {
                  setPopupView("view");
                  setCardHistoryBatch(popupSelectedBatch);
                }}
                className="w-full bg-[#3a006b] hover:bg-[#1B0138] text-white py-3 rounded-lg"
              >
                📊 View History
              </button>

              {popupView === "view" && cardHistoryBatch && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-[#1B0138] mb-4">
                    {cardHistoryBatch} - Attendance History
                  </h3>

                  <div className="space-y-4">
                    {BATCHES[cardHistoryBatch].students.map((student, i) => (
                      <StudentCard
                        key={student.id}
                        student={student}
                        index={i}
                        isHistory={true}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-8">
                <button
                  onClick={() => {
                    setPopupOpen(false);
                    setCardHistoryBatch(null);
                    setPopupView("select");
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-black"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Attendance;
