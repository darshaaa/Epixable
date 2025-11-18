import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTimes, FaSearch, FaBookOpen } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";

const Modules = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [showModulePopup, setShowModulePopup] = useState(false);
  const [showCreateModulePopup, setShowCreateModulePopup] = useState(false);

  const [newModuleName, setNewModuleName] = useState("");
  const [newModuleDescription, setNewModuleDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // -------------------------------
  // LOAD COURSES FROM LOCALSTORAGE
  // -------------------------------
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("courses")) || [];
    setCourses(stored);
  }, []);

  // -------------------------------
  // SAVE COURSES TO LOCALSTORAGE
  // -------------------------------
  const updateLocalStorage = (updated) => {
    localStorage.setItem("courses", JSON.stringify(updated));
    setCourses(updated);
  };

  // -------------------------------
  // OPEN COURSE (SHOW MODULES PANEL)
  // -------------------------------
  const openCourseModules = (course) => {
    setSelectedCourse(course);
    setShowModulePopup(true);
  };

  // -------------------------------
  // ADD MODULE TO SPECIFIC COURSE
  // -------------------------------
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

    // Clear inputs + close popup
    setNewModuleName("");
    setNewModuleDescription("");
    setShowCreateModulePopup(false);

    // Re-set selected course with fresh updated data
    setSelectedCourse(
      updatedCourses.find((c) => c.id === selectedCourse.id)
    );
  };

  // -------------------------------
  // FILTER COURSES BY SEARCH
  // -------------------------------
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-6 bg-gray-300 min-h-screen">
        {/* PAGE HEADER */}
        <div className="flex justify-between items-center mb-6 mt-3">
          <h1 className="text-3xl font-bold text-[#1B0138]">🎓Modules</h1>

          
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Search course..."
              className="w-full px-4 py-2 rounded-lg border shadow-sm focus:ring focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-3 text-gray-500" />
          </div>
        </div>

        {/* COURSE LIST */}
        <div className="bg-white p-6 rounded-xl mt-25">
            <div className="flex justify-between items-center mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.03 }}
              className="p-5 rounded-xl  bg-white cursor-pointer border-l-4 border-r-1 border-[#1B0138]"
              onClick={() => openCourseModules(course)}
            >
              <div className="flex items-center gap-3">
                <FaBookOpen className="text-[#1B0138] text-xl" />
                <h2 className="font-bold text-lg text-gray-900">{course.name}</h2>
              </div>
              <p className="text-gray-600 mt-2 text-sm">{course.description}</p>
              <p className="mt-3 text-sm text-gray-700">
                Modules: <strong>{course.modules?.length || 0}</strong>
              </p>
            </motion.div>
          ))}
        </div>
        </div>
        </div>

        {/* RIGHT-SIDE MODULES POPUP */}
        <AnimatePresence>
          {showModulePopup && selectedCourse && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 80 }}
              className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl p-6 overflow-y-auto z-50"
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setShowModulePopup(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-black"
              >
                <FaTimes size={22} />
              </button>

              {/* COURSE HEADER */}
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedCourse.name}
              </h2>
              <p className="text-gray-600 mb-4">{selectedCourse.description}</p>

              {/* CREATE MODULE BUTTON */}
              <button
                onClick={() => setShowCreateModulePopup(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#1B0138] text-white rounded-lg shadow hover:bg-[#6A0DAD]"
              >
                <FaPlus /> Create Module
              </button>

              {/* MODULE LIST (SCROLLABLE) */}
              <div className="mt-5 max-h-[70vh] overflow-y-auto pr-2">
                {selectedCourse.modules?.length > 0 ? (
                  selectedCourse.modules.map((mod) => (
                    <div
                      key={mod.id}
                      className="p-4 bg-gray-100 rounded-lg mb-3 shadow"
                    >
                      <h3 className="font-semibold text-gray-800">{mod.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {mod.description}
                      </p>
                      <p className="text-gray-500 text-xs mt-2">
                        Created: {new Date(mod.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 mt-3">No modules created yet.</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CREATE MODULE SLIDE POPUP */}
        <AnimatePresence>
          {showCreateModulePopup && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 80 }}
              className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl p-6 z-50"
            >
              {/* CLOSE */}
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
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded shadow hover:bg-blue-700"
              >
                Add Module
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Modules;