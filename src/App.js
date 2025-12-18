import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Spinner from "./components/spinner/spinner.component";

import "./styles/index.scss";
import AccessRequired from "./pages/Unauthorized/AccessRequired";
import useToast from "./hooks/useToast";

/** LAYOUTS */

/** PAGES */
const Login = lazy(() => import("./pages/Login/Login"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
// const Notification = lazy(() => import("pages/Notification/Notification"));

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  /** DISABLE/RESTRICT DEVELOPER OPTION - IF IT'S NOT 'DEV' ENVIRONMENT */
  useEffect(() => {
    if (
      process.env.REACT_APP_MODE === "production" ||
      process.env.REACT_APP_MODE === "testing"
    ) {
      const checkDevToolsShortcuts = (e) => {
        return (
          e.key === "F12" || // Blocks F12 key
          (e.ctrlKey && e.shiftKey && e.key === "I") || // Block Ctrl + Shift + I
          (e.ctrlKey && e.shiftKey && e.key === "J") || // Block Ctrl + Shift + J
          (e.ctrlKey && e.shiftKey && e.key === "C") || // Block Ctrl + Shift + C
          (e.ctrlKey && e.key === "U") // Block Ctrl + U
        );
      };

      const handleKeyDown = (e) => {
        if (checkDevToolsShortcuts(e)) {
          e.preventDefault();
        }
      };

      const handleContextMenu = (e) => {
        e.preventDefault();
      };

      /** Attach the keydown & contextmenu event listener to block right-click & developer tool shortcuts */
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("contextmenu", handleContextMenu);

      /** Cleanup the event listeners when the component unmounts */
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("contextmenu", handleContextMenu);
      };
    }
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* LOGIN */}
        {/* {!isAuthenticated &&
          (data?.details === null ||
            data?.details?.is_active === null ||
            data?.details?.is_active === false) && (
            <Route path="/" element={<Navigate to="/" replace />} />
          )} */}
        <Route path="/" element={<Login />} />

        {/* {isAuthenticated && accounts?.length > 0 && data?.details?.is_active && ( */}
        {/* <Route path="/" element={<UserLayout />}> */}
          {/* default redirect when at "/" */}

          {/* Access required route (always available) */}
          <Route path="access-required" element={<AccessRequired />} />

          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        {/* </Route> */}
        {/* )} */}
      </Routes>
    </Suspense>
  );
};

export default App;
