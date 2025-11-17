import React, { useState, useEffect } from "react";
import { FaSearch, FaTrash, FaTimes, FaBook } from "react-icons/fa"; // Added FaBook as logo
import AdminSidebar from "./AdminSidebar";

const KnowledgeMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [file, setFile] = useState(null);
  const [search, setSearch] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedModule, setSelectedModule] = useState("");

  const courses = ["B.Com", "BBA", "MBA"];
  const modules = ["Module 1", "Module 2", "Module 3", "Module 4"];

  useEffect(() => {
    const saved = localStorage.getItem("knowledgeMaterials");
    if (saved) setMaterials(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("knowledgeMaterials", JSON.stringify(materials));
  }, [materials]);

  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setShowPopup(true);
    }
  };

  const handleFinalUpload = () => {
    if (!selectedCourse || !selectedModule) {
      alert("Please select both Course and Module");
      return;
    }

    const newMaterial = {
      name: file.name,
      date: new Date().toLocaleDateString("en-GB"),
      course: selectedCourse,
      module: selectedModule,
    };

    const updated = [newMaterial, ...materials];
    setMaterials(updated);

    setFile(null);
    setShowPopup(false);
    setSelectedCourse("");
    setSelectedModule("");
    document.getElementById("fileInput").value = "";
  };

  const handleDelete = (index) => {
    const updated = materials.filter((_, i) => i !== index);
    setMaterials(updated);
  };

  const filtered = materials.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-white relative overflow-hidden">
      <AdminSidebar />

      <div className="flex-1 min-h-screen p-8">
        {/* Page Header with Logo */}
        <div className="mb-6 flex items-center gap-4 mt-8">
          <div className="bg-[#1B0138] p-3 rounded-xl text-white inline-flex items-center justify-center">
            <FaBook size={20} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Knowledge Materials
          </h1>
        </div>

        {/* Upload & Search Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm relative mt-15 border border-gray-500">

          <div className="flex justify-between items-center mb-8">
            <input
              id="fileInput"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={handleUploadClick}
              className="ml-8 bg-[#1B0138] hover:bg-[#30015f] text-white font-semibold px-6 py-3 rounded-2xl shadow-md transition-all duration-200"
            >
              + Upload Files
            </button>

            <div className="relative w-80 ml-auto">
              <FaSearch className="absolute left-4 top-3 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#e3ece8]  rounded-full pl-10 pr-4 py-2 text-sm outline-none placeholder:text-gray-500"
              />
            </div>

            <div className="w-36"></div>
          </div>

          <div className="grid grid-cols-4 font-bold text-black border-b border-gray-400 pb-3 mb-2 pl-10">
            <h3>File name</h3>
            <h3>Course</h3>
            <h3>Module</h3>
            <h3 className="text-right pr-15">Date of upload</h3>
          </div>

          {filtered.length === 0 ? (
            <p className="text-gray-500 text-center mt-6">
              No files uploaded yet.
            </p>
          ) : (
            filtered.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-4 items-center border-b border-gray-200 py-3 text-[15px] pl-10"
              >
                <p
                  className="text-black font-medium truncate max-w-[230px]"
                  title={item.name}
                >
                  {item.name}
                </p>
                <p className="text-gray-700">{item.course}</p>
                <p className="text-gray-700">{item.module}</p>
                <div className="flex items-center justify-end gap-4 pr-15">
                  <span className="text-black">{item.date}</span>
                  <FaTrash
                    className="text-red-500 cursor-pointer hover:scale-110 transition"
                    onClick={() => handleDelete(i)}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {showPopup && (
          <div
            className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-6 w-[380px] border border-gray-200 animate-slideDown z-50`}
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-black">
                Upload File Details
              </h2>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-500 hover:text-black"
              >
                <FaTimes />
              </button>
            </div>

            <div className="mb-3">
              <label className="block font-semibold mb-1 text-gray-700">
                Select Course
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
              >
                <option value="">-- Choose Course --</option>
                {courses.map((course, i) => (
                  <option key={i} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label className="block font-semibold mb-1 text-gray-700">
                Select Module
              </label>
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
              >
                <option value="">-- Choose Module --</option>
                {modules.map((module, i) => (
                  <option key={i} value={module}>
                    {module}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleFinalUpload}
              className="w-full bg-[#52057B] hover:bg-[#6A0DAD] text-white font-semibold py-2 rounded-lg transition shadow-sm"
            >
              Upload
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          0% {
            transform: translate(-50%, -70%);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, -50%);
            opacity: 1;
          }
        }
        .animate-slideDown {
          animation: slideDown 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default KnowledgeMaterials;
