import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";

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
      url: URL.createObjectURL(videoFile), // temporary local preview
    };

    setVideos([newVideo, ...videos]);
    setTitle("");
    setDescription("");
    setVideoFile(null);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-[#1B0138] mb-6">
          📹 Recorded Videos
        </h1>

        {/* Upload Form */}
        <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-xl mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Upload New Video
          </h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Video Title:
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter video title"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B0138]"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Description (optional):
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter video description"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B0138]"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Choose Video File:
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
                className="w-full border rounded-lg p-2 cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1B0138] text-white font-semibold py-2 rounded-xl hover:bg-[#2a065c] transition duration-200"
            >
              Upload Video
            </button>
          </form>
        </div>

        {/* Uploaded Videos List */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Uploaded Videos
          </h2>

          {videos.length === 0 ? (
            <p className="text-gray-500">No videos uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                >
                  <video
                    src={video.url}
                    controls
                    className="w-full h-48 object-cover"
                  ></video>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-[#1B0138]">
                      {video.title}
                    </h3>
                    {video.description && (
                      <p className="text-gray-600 text-sm mt-1">
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
