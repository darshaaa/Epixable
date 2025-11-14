import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "../Auth/LoginPage";
import RegisterPage from "../Auth/RegisterPage";
import AdminDashboard from "../Admin/AdminDashboard";
import KnowledgeMaterials from "../Admin/KnowledgeMaterials";
import Attendance from "../Admin/Attendance";
import Courses from "../Admin/Courses";
import Batch from "../Admin/Batch";
import AdminStudentCreate from "../Admin/AdminStudentCreate";
import AdminStudentList from "../Admin/AdminStudentList";
import AdminRecordedVideos from "../Admin/AdminRecordedVideos";
import Module from "../Admin/Module";

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
      <Route path="/admin/courses" element={<Courses />} />
      <Route path="/admin/batch" element={<Batch />} />
      <Route path="/admin/student/create" element={<AdminStudentCreate />} />
      <Route path="/admin/student/list" element={<AdminStudentList />} />
      <Route path="/admin/videos" element={<AdminRecordedVideos />} />
      <Route path="/admin/module" element={<Module />} />
    </Routes>
  );
}

export default MainRouter;
