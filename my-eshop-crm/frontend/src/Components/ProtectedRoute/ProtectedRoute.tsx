// ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "./ProtectedRoute.module.css";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { myUser, status } = useSelector((state: RootState) => state.user);

  if (status === "loading" || status === "idle") {
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.loader}></div>
        <p className={styles.loadingText}>טוען נתונים...</p>
      </div>
    );
  }

  if (!myUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
