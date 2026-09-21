// import { Route, Routes } from "react-router-dom";

// import { PublicLayout } from "@/layouts/PublicLayout/PublicLayout";
// import { HomePage } from "@/pages/public/HomePage";
// import { AboutPage } from "@/pages/public/AboutPage";
// import { ProgramsPage } from "@/pages/public/ProgramsPage";
// import { ContactPage } from "@/pages/public/ContactPage";

// function App() {
//   return (
//     <Routes>
//       <Route element={<PublicLayout />}>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/programs" element={<ProgramsPage />} />
//         <Route path="/contact" element={<ContactPage />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;


import { Navigate, Route, Routes } from "react-router-dom";

import { PublicLayout } from "@/layouts/PublicLayout/PublicLayout";
import { AdminLayout } from "@/layouts/AdminLayout/AdminLayout";

import { HomePage } from "@/pages/public/HomePage";
import { AboutPage } from "@/pages/public/AboutPage";
import { ProgramsPage } from "@/pages/public/ProgramsPage";
import { ContactPage } from "@/pages/public/ContactPage";

import { LoginPage } from "@/pages/auth/LoginPage";
import { SignupPage } from "@/pages/auth/SignupPage";
import { VerifyOtpPage } from "@/pages/auth/VerifyOtpPage";

import { DashboardPage } from "@/pages/admin/DashboardPage";

import { ProtectedRoute } from "./routes/ProtectedRoute";
import { ProtectedAdminRoute } from "./routes/ProtectedAdminRoute";
import { GuestRoute } from "./routes/GuestRoute";

function App() {
  return (
    <Routes>
      {/* ==================== PUBLIC ROUTES ==================== */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/about" element={<AboutPage />} />

        <Route path="/programs" element={<ProgramsPage />} />

        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* ==================== GUEST ROUTES ==================== */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<SignupPage />} />

        <Route path="/verify-otp" element={<VerifyOtpPage />} />
      </Route>

      {/* ==================== AUTHENTICATED ROUTES ==================== */}
      {/* Accessible by user, admin and superadmin */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />
      </Route>

      {/* ==================== ADMIN ROUTES ==================== */}
      {/* Accessible only by admin and superadmin */}
      <Route element={<ProtectedAdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          {/* /admin -> /admin/dashboard */}
          <Route
            index
            element={
              <Navigate
                to="/admin/dashboard"
                replace
              />
            }
          />

          {/* Admin dashboard */}
          <Route
            path="dashboard"
            element={<DashboardPage />}
          />

          {/* Applications */}
          <Route
            path="applications"
            element={<div>Applications</div>}
          />

          {/* Programs */}
          <Route
            path="programs"
            element={<div>Programs</div>}
          />

          {/* Users */}
          <Route
            path="users"
            element={<div>Users</div>}
          />

          {/* Settings */}
          <Route
            path="settings"
            element={<div>Settings</div>}
          />
        </Route>
      </Route>

      {/* ==================== FALLBACK ==================== */}
      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;
