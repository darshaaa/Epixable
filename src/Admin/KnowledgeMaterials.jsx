// import React, { useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import AdminSidebar from "./AdminSidebar";

// const KnowledgeMaterials = () => {
//   const [materials, setMaterials] = useState([]);
//   const [file, setFile] = useState(null);
//   const [search, setSearch] = useState("");

//   const handleFileChange = (e) => setFile(e.target.files[0]);

//   const handleUpload = () => {
//     if (!file) return alert("Please choose a file to upload");
//     const newMaterial = {
//       name: file.name,
//       date: new Date().toLocaleDateString("en-GB"),
//     };
//     setMaterials([newMaterial, ...materials]);
//     setFile(null);
//     document.getElementById("fileInput").value = "";
//   };

//   const filtered = materials.filter((m) =>
//     m.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="flex min-h-screen bg-[#f5f3fa]">
//       <AdminSidebar />

//       <div className="flex-1 bg-[#f5f3fa] min-h-screen p-8">
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold text-gray-800">Page / Dashboard</h2>
//           <h1 className="text-3xl font-bold text-black">Knowledge Materials</h1>
//         </div>

//         <div className="bg-yellow-500 rounded-2xl shadow-md p-6 mb-8 flex justify-between items-center">
//           <div>
//             <h3 className="text-lg font-semibold text-[#52057B]">Upload Material</h3>
//             <p className="text-sm text-gray-500">Upload PDF or Video files</p>
//           </div>

//           <div className="flex items-center gap-3">
//             <input
//               id="fileInput"
//               type="file"
//               accept=".pdf,video/*"
//               onChange={handleFileChange}
//               className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
//             />
//             <button
//               onClick={handleUpload}
//               className="bg-[#52057B] hover:bg-[#890596] text-white px-4 py-2 rounded-lg transition"
//             >
//               Upload
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-md p-6">
//           <div className="flex justify-end mb-6">
//             <div className="relative w-72">
//               <FaSearch className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full bg-[#F5F5F5] rounded-full pl-10 pr-4 py-2 text-sm outline-none"
//               />
//             </div>
//           </div>

//           <div className="flex justify-between font-bold text-black border-b border-gray-200 pb-3 mb-2">
//             <span>File name</span>
//             <span>Date of upload</span>
//           </div>

//           {filtered.length === 0 ? (
//             <p className="text-gray-500 text-center mt-6">No files uploaded yet.</p>
//           ) : (
//             filtered.map((item, i) => (
//               <div
//                 key={i}
//                 className="flex justify-between items-center py-3 border-b border-gray-200 text-gray-700 text-sm"
//               >
//                 <span>{item.name}</span>
//                 <span>{item.date}</span>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KnowledgeMaterials;
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";

const KnowledgeMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [file, setFile] = useState(null);
  const [search, setSearch] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = () => {
    if (!file) return alert("Please choose a file to upload");
    const newMaterial = {
      name: file.name,
      date: new Date().toLocaleDateString("en-GB"),
    };
    setMaterials([newMaterial, ...materials]);
    setFile(null);
    document.getElementById("fileInput").value = "";
  };

  const filtered = materials.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#f5f3fa]">
      <AdminSidebar />

      <div className="flex-1 bg-[#f5f3fa] min-h-screen p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Page / Dashboard</h2>
          <h1 className="text-3xl font-bold text-black">Knowledge Materials</h1>
        </div>

        {/* Upload Section */}
        <div className="bg-yellow-500 rounded-2xl shadow-md p-6 mb-8 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-[#52057B]">Upload Material</h3>
            <p className="text-sm text-gray-800">Upload PDF or Video files</p>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="fileInput"
              type="file"
              accept=".pdf,video/*"
              onChange={handleFileChange}
              className="bg-white border border-gray-400 rounded-lg px-3 py-2 text-sm text-gray-700 cursor-pointer"
            />
            <button
              onClick={handleUpload}
              className="bg-[#52057B] hover:bg-[#890596] text-white px-4 py-2 rounded-lg transition"
            >
              Upload
            </button>
          </div>
        </div>

        {/* File Table */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          {/* Search */}
          <div className="flex justify-end mb-6">
            <div className="relative w-72">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-gray-200 rounded-full pl-10 pr-4 py-2 text-sm outline-none"
              />
            </div>
          </div>

          {/* Header Row - orange */}
          <div className="flex justify-between font-bold text-white bg-orange-500 rounded-lg px-4 py-3 mb-3">
            <span>File name</span>
            <span>Date of upload</span>
          </div>

          {/* File List */}
          {filtered.length === 0 ? (
            <p className="text-gray-500 text-center mt-6">No files uploaded yet.</p>
          ) : (
            filtered.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-3 border-b border-gray-200 text-gray-700 text-sm"
              >
                <span>{item.name}</span>
                <span>{item.date}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeMaterials;
