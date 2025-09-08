import React, { useEffect } from "react";
import styles from "./Header.module.css";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { getUserThunk } from "../../store/slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/user";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { myUser, status } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") {
      dispatch(getUserThunk());
    }
  }, [dispatch, status]);

  const logout = async () => {
    try {
      const res = await logoutUser();
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.error || "שגיאה בהתנתקות");
    }
  };

  return (
    <div className={styles.header}>
      <h1>מערכת ניהול E-Shop</h1>
      <div className={styles.headerInfo}>
        <span>{myUser?.userName}</span>
        <button onClick={logout} title="התנתק" className={styles.headerButton}>
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );
};

export default Header;
