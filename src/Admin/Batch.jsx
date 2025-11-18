import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";

const Batch = () => {
  const [batches, setBatches] = useState([
    {
      id: 1,
      batchNo: "B001",
      batchName: "Alpha Dev",
      batchTitle: "Web Development",
      course: "React Basics",
      batchTiming: "10:00 AM - 12:00 PM",
      createdAt: "2024-01-15",
      studentsCount: 25,
    },
    {
      id: 2,
      batchNo: "B002",
      batchName: "Node Ninjas",
      batchTitle: "Backend Focus",
      course: "Node.js Mastery",
      batchTiming: "06:00 PM - 08:00 PM",
      createdAt: "2024-02-02",
      studentsCount: 18,
    },
    {
      id: 3,
      batchNo: "B003",
      batchName: "Full Stack Pro",
      batchTitle: "Advanced Development",
      course: "Full Stack Development",
      batchTiming: "08:30 AM - 10:30 AM",
      createdAt: "2024-02-20",
      studentsCount: 30,
    },
  ]);

  const [courses] = useState([
    "React Basics",
    "Node.js Mastery",
    "Full Stack Development",
    "Python for Beginners",
    "Data Analytics Bootcamp",
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [batchData, setBatchData] = useState({
    batchNo: "",
    batchName: "",
    course: "",
    startTime: "",
    endTime: "",
    createdAt: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {}, 100);
    return () => clearTimeout(timer);
  }, [batches]);

  const generateTimes = () => {
    const times = [];
    for (let hour = 6; hour <= 20; hour++) {
      for (let min of [0, 30]) {
        const period = hour >= 12 ? "PM" : "AM";
        const formattedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        const formattedMin = min === 0 ? "00" : "30";
        times.push(`${formattedHour}:${formattedMin} ${period}`);
      }
    }
    return times;
  };

  const timeOptions = generateTimes();

  const handleCreateBatch = (e) => {
    e.preventDefault();
    if (
      !batchData.batchNo ||
      !batchData.batchName ||
      !batchData.course ||
      !batchData.startTime ||
      !batchData.endTime ||
      !batchData.createdAt
    )
      return alert("Please fill all fields!");

    const batchTiming = `${batchData.startTime} - ${batchData.endTime}`;

    if (editingBatch) {
      setBatches((prev) =>
        prev.map((b) =>
          b.id === editingBatch.id ? { ...b, ...batchData, batchTiming } : b
        )
      );
      setEditingBatch(null);
    } else {
      setBatches((prev) => [
        {
          id: Date.now(),
          ...batchData,
          batchTiming,
          studentsCount: 25,
        },
        ...prev,
      ]);
    }

    setBatchData({
      batchNo: "",
      batchName: "",
      course: "",
      startTime: "",
      endTime: "",
      createdAt: "",
    });
    setShowForm(false);
  };

  const handleEdit = (batch) => {
    const [start, end] = batch.batchTiming.split(" - ");

    setEditingBatch(batch);
    setBatchData({
      batchNo: batch.batchNo,
      batchName: batch.batchName,
      course: batch.course,
      startTime: start.trim(),
      endTime: end.trim(),
      createdAt: batch.createdAt,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this batch?")) {
      setBatches(batches.filter((b) => b.id !== id));
    }
  };

  const filteredBatches = batches
    .filter((batch) =>
      Object.values(batch).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="flex min-h-screen bg-[#F7F7F7] font-poppins overflow-hidden">
      <AdminSidebar />

      {/* Make only this div scroll */}
      <div className="flex-1 p-8 relative overflow-y-auto h-screen">
        <div className="flex items-center gap-3 mb-6 mt-10">
          <span className="text-3xl bg-[#1B0138] text-white p-3 rounded-xl">
            🎓
          </span>
          <h1 className="text-4xl font-extrabold text-[#1B0138]">
            Batch Management
          </h1>
        </div>

        {/* top bar */}
        <div className="flex justify-between items-center mb-10">
          <button
            onClick={() => {
              if (editingBatch) setEditingBatch(null);
              setShowForm(true);
            }}
            className="flex items-center bg-[#1B0138] text-white px-6 py-3 rounded-xl hover:bg-[#3a006b] shadow-lg"
          >
            ➕ Create New Batch
          </button>

          <div className="relative w-60 max-w-xs">
            {/* Search Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116 10.5a7.5 7.5 0 01-9.9 9.9z"
              />
            </svg>

            <input
              type="text"
              placeholder="Search Batches.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-8 p-3 pl-12 border border-gray-300 rounded-xl bg-white"
            />
          </div>
        </div>

        {/* CARD GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {filteredBatches.map((batch) => (
            <div
              key={batch.id}
              className="bg-white shadow-lg rounded-2xl p-6 border border-gray-400 hover:shadow-2xl transition-transform duration-200 hover:scale-[1.02]"
            >
              <h2 className="text-xl font-bold text-[#1B0138] mb-3">
                {batch.batchName}
              </h2>

              <p className="text-gray-700">
                <strong>Batch No:</strong> {batch.batchNo}
              </p>
              <p className="text-gray-700 mt-1">
                <strong>Course:</strong> {batch.course}
              </p>
              <p className="text-gray-700 mt-1">
                <strong>Timing:</strong> {batch.batchTiming}
              </p>
              <p className="text-gray-700 mt-1">
                <strong>Date:</strong> {batch.createdAt}
              </p>
              <p className="text-gray-700 mt-1">
                <strong>Students:</strong> {batch.studentsCount}
              </p>

              <div className="flex justify-between mt-5">
                <button
                  onClick={() => handleEdit(batch)}
                  className="px-4 py-2 bg-[#1B0138] text-white rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(batch.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* POPUP */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-end z-50">
            <div className="bg-white p-8 rounded-l-3xl shadow-2xl w-full max-w-md animate-slideFromRight border-l-4 border-[#1B0138]">
              <h2 className="text-2xl font-bold text-[#1B0138] text-center mb-6 border-b pb-3">
                {editingBatch ? "Edit Batch" : "Create New Batch"}
              </h2>

              <form onSubmit={handleCreateBatch}>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-sm font-semibold">Batch No</label>
                    <input
                      type="text"
                      className="w-full p-3 border rounded-lg bg-gray-50"
                      value={batchData.batchNo}
                      onChange={(e) =>
                        setBatchData({ ...batchData, batchNo: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold">Batch Name</label>
                    <input
                      type="text"
                      className="w-full p-3 border rounded-lg bg-gray-50"
                      value={batchData.batchName}
                      onChange={(e) =>
                        setBatchData({
                          ...batchData,
                          batchName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold">Course</label>
                    <select
                      className="w-full p-3 border rounded-lg bg-white"
                      value={batchData.course}
                      onChange={(e) =>
                        setBatchData({ ...batchData, course: e.target.value })
                      }
                    >
                      <option value="">-- Select Course --</option>
                      {courses.map((c, i) => (
                        <option key={i} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold">Start Time</label>
                    <select
                      className="w-full p-3 border rounded-lg bg-white"
                      value={batchData.startTime}
                      onChange={(e) =>
                        setBatchData({
                          ...batchData,
                          startTime: e.target.value,
                        })
                      }
                    >
                      <option value="">-- Select Start Time --</option>
                      {timeOptions.map((t, i) => (
                        <option key={i} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold">End Time</label>
                    <select
                      className="w-full p-3 border rounded-lg bg-white"
                      value={batchData.endTime}
                      onChange={(e) =>
                        setBatchData({ ...batchData, endTime: e.target.value })
                      }
                    >
                      <option value="">-- Select End Time --</option>
                      {timeOptions.map((t, i) => (
                        <option key={i} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold">
                      Created Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 border rounded-lg bg-white"
                      value={batchData.createdAt}
                      onChange={(e) =>
                        setBatchData({
                          ...batchData,
                          createdAt: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingBatch(null);
                    }}
                    className="px-6 py-2 bg-gray-200 rounded-lg"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#1B0138] text-white rounded-lg"
                  >
                    {editingBatch ? "Update Batch" : "Create Batch"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <style>{`
          @keyframes slideFromRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1); }
          }
          .animate-slideFromRight {
            animation: slideFromRight 0.5s ease-out forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Batch;
