import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTimes, FaSearch, FaTrash } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";

// --- ICON FUNCTION (unchanged) ---
const getIcon = (courseName) => {
  if (courseName.includes("React")) return "⚛️";
  if (courseName.includes("Node.js")) return "⚡";
  if (courseName.includes("Business") || courseName.includes("Management"))
    return "💼";
  if (courseName.includes("Cyber Security")) return "🛡️";
  if (
    courseName.includes("Data Science") ||
    courseName.includes("Data Analytics")
  )
    return "📊";
  return "📚";
};

const Modules = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [showModulePopup, setShowModulePopup] = useState(false);
  const [showCreateModulePopup, setShowCreateModulePopup] = useState(false);

  const [newModuleName, setNewModuleName] = useState("");
  const [newModuleDescription, setNewModuleDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // ❗ NEW STATE FOR DELETE CONFIRM POPUP
  const [deleteTarget, setDeleteTarget] = useState(null);

  // --- LOAD LOCALSTORAGE ---
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("coursesData")) || [];
    setCourses(stored);
  }, []);

  const updateLocalStorage = (updated) => {
    localStorage.setItem("coursesData", JSON.stringify(updated));
    setCourses(updated);
  };

  const openCourseModules = (course) => {
    setSelectedCourse(course);
    setShowModulePopup(true);
  };

  const addModule = () => {
    if (!newModuleName.trim()) return;

    const updatedCourses = courses.map((course) => {
      if (course.id === selectedCourse.id) {
        return {
          ...course,
          modules: [
            ...(course.modules || []),
            {
              id: Date.now(),
              name: newModuleName,
              description: newModuleDescription,
              createdAt: new Date().toISOString(),
            },
          ],
        };
      }
      return course;
    });

    updateLocalStorage(updatedCourses);

    setNewModuleName("");
    setNewModuleDescription("");
    setShowCreateModulePopup(false);

    setSelectedCourse(updatedCourses.find((c) => c.id === selectedCourse.id));
  };

  // 🔥 OPEN CUSTOM DELETE CONFIRM POPUP
  const confirmDeleteModule = (moduleId) => {
    setDeleteTarget(moduleId);
  };

  // 🔥 DELETE AFTER CONFIRMATION
  const deleteModule = () => {
    const updatedCourses = courses.map((course) => {
      if (course.id === selectedCourse.id) {
        return {
          ...course,
          modules: course.modules.filter((m) => m.id !== deleteTarget),
        };
      }
      return course;
    });

    updateLocalStorage(updatedCourses);
    setSelectedCourse(updatedCourses.find((c) => c.id === selectedCourse.id));
    setDeleteTarget(null);
  };

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <div className="w-64 h-screen sticky top-0">
        <AdminSidebar />
      </div>

      <div className="flex-1 h-screen overflow-y-auto p-6 bg-gray-300">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6 mt-3">
           <span className="text-xl bg-[#1B0138] text-white p-3 rounded-xl">
            🎓
          </span>
          <h1 className="text-2xl font-bold text-[#1B0138]">Modules</h1>
        </div>

        {/* MAIN CONTAINER */}
        <div className="bg-white p-6 rounded-xl mt-25">
          {/* SEARCH BAR */}
          <div className="relative w-64 ml-auto bg-[#e3ece8] rounded-full flex items-center mb-8">
            <FaSearch className="ml-3 text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 bg-transparent rounded-full focus:ring-0 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* COURSE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ scale: 1.03 }}
                className="group relative cursor-pointer p-8 min-h-[200px] rounded-xl 
                bg-white border border-gray-300 hover:bg-orange-600 transition-all duration-300"
                onClick={() => openCourseModules(course)}
              >
                {/* ICON + TITLE */}
                <div className="flex items-center gap-3 mb-3 -ml-2">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 group-hover:bg-white transition">
                    <span className="text-2xl group-hover:text-black ">
                      {getIcon(course.name)}
                    </span>
                  </div>

                  <h2 className="font-bold text-lg text-gray-900 group-hover:text-white">
                    {course.name}
                  </h2>
                </div>

                <p className="text-gray-600 mt-2 -ml-2 text-sm group-hover:text-white">
                  {course.description}
                </p>

                <p className="absolute bottom-6 left-6 text-sm text-gray-700 group-hover:text-white -mb-1">
                  Modules: <strong>{course.modules?.length || 0}</strong>
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* MODULE PANEL */}
        <AnimatePresence>
          {showModulePopup && selectedCourse && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-96 bg-white p-6 overflow-y-auto z-50"
            >
              <button
                onClick={() => setShowModulePopup(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-black"
              >
                <FaTimes size={22} />
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedCourse.name}
              </h2>
              <p className="text-gray-600 mb-4">{selectedCourse.description}</p>

              <button
                onClick={() => setShowCreateModulePopup(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#1B0138] text-white rounded-lg shadow hover:bg-[#6A0DAD]"
              >
                <FaPlus /> Create Module
              </button>

              <div className="mt-5 max-h-[70vh] overflow-y-auto pr-2">
                {selectedCourse.modules?.length > 0 ? (
                  selectedCourse.modules.map((mod) => (
                    <div
                      key={mod.id}
                      className="p-4 bg-gray-100 rounded-lg mb-3 shadow relative"
                    >
                      <h3 className="font-semibold text-gray-800">
                        {mod.name}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {mod.description}
                      </p>
                      <p className="text-gray-500 text-xs mt-2">
                        Created: {new Date(mod.createdAt).toLocaleDateString()}
                      </p>

                      <button
                        onClick={() => confirmDeleteModule(mod.id)}
                        className="absolute top-3 right-3 text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 mt-3">No modules created yet.</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CREATE MODULE POPUP */}
        <AnimatePresence>
          {showCreateModulePopup && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl p-6 z-50"
            >
              <button
                onClick={() => setShowCreateModulePopup(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-black"
              >
                <FaTimes size={22} />
              </button>

              <h2 className="text-2xl font-bold mb-4">Create Module</h2>

              <label className="text-gray-700">Module Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 mt-1 mb-3 border rounded"
                value={newModuleName}
                onChange={(e) => setNewModuleName(e.target.value)}
              />

              <label className="text-gray-700">Description</label>
              <textarea
                className="w-full px-3 py-2 mt-1 border rounded"
                rows="4"
                value={newModuleDescription}
                onChange={(e) => setNewModuleDescription(e.target.value)}
              ></textarea>

              <button
                onClick={addModule}
                className="mt-4 w-full bg-[#1B0138] text-white py-2 rounded shadow hover:bg-blue-900"
              >
                Add Module
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🔥 DELETE CONFIRMATION POPUP */}
        <AnimatePresence>
          {deleteTarget !== null && (
            <>
              {/* Black Blur Overlay */}
              <motion.div
                className="fixed inset-0 backdrop-blur-sm bg-transparent z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Popup */}
              <motion.div
                className="fixed inset-0 flex items-center justify-center z-50"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
              >
                <div className="bg-white px-8 py-6 rounded-xl shadow-2xl text-center w-80">
                  <h2 className="text-xl font-bold mb-3">Delete Module?</h2>
                  <p className="text-gray-600 mb-5">
                    Are you sure you want to delete this module? This cannot be
                    undone.
                  </p>

                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setDeleteTarget(null)}
                      className="px-4 py-2 bg-gray-300 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={deleteModule}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Modules;
