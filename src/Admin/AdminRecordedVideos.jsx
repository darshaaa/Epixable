import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { FaUpload, FaVideo, FaTimes } from "react-icons/fa";

const AdminRecordedVideos = () => {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();

    if (!title || !videoFile) {
      alert("Please enter a title and select a video file!");
      return;
    }

    const newVideo = {
      id: Date.now(),
      title,
      description,
      url: URL.createObjectURL(videoFile),
    };

    setVideos([newVideo, ...videos]);
    setTitle("");
    setDescription("");
    setVideoFile(null);

    if (e.target.elements.videoFile) {
      e.target.elements.videoFile.value = null;
    }
  };

  const handleDelete = (id) => {
    setVideos(videos.filter((video) => video.id !== id));
  };

  return (
    <div className="flex bg-gray-300  min-h-screen">
      {/* Sidebar stays fixed */}
      <div className="flex-shrink-0 sticky top-0 h-screen">
        <AdminSidebar />
      </div>

      {/* Main content scrolls independently */}
      <div className="flex-1 p-8 lg:p-12 overflow-y-auto scrollbar-thin scrollbar-thumb-[#2E0057]/50 scrollbar-track-[#EDE7F6]/40 -mt-3">
        <h1 className="text-4xl font-bold text-[#2E0057] mb-8 flex items-center">
          <FaVideo className="text-3xl mr-3 text-[#2E0057]" />
          Recorded Content Hub
        </h1>

        {/* Upload Form */}
        <div className="bg-white rounded-3xl  border border-gray-100 p-8 w-full max-w-2xl mb-12 mt-22">
          <h2 className="text-2xl font-bold text-[#2E0057] mb-6 border-b pb-3 flex items-center">
            <FaUpload className="mr-2 text-xl" /> Upload New Video
          </h2>
          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Video Title: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Introduction to React Hooks"
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#2E0057]/20 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Description (optional):
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A brief summary of the video content..."
                rows="3"
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#2E0057]/20 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Choose Video File: <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="video/*"
                name="videoFile"
                onChange={(e) => setVideoFile(e.target.files[0])}
                className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#E9D5FF] file:text-[#2E0057] hover:file:bg-[#D8B4FE] cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2d1244] text-white font-bold py-3 rounded-xl hover:bg-[#30015f] transition duration-300 shadow-lg hover:shadow-2xl transform hover:scale-[1.02]"
            >
              <FaUpload className="inline mr-2" /> Publish Video
            </button>
          </form>
        </div>

        {/* Uploaded Videos List */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold text-[#2E0057] mb-6">
            All Uploaded Videos ({videos.length})
          </h2>

          {videos.length === 0 ? (
            <div className="bg-white p-6 rounded-xl  text-center">
              <p className="text-gray-500 text-lg font-medium">
                🚀 Ready to upload your first video? Use the form above!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-h-[70vh] overflow-y-auto p-2">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 hover:shadow-3xl transition duration-300 transform hover:scale-[1.03] relative"
                >
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-90 hover:opacity-100 transition z-10"
                    title="Delete Video"
                  >
                    <FaTimes className="text-sm" />
                  </button>
                  <video
                    src={video.url}
                    controls
                    className="w-full h-56 object-cover bg-black"
                  ></video>
                  <div className="p-5">
                    <h3 className="text-xl font-extrabold text-[#2E0057] truncate">
                      {video.title}
                    </h3>
                    {video.description && (
                      <p className="text-gray-600 text-base mt-2 line-clamp-2">
                        {video.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRecordedVideos;
