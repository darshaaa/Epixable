import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";

const Courses = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "React Basics",
      description:
        "Learn fundamentals of React and building interactive user interfaces efficiently, focusing on component lifecycle and hooks.",
      duration: "4 Weeks",
      students: 12,
      icon: "⚛️",
      details: [
        "Component-Based Architecture",
        "State Management (Hooks)",
        "Routing with React Router",
        "API Integration",
      ],
    },
    {
      id: 2,
      name: "Node.js Mastery",
      description:
        "Backend development with Node.js, Express, and databases for scalable and high-performance applications.",
      duration: "6 Weeks",
      students: 8,
      icon: "⚡",
      details: [
        "Asynchronous Programming",
        "Express Framework",
        "RESTful API Design",
        "Database integration (MongoDB/SQL)",
      ],
    },
    {
      id: 3,
      name: "Business and Management",
      description:
        "Teaches students how to lead and manage teams, projects, and organizations effectively to achieve strategic goals.",
      duration: "1 Year",
      students: 25,
      icon: "💼",
      details: [
        "Strategic Planning",
        "Financial Accounting",
        "Organizational Behavior",
        "Marketing Fundamentals",
      ],
    },
    {
      id: 4,
      name: "Cyber Security",
      description:
        "Essential skills to protect digital systems and data against modern threats like malware, phishing, and denial-of-service attacks.",
      duration: "12 Weeks",
      students: 18,
      icon: "🛡️",
      details: [
        "Network Security",
        "Ethical Hacking",
        "Cryptography",
        "Incident Response and Forensics",
      ],
    },
    {
      id: 5,
      name: "Data Science",
      description: "Master Python and ML algorithms.",
      duration: "10 Weeks",
      students: 30,
      icon: "📊",
      details: ["Python Programming", "Machine Learning", "Data Visualization"],
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [closing, setClosing] = useState(false);

  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    duration: "",
  });

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
    };

    setCourses([...courses, item]);
    setShowForm(false);
    setNewCourse({ name: "", description: "", duration: "" });
  };

  const handleDeleteCourse = (e, id) => {
    e.stopPropagation();
    const updatedCourses = courses.filter((course) => course.id !== id);
    setCourses(updatedCourses);
  };

  const closeModal = (setter) => {
    setClosing(true);
    setTimeout(() => {
      setter(false);
      setClosing(false);
    }, 400);
  };

  return (
    <div className="flex h-screen bg-white font-poppins">
      <AdminSidebar />

      <div className="flex-1 p-8 h-full overflow-y-auto scroll-smooth">
        <div className="flex items-center gap-4 my-6">
          <div className="bg-[#1B0138] p-3 rounded-xl text-white flex items-center justify-center">
            <span className="text-xl">🎓</span>
          </div>
          <h1 className="text-3xl font-bold text-[#1B0138]">Courses</h1>
        </div>

        <div className="mt-12">
          <div className="bg-white p-6 rounded-xl shadow-inner border-1 border-[#52057B]">
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#271040] text-white px-6 py-3 rounded-lg hover:bg-[#30015f] transition-all mb-10"
            >
              ➕ Create Course
            </button>

            <div className="grid md:grid-cols-4 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => {
                    setSelectedCourse(course);
                    setShowOverview(true);
                  }}
                  className={`relative group cursor-pointer h-56 p-6 rounded-xl shadow-xl transition-all duration-300 bg-white
                  border border-gray-500 hover:scale-105 hover:border-2 hover:border-[#52057B] hover:shadow-2xl`}
                >
                  <div
                    className={`absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 group-hover:bg-white transition-colors duration-300`}
                  >
                    <span className="text-2xl group-hover:text-[#1B0138]">
                      {course.icon}
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleDeleteCourse(e, course.id)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 group-hover:text-red-400 transition-colors duration-300 opacity-0 group-hover:opacity-100"
                    title="Delete Course"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 112 0v6a1 1 0 11-2 0V8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-lg font-bold mb-1 leading-snug">
                      {course.name}
                    </h3>
                    <p className="text-sm opacity-90 transition-opacity duration-300 group-hover:opacity-80">
                      {course.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Course Overview Modal */}
        {showOverview && selectedCourse && (
          <div className="fixed inset-0 flex items-start justify-center z-50 pt-20">
            <div
              className={`bg-white rounded-2xl shadow-2xl p-8 w-11/12 md:w-2/3 lg:w-1/2 transition-transform duration-400 ease-in-out ${
                closing ? "-translate-y-96 opacity-0" : "translate-y-0 opacity-100"
              }`}
            >
              <div className="flex gap-4 items-center mb-4">
                <span className="text-3xl">{selectedCourse.icon}</span>
                <h2 className="text-2xl font-bold">{selectedCourse.name}</h2>
              </div>
              <p className="mb-4 text-gray-700">{selectedCourse.description}</p>
              <p className="mb-2 font-semibold">
                Duration: <span className="font-normal">{selectedCourse.duration}</span>
              </p>
              <p className="mb-4 font-semibold">
                Students Enrolled: <span className="font-normal">{selectedCourse.students}</span>
              </p>
              <ul className="list-disc pl-5 space-y-1 mb-6 text-gray-700">
                {selectedCourse.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
              <button
                onClick={() => closeModal(setShowOverview)}
                className="bg-[#1B0138] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-[#30015f] transition w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .font-poppins { font-family: 'Poppins', sans-serif; }
      `}</style>
    </div>
  );
};

export default Courses;
