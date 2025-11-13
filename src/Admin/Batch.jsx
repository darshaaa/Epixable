import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";

const Batch = () => {
  const [batches, setBatches] = useState([
    {
      id: 1,
      batchNo: "B001",
      batchName: "Batch A",
      batchTitle: "Web Development",
      course: "React Basics",
      batchTiming: "10:00 AM - 12:00 PM",
    },
  ]);

  // ✅ Example: These courses will normally come from your Courses page or backend
  const [courses] = useState([
    "React Basics",
    "Node.js Mastery",
    "Full Stack Development",
    "Python for Beginners",
    "Data Analytics Bootcamp",
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);
  const [batchData, setBatchData] = useState({
    batchNo: "",
    batchName: "",
    batchTitle: "",
    course: "",
    startTime: "",
    endTime: "",
  });

  // Generate dropdown times (every 30 minutes)
  const generateTimes = () => {
    const times = [];
    for (let hour = 6; hour <= 20; hour++) {
      for (let min of [0, 30]) {
        const period = hour >= 12 ? "PM" : "AM";
        const formattedHour = hour > 12 ? hour - 12 : hour;
        const formattedMin = min === 0 ? "00" : "30";
        times.push(`${formattedHour}:${formattedMin} ${period}`);
      }
    }
    return times;
  };

  const timeOptions = generateTimes();

  // ✅ Create / Update batch
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
      setBatches(
        batches.map((b) =>
          b.id === editingBatch.id
            ? { ...b, ...batchData, batchTiming }
            : b
        )
      );
      setEditingBatch(null);
    } else {
      setBatches([
        ...batches,
        { id: Date.now(), ...batchData, batchTiming },
      ]);
    }

    // Reset form
    setBatchData({
      batchNo: "",
      batchName: "",
      batchTitle: "",
      course: "",
      startTime: "",
      endTime: "",
    });
    setShowForm(false);
  };

  // ✅ Edit batch
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-[#1B0138] mb-6">
          Batch Management
        </h1>

        {/* Create Batch Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#1B0138] text-white px-4 py-2 rounded-lg mb-6 hover:bg-[#3a006b]"
        >
          {showForm ? "Close Form" : editingBatch ? "Edit Batch" : "Create Batch"}
        </button>

        {/* Create/Edit Batch Form */}
        {showForm && (
          <form
            onSubmit={handleCreateBatch}
            className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl mb-6"
          >
            <h2 className="text-xl font-semibold mb-4">
              {editingBatch ? "Edit Batch" : "Create New Batch"}
            </h2>

            <input
              type="text"
              placeholder="Batch No"
              className="w-full p-2 border rounded-lg mb-3"
              value={batchData.batchNo}
              onChange={(e) =>
                setBatchData({ ...batchData, batchNo: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Batch Name"
              className="w-full p-2 border rounded-lg mb-3"
              value={batchData.batchName}
              onChange={(e) =>
                setBatchData({ ...batchData, batchName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Batch Title"
              className="w-full p-2 border rounded-lg mb-3"
              value={batchData.batchTitle}
              onChange={(e) =>
                setBatchData({ ...batchData, batchTitle: e.target.value })
              }
            />

            {/* ✅ Course Dropdown */}
            <select
              className="w-full p-2 border rounded-lg mb-3"
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

            {/* ✅ Batch Timing Dropdowns */}
            <div className="flex gap-3 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1">
                  Start Time
                </label>
                <select
                  className="w-full p-2 border rounded-lg"
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

              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1">
                  End Time
                </label>
                <select
                  className="w-full p-2 border rounded-lg"
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

            <button
              type="submit"
              className="bg-[#1B0138] text-white px-4 py-2 rounded-lg hover:bg-[#3a006b]"
            >
              {editingBatch ? "Update Batch" : "Create Batch"}
            </button>
          </form>
        )}

        {/* Batch List Table */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Batch List</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#1B0138] text-white">
                <th className="p-3 text-left">Batch No</th>
                <th className="p-3 text-left">Batch Name</th>
                <th className="p-3 text-left">Batch Title</th>
                <th className="p-3 text-left">Course</th>
                <th className="p-3 text-left">Timing</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {batches.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No batches created yet.
                  </td>
                </tr>
              ) : (
                batches.map((batch) => (
                  <tr key={batch.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{batch.batchNo}</td>
                    <td className="p-3">{batch.batchName}</td>
                    <td className="p-3">{batch.batchTitle}</td>
                    <td className="p-3">{batch.course}</td>
                    <td className="p-3">{batch.batchTiming}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleEdit(batch)}
                        className="text-[#1B0138] font-semibold hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Batch;
