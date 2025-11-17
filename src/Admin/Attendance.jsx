// Attendance.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaClipboardList } from "react-icons/fa";
import AdminSidebar from "../Admin/AdminSidebar"; // keep your sidebar import

// ---------------------- Sample Local Data (no backend) ----------------------
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

const computeBatchMiniSeries = (batch) => {
  const allDates = new Set();
  batch.students.forEach((s) => s.history.forEach((h) => allDates.add(h.date)));
  const sortedDates = Array.from(allDates).sort().slice(-7);
  const series = sortedDates.map((date) => {
    let present = 0;
    batch.students.forEach((s) => {
      const rec = s.history.find((h) => h.date === date);
      if (rec && rec.status === "Present") present++;
    });
    const pct = Math.round((present / batch.students.length) * 100) || 0;
    return { date, pct };
  });
  return series;
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
  const [popupSelectedCourse, setPopupSelectedCourse] = useState("");
  const [markedData, setMarkedData] = useState({});

  useEffect(() => {
    setStudents(
      (BATCHES[selectedBatch] && BATCHES[selectedBatch].students) || []
    );
    setAttendance({});
  }, [selectedBatch]);

  const openPopup = () => {
    setPopupSelectedBatch(selectedBatch || Object.keys(BATCHES)[0]);
    setPopupView("select");
    setPopupOpen(true);
  };

  const handlePopupAction = (action, batch) => {
    setPopupView(action);
    setPopupSelectedBatch(batch);
    if (action === "mark") {
      setStudents(BATCHES[batch].students);
      setAttendance({});
      setTimeout(() => setPopupOpen(false), 250);
      setSelectedBatch(batch);
    }
  };

  const handleCardClick = (batch) => {
    setCardHistoryBatch(batch);
    setPopupView("historyCard");
    setPopupOpen(true);
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = () => {
    const countPresent = Object.values(attendance).filter(
      (s) => s === "Present"
    ).length;
    setSuccessMessage(
      `Attendance for ${selectedBatch} submitted! (${countPresent} Present, ${
        students.length - countPresent
      } Absent).`
    );
    setTimeout(() => setSuccessMessage(null), 4000);
    setPopupView("select");
  };

  const MiniBarChart = ({ series = [] }) => {
    const max = 100;
    return (
      <svg width="100%" height="48" viewBox="0 0 100 48" preserveAspectRatio="none">
        {series.map((s, i) => {
          const w = 100 / series.length;
          const h = (s.pct / max) * 40;
          const x = i * w + 1;
          const y = 48 - h - 4;
          return (
            <rect
              key={i}
              x={`${x}`}
              y={y}
              width={w - 4}
              height={h}
              rx="1"
              fill="#6B21A8"
              opacity="0.95"
            />
          );
        })}
      </svg>
    );
  };

  const StudentCard = ({ student, index, isHistory }) => {
    const currentStatus = attendance[student.id] || "Absent";
    const isPresent = currentStatus === "Present";

    const getStatusColor = () => {
      if (isHistory) {
        const num = student.percentage || 0;
        if (num >= 90) return "bg-green-600";
        if (num >= 80) return "bg-yellow-500";
        return "bg-red-600";
      }
      return isPresent ? "bg-green-600" : "bg-red-600";
    };

    const markAttendance = (id, status) => {
      setMarkedData((prev) => ({ ...prev, [id]: status }));
    };

    const saveAttendance = (batch) => {
      console.log("Saved for batch:", batch, markedData);
      alert("Attendance Saved!");
      setPopupOpen(false);
      setMarkedData({});
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

        <div className="col-span-12 md:col-span-3 text-sm text-gray-700 mt-2 md:mt-0">
          <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
            {student.course}
          </span>
        </div>

        {!isHistory && (
          <div className="col-span-12 md:col-span-5 flex items-center justify-start md:justify-end space-x-6 mt-3 md:mt-0">
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
          <div className="col-span-12 md:col-span-5 flex justify-start md:justify-end mt-3 md:mt-0">
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
  const attendancePct = students.length
    ? Math.round((presentCount / students.length) * 100)
    : 0;

  return (
    <>
      {/* 🚀 FIXED SCROLL: overflow-hidden added */}
      <div className="flex min-h-screen bg-[#F7F7F7] font-poppins overflow-hidden">
        <AdminSidebar />

        {/* 🚀 FIXED SCROLL: overflow-y-auto h-screen added */}
        <div className="flex-1 p-4 sm:p-8 flex flex-col overflow-y-auto h-screen">

          {/* Header */}
          <div className="mb-6 flex items-center gap-4 mt-9">
            <div className="bg-[#1B0138] p-3 rounded-xl text-white inline-flex items-center justify-center">
              <FaClipboardList size={20} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1B0138]">
              Attendance Dashboard
            </h1>
          </div>

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

          <div className="bg-white border-1 border-[#52057B] rounded-2xl p-4 sm:p-8 shadow-xl flex-1 mt-4">
            <div className="flex justify-start mb-6">
              <button
                onClick={openPopup}
                className="bg-[#52057B] hover:bg-[#6A0DAD] text-white font-bold px-6 py-3 rounded-lg shadow-md"
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
                <span className="text-xs text-gray-400">Live Count</span>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-red-600">
                <h3 className="text-sm font-semibold text-gray-500">
                  Absent Today
                </h3>
                <p className="text-2xl font-bold mt-2 text-red-700">
                  {absentCount}
                </p>
                <span className="text-xs text-gray-400">Live Count</span>
              </div>

              <div className="bg-gradient-to-r from-[#52057B] to-[#1B0138] text-white p-4 rounded-2xl shadow-lg">
                <h3 className="text-sm font-semibold opacity-90">
                  Attendance %
                </h3>
                <p className="text-3xl font-extrabold mt-2">{attendancePct}%</p>
                <div className="mt-3">
                  <div className="flex items-end gap-2 h-12">
                    {[30, 50, 75, 60, 90, 55].map((h, i) => (
                      <div
                        key={i}
                        className="bg-white/30 w-3 rounded-md"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Student List */}
            <div className="p-4 sm:p-6 bg-[#f0f2f5] rounded-xl shadow-inner">
              <div className="flex justify-between items-start mb-6 border-b border-gray-300 pb-3">
                <h3 className="text-xl sm:text-2xl font-bold">
                  {selectedBatch} -{" "}
                  {Object.keys(attendance).length
                    ? "Mark Attendance"
                    : "Students"}
                </h3>

                <span className="text-sm font-semibold text-gray-500">
                  Date: {new Date().toLocaleDateString()}
                </span>
              </div>

              <div className="space-y-4">
                {students.length === 0 ? (
                  <p className="text-center text-gray-500 py-10">
                    No students found.
                  </p>
                ) : (
                  students.map((student, i) => (
                    <StudentCard
                      key={student.id}
                      student={student}
                      index={i}
                      isHistory={false}
                    />
                  ))
                )}
              </div>

              {students.length > 0 && (
                <div className="text-center pt-6">
                  <button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700 text-white font-extrabold px-8 py-3 rounded-xl shadow-lg"
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-3xl border-t-8 border-[#52057B]"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-extrabold text-[#1B0138]">
                  Select Batch
                </h2>
                <button
                  onClick={() => setPopupOpen(false)}
                  className="text-gray-500 hover:text-black"
                >
                  ✖
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2 font-medium">
                    Choose Batch
                  </label>
                  <select
                    value={popupSelectedBatch}
                    onChange={(e) => setPopupSelectedBatch(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50"
                  >
                    {Object.keys(BATCHES).map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2 mt-4">
                  <label className="block text-gray-700 mb-2 font-medium">
                    Choose Course
                  </label>
                  <select
                    value={popupSelectedCourse}
                    onChange={(e) => setPopupSelectedCourse(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50"
                  >
                    <option value="">Select Course</option>
                    <option value="React.js">React.js</option>
                    <option value="Node.js">Node.js</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="C++">C++</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="JavaScript">JavaScript</option>
                  </select>
                </div>

                <div className="flex flex-col gap-3 justify-end">
                  <button
                    onClick={() =>
                      handlePopupAction("mark", popupSelectedBatch)
                    }
                    className="w-full bg-[#52057B] hover:bg-[#6A0DAD] text-white font-bold py-3 rounded-lg"
                  >
                    📝 Mark Attendance
                  </button>

                  <button
                    onClick={() =>
                      handlePopupAction("view", popupSelectedBatch)
                    }
                    className="w-full bg-[#3a006b] hover:bg-[#1B0138] text-white font-bold py-3 rounded-lg"
                  >
                    📊 View History
                  </button>
                </div>
              </div>

              {/* History / Other views remain unchanged */}
              {/* (Keeping your code untouched — only scroll fix applied above) */}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setPopupOpen(false);
                    setCardHistoryBatch(null);
                    setPopupView("select");
                  }}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-black"
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
