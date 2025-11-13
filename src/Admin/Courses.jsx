import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";

const Courses = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: "React Basics", description: "Learn fundamentals of React." },
    { id: 2, name: "Node.js Mastery", description: "Backend development with Node.js and Express." },
  ]);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [newCourse, setNewCourse] = useState({ name: "", description: "" });
  const [editingCourse, setEditingCourse] = useState(null);

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.name || !newCourse.description) return alert("Please fill all fields!");
    setCourses([...courses, { id: Date.now(), ...newCourse }]);
    setNewCourse({ name: "", description: "" });
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setNewCourse({ name: course.name, description: course.description });
  };

  const handleUpdateCourse = (e) => {
    e.preventDefault();
    setCourses(
      courses.map((c) =>
        c.id === editingCourse.id ? { ...c, name: newCourse.name, description: newCourse.description } : c
      )
    );
    setEditingCourse(null);
    setNewCourse({ name: "", description: "" });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-[#1B0138] mb-6">Courses</h1>

        {/* Dropdown */}
        <div className="mb-6">
          <label className="font-semibold">Select Course: </label>
          <select
            className="ml-3 p-2 border rounded-lg"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">-- Choose a Course --</option>
            {courses.map((course) => (
              <option key={course.id} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        {/* Add / Edit Form */}
        <form
          onSubmit={editingCourse ? handleUpdateCourse : handleAddCourse}
          className="bg-gray-300 p-6 rounded-xl shadow-md mb-6 w-full max-w-lg"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingCourse ? "Edit Course" : "Add New Course"}
          </h2>

          <input
            type="text"
            placeholder="Course Name"
            className="w-full p-2 border rounded-lg mb-3"
            value={newCourse.name}
            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
          />
          <textarea
            placeholder="Course Description"
            className="w-full p-2 border rounded-lg mb-3"
            value={newCourse.description}
            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
          ></textarea>

          <button
            type="submit"
            className="bg-[#1B0138] text-white px-4 py-2 rounded-lg hover:bg-[#3a006b]"
          >
            {editingCourse ? "Update Course" : "Add Course"}
          </button>
        </form>

        {/* Course List */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Course List</h2>
          {courses.length === 0 ? (
            <p>No courses added yet.</p>
          ) : (
            <ul className="space-y-4">
              {courses.map((course) => (
                <li
                  key={course.id}
                  className="p-4 border rounded-lg flex justify-between items-start"
                >
                  <div>
                    <h3 className="font-bold text-lg">{course.name}</h3>
                    <p className="text-gray-600">{course.description}</p>
                  </div>
                  <button
                    onClick={() => handleEditCourse(course)}
                    className="text-[#1B0138] font-semibold hover:underline"
                  >
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
