import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import styles from "./ProtectedRoute.module.css";

// הגדרת סוג לתוכן שהקומפוננטה מציגה
interface ProtectedRouteProps {
  children: React.ReactNode;
}

// קומפוננטה להגנה על מסלולים – מאפשרת גישה רק למשתמש מחובר
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { myUser, status } = useSelector((state: RootState) => state.user);

  // מסך טעינה עד שנדע אם יש יוזר או לא
  if (status === "loading" || status === "idle") {
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.loader}></div>
        <p className={styles.loadingText}>טוען נתונים...</p>
      </div>
    );
  }

  // אם אין משתמש
  if (!myUser) {
    return <Navigate to="/login" replace />;
  }

  // הצגת התוכן
  return <>{children}</>;
};

export default ProtectedRoute;
