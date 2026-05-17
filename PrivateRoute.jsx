import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import API from "../services/api";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      API.get("/users/profile")
        .then(({ data }) => setUser(data))
        .catch(() => {});
    }
  }, [token]);

  if (!token) return <Navigate to="/login" replace />;

  return (
    <div className="ss-layout">
      <Sidebar user={user} />
      <div className="ss-layout-right">
        <header className="ss-topbar">
          <div className="ss-topbar-left">
            <nav className="ss-breadcrumb">
              <span className="ss-breadcrumb-root">SkillSwap</span>
              <span className="ss-breadcrumb-sep">/</span>
              <span className="ss-breadcrumb-current">
                {window.location.pathname.replace("/", "").charAt(0).toUpperCase() +
                  window.location.pathname.replace("/", "").slice(1)}
              </span>
            </nav>
          </div>
          <div className="ss-topbar-right">
            <div className="ss-topbar-avatar">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>
        </header>
        <main className="ss-main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PrivateRoute;