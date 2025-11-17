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
    },
    {
      id: 2,
      batchNo: "B002",
      batchName: "Node Ninjas",
      batchTitle: "Backend Focus",
      course: "Node.js Mastery",
      batchTiming: "06:00 PM - 08:00 PM",
    },
    {
      id: 3,
      batchNo: "B003",
      batchName: "Full Stack Pro",
      batchTitle: "Advanced Development",
      course: "Full Stack Development",
      batchTiming: "08:30 AM - 10:30 AM",
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
  const [searchTerm, setSearchTerm] = useState(""); // New state for search
  const [batchData, setBatchData] = useState({
    batchNo: "",
    batchName: "",
    batchTitle: "",
    course: "",
    startTime: "",
    endTime: "",
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
      !batchData.batchTitle ||
      !batchData.course ||
      !batchData.startTime ||
      !batchData.endTime
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
        { id: Date.now(), ...batchData, batchTiming },
        ...prev,
      ]);
    }

    setBatchData({
      batchNo: "",
      batchName: "",
      batchTitle: "", // Cleared batchTitle as well
      course: "",
      startTime: "",
      endTime: "",
    });
    setShowForm(false);
  };

  const handleEdit = (batch) => {
    const [start, end] = batch.batchTiming.split(" - ");
    setEditingBatch(batch);
    setBatchData({
      batchNo: batch.batchNo,
      batchName: batch.batchName,
      batchTitle: batch.batchTitle,
      course: batch.course,
      startTime: start.trim(),
      endTime: end.trim(),
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this batch?")) {
      setBatches(batches.filter((b) => b.id !== id));
    }
  };

  // Logic for filtering batches based on search term
  const filteredBatches = batches.filter((batch) =>
    Object.values(batch).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="flex min-h-screen bg-[#F7F7F7] font-poppins">
      <AdminSidebar />

      <div className="flex-1 p-8 relative overflow-hidden">
        {/* Page Header with Icon */}
        <div className="flex items-center gap-3 mb-6 mt-10">
          <span className="text-3xl bg-[#1B0138] text-white p-3 rounded-xl">
            🎓
          </span>
          <h1 className="text-4xl font-extrabold text-[#1B0138]">
            Batch Management
          </h1>
        </div>
        
        {/* Row for Create Batch Button and Search Bar */}
        <div className="flex justify-between items-center mb-10">
          <button
            onClick={() => {
              if (editingBatch) setEditingBatch(null);
              setShowForm(true);
            }}
            className="flex items-center bg-[#1B0138] text-white px-6 py-3 rounded-xl hover:bg-[#3a006b] transition-all shadow-lg font-poppins"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Create New Batch
          </button>

          {/* Search Bar */}
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search Batches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-12 border border-gray-300 rounded-xl focus:ring-[#1B0138] focus:border-[#1B0138] bg-white transition duration-150 shadow-sm"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>


        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-500 font-poppins">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Active Batches
          </h2>

          <div className="grid grid-cols-12 text-sm font-semibold text-gray-500 border-b pb-3 mb-3 sticky top-0 bg-white z-10">
            <span className="col-span-2">Batch No</span>
            <span className="col-span-3">Batch Name </span>
            <span className="col-span-3">Course</span>
            <span className="col-span-2">Timing</span>
            <span className="col-span-2 text-center">Actions</span>
          </div>

          {filteredBatches.length === 0 ? (
            <p className="text-center py-8 text-gray-500">
              {searchTerm
                ? `No batches found for "${searchTerm}".`
                : "No batches created yet. Click 'Create New Batch' to start."}
            </p>
          ) : (
            <div className="space-y-3">
              {filteredBatches.map((batch, index) => (
                <div
                  key={batch.id}
                  className={`grid grid-cols-12 items-center p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.01] animate-fadeIn-delayed`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="col-span-2 text-sm font-semibold text-[#1B0138]">
                    {batch.batchNo}
                  </div>
                  <div className="col-span-3">
                    <p className="text-base font-medium text-gray-800">
                      {batch.batchName}
                    </p>
                    <p className="text-xs text-gray-500">{batch.batchTitle}</p>
                  </div>
                  <div className="col-span-3 text-sm text-gray-700">
                    {batch.course}
                  </div>
                  <div className="col-span-2 text-sm">
                    <span className="inline-block px-3 py-1 text-white bg-[#5D50A6] rounded-full text-xs font-medium">
                      {batch.batchTiming}
                    </span>
                  </div>
                  <div className="col-span-2 flex justify-center space-x-3 text-sm">
                    <button
                      onClick={() => handleEdit(batch)}
                      className="text-[#1B0138] hover:text-[#3a006b] font-medium transition-colors"
                      title="Edit Batch"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(batch.id)}
                      className="text-red-500 hover:text-red-700 font-medium transition-colors"
                      title="Delete Batch"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Popup Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 font-poppins">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl animate-slideUp relative border-t-4 border-[#1B0138]">
              <h2 className="text-2xl font-bold text-[#1B0138] text-center mb-6 border-b pb-3">
                {editingBatch ? "Edit Batch Details" : "Create New Batch"}
              </h2>

              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-2 rounded-full transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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

              <form onSubmit={handleCreateBatch}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Batch No
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., B005"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#1B0138] focus:border-[#1B0138] bg-gray-50 transition duration-150"
                      value={batchData.batchNo}
                      onChange={(e) =>
                        setBatchData({ ...batchData, batchNo: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Batch Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Phoenix Group"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#1B0138] focus:border-[#1B0138] bg-gray-50 transition duration-150"
                      value={batchData.batchName}
                      onChange={(e) =>
                        setBatchData({ ...batchData, batchName: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Batch Title (Short Description)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Advanced Development"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#1B0138] focus:border-[#1B0138] bg-gray-50 transition duration-150"
                      value={batchData.batchTitle}
                      onChange={(e) =>
                        setBatchData({
                          ...batchData,
                          batchTitle: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-span-2 mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Assigned Course
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#1B0138] focus:border-[#1B0138] bg-white transition duration-150 appearance-none"
                      value={batchData.course}
                      onChange={(e) =>
                        setBatchData({ ...batchData, course: e.target.value })
                      }
                    >
                      <option value="">-- Select Course --</option>
                      {courses.map((course, idx) => (
                        <option key={idx} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Start Time
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#1B0138] focus:border-[#1B0138] bg-white transition duration-150 appearance-none"
                      value={batchData.startTime}
                      onChange={(e) =>
                        setBatchData({ ...batchData, startTime: e.target.value })
                      }
                    >
                      <option value="">-- Select Start Time --</option>
                      {timeOptions.map((time, idx) => (
                        <option key={idx} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      End Time
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#1B0138] focus:border-[#1B0138] bg-white transition duration-150 appearance-none"
                      value={batchData.endTime}
                      onChange={(e) =>
                        setBatchData({ ...batchData, endTime: e.target.value })
                      }
                    >
                      <option value="">-- Select End Time --</option>
                      {timeOptions.map((time, idx) => (
                        <option key={idx} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingBatch(null);
                      setBatchData({
                        // Reset form on cancel
                        batchNo: "",
                        batchName: "",
                        batchTitle: "",
                        course: "",
                        startTime: "",
                        endTime: "",
                      });
                    }}
                    className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-150 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#1B0138] text-white rounded-lg hover:bg-[#3a006b] transition duration-150 font-medium shadow-md"
                  >
                    {editingBatch ? "💾 Update Batch" : "✨ Create Batch"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <style>{`
          .font-poppins { font-family: 'Poppins', sans-serif; }

          @keyframes slideUp {
            from { transform: translateY(100px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-slideUp {
            animation: slideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
          
          @keyframes fadeInDelayed {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn-delayed {
            animation: fadeInDelayed 0.4s ease-out forwards;
            opacity: 0;
          }

          select {
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="%239CA3AF"><path d="M7 10l5 5 5-5z"/></svg>');
            background-repeat: no-repeat;
            background-position: right 0.75rem center;
            background-size: 1.5em 1.5em;
            padding-right: 2.5rem;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Batch;