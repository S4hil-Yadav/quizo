import { ImSpinner2 } from "react-icons/im";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState } from "react";
import LoginPage from "./pages/LoginPaget";
import { excludeSidebarRoutes, excludeNavbarRoutes } from "./lib/routes";
import SignupPage from "./pages/SignupPage";
import { useGetAuthQuery } from "./lib/queries/auth.queries";
import { useQueryClient } from "@tanstack/react-query";
import Header from "./components/Header";
import DashboardPage from "./pages/DashboardPage";
import CreateQuizPage from "./pages/CreateQuizPage";
import EditQuizPage from "./pages/EditQuizPage";
import EditProfile from "./components/EditProfie";

export default function App() {
  const { isLoading, isSuccess } = useGetAuthQuery();

  const location = useLocation(),
    navLoc = location.state?.backgroundLocation
      ? location.state?.backgroundLocation.pathname
      : location.pathname;

  const includeNavbar = !excludeNavbarRoutes.includes(
    navLoc.split("/").filter(Boolean)[0] || "",
  );
  const includeSidebar = !excludeSidebarRoutes.includes(
    navLoc.split("/").filter(Boolean)[0] || "",
  );

  const [showNavbar, setShowNavbar] = useState(false);

  if (isLoading)
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <ImSpinner2 className="size-12 animate-spin text-violet-700" />
      </div>
    );

  return (
    <div className="flex min-h-screen">
      {includeNavbar && (
        <Navbar showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
      )}
      <div className="flex flex-1 flex-col">
        {includeNavbar && <Header setShowNavbar={setShowNavbar} />}
        <div className="flex flex-1">
          <div className="flex-1 overflow-auto bg-white">
            <PageRoutes isAuthUser={isSuccess} />
          </div>
          {includeSidebar && (
            <div className="hidden h-full w-60 bg-gray-100 lg:block" />
          )}
        </div>
      </div>
    </div>
  );
}

interface PageRoutesProps {
  isAuthUser: boolean;
}

function PageRoutes({ isAuthUser }: PageRoutesProps) {
  const queryClient = useQueryClient(),
    authUser: { _id: "string" } | undefined = queryClient.getQueryData([
      "authUser",
    ]);

  const location = useLocation(),
    pathRoot = location.pathname.split("/").filter(Boolean)[0];

  const bgLocation =
    !location.state?.bgLocation && pathRoot === "post"
      ? { pathname: "/home" }
      : !location.state?.bgLocation && pathRoot === "edit-profile"
        ? { pathname: "/profile/" + authUser?._id }
        : location.state?.bgLocation;

  return (
    <>
      <Routes location={bgLocation || location}>
        <Route
          path="/"
          element={isAuthUser ? <Navigate to="/dashboard" /> : <SignupPage />}
        />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/login"
          element={isAuthUser ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={isAuthUser ? <Navigate to="/" /> : <SignupPage />}
        />
        <Route
          path="/create-quiz"
          element={isAuthUser ? <CreateQuizPage /> : <Navigate to="/signup" />}
        />
        <Route
          path="/edit-quiz/:quizId"
          element={isAuthUser ? <EditQuizPage /> : <Navigate to="/signup" />}
        />
        <Route
          path="*"
          element={
            <div className="h-full text-center font-black">Page not found</div>
          }
        />
      </Routes>
      {bgLocation && (
        <Routes>
          <Route
            path="/profile"
            element={isAuthUser ? <EditProfile /> : <Navigate to="/signup" />}
          />
          <Route path="*" element />
        </Routes>
      )}
    </>
  );
}
