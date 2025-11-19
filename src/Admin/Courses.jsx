import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";

const SAMPLE_COURSES = [
  {
    id: 1,
    name: "React Basics",
    description: "Learn fundamentals of React and building interactive UIs.",
    duration: "4 Weeks",
    students: 12,
    icon: "⚛️",
    details: [
      "Component-Based Architecture",
      "Hooks",
      "Routing",
      "API Integration",
    ],
    modules: [],
  },
  {
    id: 2,
    name: "Node.js Mastery",
    description: "Backend development with Node.js, Express and databases.",
    duration: "6 Weeks",
    students: 8,
    icon: "⚡",
    details: [
      "Async Programming",
      "Express Framework",
      "API Design",
      "Database Integration",
    ],
    modules: [],
  },
  {
    id: 3,
    name: "Business and Management",
    description: "Teaches how to manage teams, projects and organizations.",
    duration: "1 Year",
    students: 25,
    icon: "💼",
    details: [
      "Strategic Planning",
      "Financial Accounting",
      "Organizational Behavior",
      "Marketing",
    ],
    modules: [],
  },
  {
    id: 4,
    name: "Cyber Security",
    description: "Protect systems and data against threats.",
    duration: "12 Weeks",
    students: 18,
    icon: "🛡️",
    details: [
      "Network Security",
      "Ethical Hacking",
      "Cryptography",
      "Forensics",
    ],
    modules: [],
  },
  {
    id: 5,
    name: "Data Science",
    description: "Master Python and ML algorithms.",
    duration: "10 Weeks",
    students: 30,
    icon: "📊",
    details: ["Python", "Machine Learning", "Visualization"],
    modules: [],
  },
];

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [closing, setClosing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    duration: "",
  });

  // DELETE CONFIRMATION POPUP STATE
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // LOAD COURSES
  useEffect(() => {
    const saved = localStorage.getItem("coursesData");

    if (!saved) {
      localStorage.setItem("coursesData", JSON.stringify(SAMPLE_COURSES));
      setCourses(SAMPLE_COURSES);
    } else {
      setCourses(JSON.parse(saved));
    }
  }, []);

  const saveToLocalStorage = (updated) => {
    localStorage.setItem("coursesData", JSON.stringify(updated));
    setCourses(updated);
  };

  // ADD COURSE
  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.name || !newCourse.description || !newCourse.duration)
      return alert("Please fill all fields!");

    const item = {
      id: Date.now(),
      ...newCourse,
      students: Math.floor(Math.random() * 30),
      icon: "🎓",
      details: ["Custom detail 1", "Custom detail 2"],
      modules: [],
    };

    const updated = [...courses, item];
    saveToLocalStorage(updated);

    setShowForm(false);
    setNewCourse({ name: "", description: "", duration: "" });
  };

  // SHOW DELETE CONFIRMATION
  const confirmDeleteCourse = (e, id) => {
    e.stopPropagation();
    setDeleteId(id);
    setShowDeletePopup(true);
  };

  // DELETE FINAL
  const handleDeleteCourse = () => {
    const updated = courses.filter((course) => course.id !== deleteId);
    saveToLocalStorage(updated);
    setShowDeletePopup(false);
    setDeleteId(null);
  };

  const closeModal = (setter) => {
    setClosing(true);
    setTimeout(() => {
      setter(false);
      setClosing(false);
      setSelectedCourse(null);
    }, 400);
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-300 font-poppins">
      <AdminSidebar />

      <div className="flex-1 p-8 h-full overflow-y-auto scroll-smooth">
        {/* HEADER */}
        <div className="flex items-center gap-4 my-6 mt-1">
          <div className="bg-[#1B0138] p-3 rounded-xl text-white flex items-center justify-center ">
            <span className="text-xl">🎓</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1B0138]">Courses</h1>
        </div>

        {/* SEARCH / CREATE */}
        <div className="mt-21">
          <div className="bg-white p-6 rounded-xl">
            <div className="flex justify-between items-center mb-10">
              <button
                onClick={() => setShowForm(true)}
                className="bg-[#271040] text-white px-6 py-3 rounded-lg hover:bg-[#30015f] transition-all"
              >
                ➕ Create Course
              </button>

              <div className="relative w-60 max-w-sm bg-[#e3ece8] ">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-8 p-3 pl-12 border border-gray-300 rounded-xl focus:ring-[#1B0138] focus:border-[#1B0138]"
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

            {/* COURSE CARDS */}
            <div className="grid md:grid-cols-4 gap-6">
              {filteredCourses.length === 0 ? (
                <p className="col-span-4 text-center text-gray-500 py-10">
                  No courses found matching "{searchTerm}".
                </p>
              ) : (
                filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => {
                      setSelectedCourse(course);
                      setShowOverview(true);
                    }}
                    className="relative group cursor-pointer h-56 p-6 rounded-xl 
                   transition-all duration-300 bg-white border border-gray-300
                   hover:scale-105 hover:border-2 
                   hover:bg-orange-600"
                  >
                    <div
                      className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center 
                        rounded-lg bg-gray-200 group-hover:bg-white transition"
                    >
                      <span className="text-2xl group-hover:text-white">
                        {course.icon}
                      </span>
                    </div>

                    {/* DELETE */}
                    <button
                      onClick={(e) => confirmDeleteCourse(e, course.id)}
                      className="absolute top-4 right-4 text-gray-400  
                     group-hover:text-white transition opacity-0 group-hover:opacity-100"
                      title="Delete Course"
                    >
                      ✖
                    </button>

                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-lg font-bold mb-1 group-hover:text-white">
                        {course.name}
                      </h3>
                      <p className="text-sm opacity-90 group-hover:text-white">
                        {course.description}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* OVERVIEW POPUP */}
        {showOverview && selectedCourse && (
          <>
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => closeModal(setShowOverview)}
            ></div>

            <div className="fixed inset-0 flex justify-end items-start z-50 pt-20">
              <div
                className={`bg-white rounded-l-2xl shadow-2xl p-8 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 transition duration-300 ${
                  closing
                    ? "translate-x-full opacity-0"
                    : "translate-x-0 opacity-100"
                }`}
              >
                <div className="flex gap-4 items-center mb-4">
                  <span className="text-3xl">{selectedCourse.icon}</span>
                  <h2 className="text-2xl font-bold">{selectedCourse.name}</h2>
                </div>

                <p className="mb-4 text-gray-700">
                  {selectedCourse.description}
                </p>

                <p className="mb-2 font-semibold">
                  Duration:{" "}
                  <span className="font-normal">{selectedCourse.duration}</span>
                </p>

                <p className="mb-4 font-semibold">
                  Students Enrolled:{" "}
                  <span className="font-normal">{selectedCourse.students}</span>
                </p>

                <h3 className="text-lg font-bold mb-2 text-[#1B0138]">
                  Key Topics:
                </h3>
                <ul className="list-disc pl-5 space-y-1 mb-6 text-gray-700">
                  {selectedCourse.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>

                <button
                  onClick={() => closeModal(setShowOverview)}
                  className="bg-[#1B0138] text-white px-6 py-3 rounded-xl w-full hover:bg-[#30015f]"
                >
                  Close
                </button>
              </div>
            </div>
          </>
        )}

        {/* CREATE COURSE POPUP */}
        {showForm && (
          <>
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => closeModal(setShowForm)}
            ></div>

            <div className="fixed top-0 right-0 h-full z-50 flex">
              <div
                className={`bg-white shadow-2xl p-8 w-96 transition-transform duration-300 ease-in-out ${
                  closing ? "translate-x-full" : "translate-x-0"
                }`}
              >
                <h2 className="text-2xl font-bold mb-4 text-[#1B0138]">
                  Create New Course
                </h2>

                <form onSubmit={handleAddCourse} className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-1">
                      Course Name
                    </label>
                    <input
                      type="text"
                      value={newCourse.name}
                      onChange={(e) =>
                        setNewCourse({ ...newCourse, name: e.target.value })
                      }
                      className="w-full border px-4 py-2 rounded-lg focus:ring-[#1B0138]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">
                      Description
                    </label>
                    <textarea
                      value={newCourse.description}
                      onChange={(e) =>
                        setNewCourse({
                          ...newCourse,
                          description: e.target.value,
                        })
                      }
                      className="w-full border px-4 py-2 rounded-lg focus:ring-[#1B0138]"
                      rows="3"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={newCourse.duration}
                      onChange={(e) =>
                        setNewCourse({
                          ...newCourse,
                          duration: e.target.value,
                        })
                      }
                      className="w-full border px-4 py-2 rounded-lg focus:ring-[#1B0138]"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="bg-[#1B0138] text-white px-6 py-3 rounded-xl w-full"
                    >
                      Save Course
                    </button>

                    <button
                      type="button"
                      onClick={() => closeModal(setShowForm)}
                      className="bg-gray-300 px-6 py-3 rounded-xl w-full"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}

        {/* DELETE CONFIRMATION POPUP */}
        {showDeletePopup && (
          <>
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"></div>

            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-2xl w-80">
                <h3 className="text-xl font-bold text-red-600 mb-3">
                  Confirm Delete
                </h3>

                <p className="text-gray-700 mb-5">
                  Are you sure you want to delete this course?
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={handleDeleteCourse}
                    className="bg-red-600 text-white px-5 py-2 rounded-lg w-full hover:bg-red-700"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => setShowDeletePopup(false)}
                    className="bg-gray-300 px-5 py-2 rounded-lg w-full"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        .font-poppins { font-family: 'Poppins', sans-serif; }
      `}</style>
    </div>
  );
};

export default Courses;
