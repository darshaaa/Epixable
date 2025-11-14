import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaClipboardList } from "react-icons/fa";
import AdminSidebar from "../Admin/AdminSidebar";

const Attendance = () => {
  const [selectedBatch, setSelectedBatch] = useState("Batch A");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [popupType, setPopupType] = useState("view");
  const [showPopup, setShowPopup] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);

  const batchData = {
    "Batch A": [
      { id: "A101", name: "Rahul Sharma", course: "React.js" },
      { id: "A102", name: "Priya Singh", course: "Node.js" },
      { id: "A103", name: "Kiran Yadav", course: "Python" },
      { id: "A104", name: "Sneha Reddy", course: "Java" },
    ],
    "Batch B": [
      { id: "B201", name: "Vikram Kumar", course: "C++" },
      { id: "B202", name: "Anita Desai", course: "Web Development" },
      { id: "B203", name: "Ravi Teja", course: "SQL" },
      { id: "B204", name: "Suma Rao", course: "Data Science" },
    ],
    "Batch C": [
      { id: "C301", name: "Manoj Das", course: "Cyber Security" },
      { id: "C302", name: "Nisha Patel", course: "JavaScript" },
      { id: "C303", name: "Ajay Verma", course: "AI & ML" },
      { id: "C304", name: "Kavya Menon", course: "Cloud Computing" },
    ],
  };

  const attendanceHistory = {
    "Batch A": [
      { id: "A101", name: "Rahul Sharma", course: "React.js", percentage: "92%" },
      { id: "A102", name: "Priya Singh", course: "Node.js", percentage: "88%" },
      { id: "A103", name: "Kiran Yadav", course: "Python", percentage: "95%" },
      { id: "A104", name: "Sneha Reddy", course: "Java", percentage: "90%" },
    ],
    "Batch B": [
      { id: "B201", name: "Vikram Kumar", course: "C++", percentage: "85%" },
      { id: "B202", name: "Anita Desai", course: "Web Development", percentage: "80%" },
      { id: "B203", name: "Ravi Teja", course: "SQL", percentage: "88%" },
      { id: "B204", name: "Suma Rao", course: "Data Science", percentage: "92%" },
    ],
    "Batch C": [
      { id: "C301", name: "Manoj Das", course: "Cyber Security", percentage: "87%" },
      { id: "C302", name: "Nisha Patel", course: "JavaScript", percentage: "90%" },
      { id: "C303", name: "Ajay Verma", course: "AI & ML", percentage: "93%" },
      { id: "C304", name: "Kavya Menon", course: "Cloud Computing", percentage: "89%" },
    ],
  };

  useEffect(() => {
    setStudents(attendanceHistory["Batch A"]);
  }, []);

  const handleOpenPopup = (type) => {
    setPopupType(type);
    setShowPopup(true);
    setShowTable(false);
  };

  const handleBatchSelect = (batch) => {
    setSelectedBatch(batch);
    setShowPopup(false);

    setTimeout(() => {
      if (popupType === "mark") {
        setStudents(batchData[batch] || []);
        setAttendance({});
      } else {
        setStudents(attendanceHistory[batch] || []);
      }
      setShowTable(true);
    }, 300);
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = () => {
    const countPresent = Object.values(attendance).filter((s) => s === "Present").length;

    setSuccessMessage(
      `Attendance for ${selectedBatch} submitted! (${countPresent} Present, ${
        students.length - countPresent
      } Absent).`
    );

    setTimeout(() => setSuccessMessage(null), 5000);

    setPopupType("view");
    setStudents(attendanceHistory[selectedBatch] || []);
  };

  const StudentCard = ({ student, index }) => {
    const isHistory = popupType === "view";
    const percentage = student.percentage;
    const currentStatus = attendance[student.id] || "Absent";
    const isPresent = currentStatus === "Present";

    const getStatusColor = () => {
      if (isHistory) {
        const num = parseInt(percentage.replace("%", ""));
        if (num >= 90) return "bg-green-600";
        if (num >= 80) return "bg-yellow-500";
        return "bg-red-600";
      }
      return isPresent ? "bg-green-600" : "bg-red-600";
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="grid grid-cols-12 items-center p-4 rounded-xl bg-white shadow-md border-l-4"
        style={{
          borderColor: isHistory
            ? "#52057B" // Purple left border for history
            : isPresent
            ? "#16A34A"
            : "#DC2626",
        }}
      >
        {/* Student Info */}
        <div className="col-span-12 md:col-span-3">
          <p className="text-sm text-gray-500 font-medium">{student.id}</p>
          <p className="text-lg font-semibold text-gray-900">{student.name}</p>
        </div>

        {/* Course */}
        <div className="col-span-12 md:col-span-3 text-sm text-gray-700 mt-2 md:mt-0">
          <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
            {student.course}
          </span>
        </div>

        {/* Attendance / History */}
        {!isHistory && (
          <div className="col-span-12 md:col-span-6 flex items-center justify-start md:justify-end space-x-6 font-medium mt-3 md:mt-0">
            <label className="flex items-center space-x-2 cursor-pointer hover:text-green-700">
              <input
                type="radio"
                name={student.id}
                value="Present"
                checked={currentStatus === "Present"}
                onChange={() => handleAttendanceChange(student.id, "Present")}
                className="form-radio h-5 w-5 text-green-600 border-gray-300"
              />
              <span>Present</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer hover:text-red-700">
              <input
                type="radio"
                name={student.id}
                value="Absent"
                checked={currentStatus === "Absent"}
                onChange={() => handleAttendanceChange(student.id, "Absent")}
                className="form-radio h-5 w-5 text-red-600 border-gray-300"
              />
              <span>Absent</span>
            </label>
          </div>
        )}

        {isHistory && (
          <div className="col-span-12 md:col-span-6 flex justify-start md:justify-end mt-3 md:mt-0">
            <div
              className={`w-24 text-center text-white font-bold py-1 rounded-full shadow-lg ${getStatusColor()}`}
            >
              {percentage}
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#F7F7F7] font-poppins">
      <AdminSidebar />

      <div className="flex-1 p-4 sm:p-8 flex flex-col">
        {/* Page Header */}
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
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="fixed top-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-xl z-[60]"
            >
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white border-1 border-[#52057B] rounded-2xl p-4 sm:p-8 shadow-xl flex-1 mt-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
            <button
              onClick={() => handleOpenPopup("mark")}
              className="bg-[#52057B] hover:bg-[#6A0DAD] text-white font-bold px-4 py-2 rounded-lg shadow-md"
            >
              📝 Mark Attendance
            </button>

            <button
              onClick={() => handleOpenPopup("view")}
              className="bg-[#3a006b] hover:bg-[#1B0138] text-white font-bold px-4 py-2 rounded-lg shadow-md"
            >
              📊 View History
            </button>
          </div>

          <AnimatePresence>
            {showPopup && (
              <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <motion.div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm border-t-8 border-yellow-500">
                  <h2 className="text-xl font-extrabold text-[#1B0138] mb-5 text-center">
                    Select Batch
                  </h2>

                  {Object.keys(batchData).map((batch) => (
                    <button
                      key={batch}
                      onClick={() => handleBatchSelect(batch)}
                      className="block w-full bg-[#52057B] hover:bg-[#890596] text-white text-lg font-semibold py-3 rounded-xl mb-3"
                    >
                      {batch}
                    </button>
                  ))}

                  <button
                    onClick={() => setShowPopup(false)}
                    className="block w-full text-sm text-gray-500 hover:text-gray-900 mt-4"
                  >
                    Cancel
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {showTable && (
              <motion.div className="p-4 sm:p-6 bg-[#f0f2f5] rounded-xl shadow-inner">
                <div className="flex justify-between items-start mb-6 border-b border-gray-300 pb-3">
                  <h3 className="text-xl sm:text-2xl font-bold">
                    {selectedBatch} -{" "}
                    {popupType === "mark"
                      ? "Mark Attendance"
                      : "Attendance History"}
                  </h3>

                  {popupType === "mark" && (
                    <span className="text-sm font-semibold text-gray-500">
                      Date: {new Date().toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {students.length === 0 ? (
                    <p className="text-center text-gray-500 py-10">
                      No student data found.
                    </p>
                  ) : (
                    students.map((student, index) => (
                      <StudentCard key={student.id} student={student} index={index} />
                    ))
                  )}
                </div>

                {popupType === "mark" && students.length > 0 && (
                  <div className="text-center pt-8">
                    <button
                      onClick={handleSubmit}
                      className="bg-green-600 hover:bg-green-700 text-white font-extrabold px-10 py-3 rounded-xl shadow-lg"
                    >
                      🚀 Submit Today's Attendance
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
