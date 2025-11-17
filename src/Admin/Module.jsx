import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTimes, FaSearch, FaBookOpen, FaLayerGroup, FaCalendarAlt } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";

const Module = () => {
  const [modules, setModules] = useState([]);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [batch, setBatch] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("modules"));
    if (saved && saved.length > 0) return setModules(saved);

    const dummy = [
      { id: 1, name: "HTML Basics", course: "Web Development", batch: "Batch A", description: "Introduction to HTML and Structure.", createdAt: "2025-02-10 10:30 AM" },
      { id: 2, name: "CSS Flexbox", course: "Web Development", batch: "Batch B", description: "Design layouts using Flexbox.", createdAt: "2025-02-09 01:45 PM" },
      { id: 3, name: "Wireframing", course: "UI/UX", batch: "Batch C", description: "Learn UX wireframe concepts.", createdAt: "2025-02-08 09:00 AM" },
      { id: 4, name: "Python Loops", course: "Python", batch: "Batch A", description: "Master loops and conditions.", createdAt: "2025-02-07 03:20 PM" },
      { id: 5, name: "Logo Designing", course: "Graphic Design", batch: "Batch B", description: "Logo creation principles.", createdAt: "2025-02-06 11:10 AM" },
    ];

    setModules(dummy);
    localStorage.setItem("modules", JSON.stringify(dummy));
  }, []);

  const saveModules = (data) => {
    setModules(data);
    localStorage.setItem("modules", JSON.stringify(data));
  };

  const handleSubmit = () => {
    if (!name || !course || !batch || !description) return;

    const newModule = {
      id: Date.now(),
      name,
      course,
      batch,
      description,
      createdAt: new Date().toLocaleString(),
    };

    const updated = [...modules, newModule];
    saveModules(updated);

    setShowCreatePopup(false);
    setName("");
    setCourse("");
    setBatch("");
    setDescription("");
  };

  const deleteModule = (id) => {
    const updated = modules.filter((m) => m.id !== id);
    saveModules(updated);
    setShowDetailPopup(false);
  };

  const filteredModules = modules.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen font-poppins bg-[#F5F6FA] overflow-hidden">
      <AdminSidebar />

      <div className="flex-1 p-8 md:p-12 bg-gray-50 overflow-y-auto h-screen">
        <h1 className="text-4xl font-extrabold text-[#1B0138] mb-10 border-b pb-4">
          🎓 Course Modules
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreatePopup(true)}
            className="flex items-center gap-2 bg-[#1B0138] text-white px-8 py-3 rounded-xl shadow-xl font-semibold transition-all"
          >
            <FaPlus /> Create New Module
          </motion.button>

          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search module.."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-60 h-8 p-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1B0138] shadow-md"
            />
          </div>
        </div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredModules.map((module) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                setSelectedModule(module);
                setShowDetailPopup(true);
              }}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-500 cursor-pointer hover:border-[#1B0138]"
            >
              <div className="flex-grow">
                <div className="bg-[#1B0138] text-white p-3 rounded-xl inline-block mb-4 shadow-lg">
                  <FaBookOpen size={20} />
                </div>
                <h2 className="text-2xl font-bold text-[#1B0138] mb-3">
                  {module.name}
                </h2>
                <p className="text-gray-600 line-clamp-2 mb-4">{module.description}</p>
              </div>

              <div className="space-y-2 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <FaLayerGroup className="text-purple-500" />
                  <span className="font-semibold">Course:</span> {module.course}
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <FaCalendarAlt className="text-pink-500" />
                  <span className="font-semibold">Batch:</span> {module.batch}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Created on {new Date(module.createdAt).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}

          {filteredModules.length === 0 && (
            <div className="text-gray-500 text-center col-span-full py-10">
              No modules found matching "{search}".
            </div>
          )}
        </div>

        {/* CREATE POPUP — RIGHT SLIDE */}
        <AnimatePresence>
          {showCreatePopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 flex justify-end items-center p-4 backdrop-blur-sm z-50"
            >
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-2xl border border-gray-100"
              >
                <div className="flex justify-between items-center mb-6 border-b pb-3">
                  <h2 className="text-3xl font-extrabold text-[#1B0138]">Add New Module</h2>
                  <FaTimes
                    className="cursor-pointer text-gray-500 hover:text-red-500"
                    onClick={() => setShowCreatePopup(false)}
                    size={20}
                  />
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Module Name"
                    className="w-full p-4 border rounded-xl"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <select
                    className="w-full p-4 border rounded-xl bg-white"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                  >
                    <option value="" disabled>Select Course</option>
                    <option>Web Development</option>
                    <option>UI/UX</option>
                    <option>Python</option>
                    <option>Graphic Design</option>
                  </select>

                  <select
                    className="w-full p-4 border rounded-xl bg-white"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                  >
                    <option value="" disabled>Select Batch</option>
                    <option>Batch A</option>
                    <option>Batch B</option>
                    <option>Batch C</option>
                  </select>

                  <textarea
                    placeholder="Description"
                    rows={4}
                    className="w-full p-4 border rounded-xl"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-green-600 text-white p-4 rounded-xl font-bold text-lg shadow-md"
                  >
                    Submit Module
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DETAIL POPUP — RIGHT SLIDE */}
        <AnimatePresence>
          {showDetailPopup && selectedModule && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 flex justify-end items-center p-4 backdrop-blur-sm z-50"
            >
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-2xl border border-gray-100"
              >
                <div className="flex justify-between items-center mb-6 border-b pb-3">
                  <h2 className="text-3xl font-extrabold text-[#1B0138]">Module Details</h2>
                  <FaTimes
                    className="cursor-pointer text-gray-500 hover:text-red-500"
                    onClick={() => setShowDetailPopup(false)}
                    size={20}
                  />
                </div>

                <div className="space-y-4 text-gray-700">
                  <p className="text-2xl font-bold text-[#1B0138]">{selectedModule.name}</p>
                  <p className="border-b pb-4 text-gray-600 italic">{selectedModule.description}</p>

                  <p className="flex items-center gap-2">
                    <FaLayerGroup className="text-purple-500" />
                    <b>Course:</b> {selectedModule.course}
                  </p>

                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-pink-500" />
                    <b>Batch:</b> {selectedModule.batch}
                  </p>

                  <p className="text-sm text-gray-500 pt-2 border-t">
                    <b>Created At:</b> {selectedModule.createdAt}
                  </p>
                </div>

                <button
                  onClick={() => deleteModule(selectedModule.id)}
                  className="mt-8 w-full bg-red-600 text-white p-4 rounded-xl font-bold text-lg shadow-md"
                >
                  <FaTimes className="inline-block mr-2" /> Delete Module
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Module;
