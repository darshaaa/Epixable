// // import React from "react";
// // import { Route, Routes, Navigate } from "react-router-dom";
// // import LoginPage from "../Auth/LoginPage";
// // import RegisterPage from "../Auth/RegisterPage";
// // import AdminDashboard from "../Admin/AdminDashboard";
// // import KnowledgeMaterials from "../Admin/KnowledgeMaterials";

// // function MainRouter() {
// //   return (
// //     <Routes>
// //       {/* Default route */}
// //       <Route path="/" element={<Navigate to="/login/admin" />} />

// //       {/* Admin Routes */}
// //        <Route path="/admindashboard" element={<AdminDashboard />} />
// //         <Route path="/knowledge" element={<KnowledgeMaterials/>} />
// //     </Routes>
// //   );
// // }

// // export default MainRouter;
// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import LoginPage from "../Auth/LoginPage";
// import RegisterPage from "../Auth/RegisterPage";
// import AdminDashboard from "../Admin/AdminDashboard";
// import KnowledgeMaterials from "../Admin/KnowledgeMaterials";

// function MainRouter() {
//   return (
//     <Routes>
//       {/* Default Route */}
//       <Route path="/" element={<Navigate to="/login/admin" replace />} />

//       {/* Auth Routes */}
//       <Route path="/login/:role" element={<LoginPage />} />
//       <Route path="/register/:role" element={<RegisterPage />} />

//       {/* Admin Routes */}
//       <Route path="/admin/dashboard" element={<AdminDashboard />} />
//       <Route path="/admin/materials" element={<KnowledgeMaterials />} />
//     </Routes>
//   );
// }

// export default MainRouter;
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "../Auth/LoginPage";
import RegisterPage from "../Auth/RegisterPage";
import AdminDashboard from "../Admin/AdminDashboard";
import KnowledgeMaterials from "../Admin/KnowledgeMaterials";
import Attendance from "../Admin/Attendance";

function MainRouter() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/login/admin" />} />

      {/* Auth Routes */}
      <Route path="/login/:role" element={<LoginPage />} />
      <Route path="/register/:role" element={<RegisterPage />} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/materials" element={<KnowledgeMaterials />} />
      <Route path="/admin/attendance" element={<Attendance />} />

    </Routes>
  );
}

export default MainRouter;
