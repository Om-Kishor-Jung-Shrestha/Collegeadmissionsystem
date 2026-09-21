// import { Navigate, Outlet, useLocation } from "react-router-dom";

// import { useAppSelector } from "@/app/store/hooks";

// export function ProtectedAdminRoute() {
//   const location = useLocation();

//   const user = useAppSelector(
//     (state) => state.auth.user,
//   );

//   if (!user) {
//     return (
//       <Navigate
//         to="/login"
//         replace
//         state={{
//           from: location.pathname,
//         }}
//       />
//     );
//   }

//   const isAdmin =
//     user.role === "admin" ||
//     user.role === "superadmin";

//   if (!isAdmin) {
//     return (
//       <Navigate
//         to="/"
//         replace
//       />
//     );
//   }

//   if (user.status !== "active") {
//     return (
//       <Navigate
//         to="/login"
//         replace
//       />
//     );
//   }

//   return <Outlet />;
// }


// import {
//   Navigate,
//   Outlet,
// } from "react-router-dom";

// import { useAppSelector } from "@/app/store/hooks";

// export function ProtectedAdminRoute() {
//   const user = useAppSelector(
//     (state) => state.auth.user,
//   );

//   if (!user) {
//     return (
//       <Navigate
//         to="/login"
//         replace
//       />
//     );
//   }

//   const isAdmin =
//     user.role === "admin" ||
//     user.role === "superadmin";

//   if (!isAdmin) {
//     return (
//       <Navigate
//         to="/dashboard"
//         replace
//       />
//     );
//   }

//   return <Outlet />;
// }


import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/app/store/hooks";

export function ProtectedAdminRoute() {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin =
    user.role === "admin" ||
    user.role === "superadmin";

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}