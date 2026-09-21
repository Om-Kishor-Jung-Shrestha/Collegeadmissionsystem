// import { Navigate, Outlet } from "react-router-dom";

// import { useAppSelector } from "@/app/store/hooks";

// export function GuestRoute() {
//   const user = useAppSelector(
//     (state) => state.auth.user,
//   );

//   if (user) {
//     const isAdmin =
//       user.role === "admin" ||
//       user.role === "superadmin";

//     if (isAdmin) {
//       return (
//         <Navigate
//           to="/admin/dashboard"
//           replace
//         />
//       );
//     }

//     return (
//       <Navigate
//         to="/"
//         replace
//       />
//     );
//   }

//   return <Outlet />;
// }


import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "@/app/store/hooks";

export function GuestRoute() {
  const user = useAppSelector((state) => state.auth.user);

  console.log("GUEST ROUTE USER:", user);

  if (user) {
    console.log("GUEST ROUTE: USER FOUND -> DASHBOARD");

    return <Navigate to="/dashboard" replace />;
  }

  console.log("GUEST ROUTE: NO USER -> GUEST PAGE");

  return <Outlet />;
}
