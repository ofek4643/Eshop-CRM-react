import { useEffect, useState } from "react";
import styles from "./UserManagement.module.css";
import { Link } from "react-router-dom";
import { User } from "../../types/User";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import {
  deleteUserApi,
  getUsersApi,
  switchPermissionsApi,
} from "../../api/user";

const UserManagement = () => {
  const { myUser } = useSelector((state: RootState) => state.user);

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [popout, setPopout] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingChangePermissions, setLoadingChangePermissions] =
    useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsersApi();
        setUsers(res.data);
      } catch (error: any) {
        toast.error(error.response?.data?.error || "שגיאה בטעינת משתמשים");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id: string) => {
    try {
      setLoadingDelete(true);
      const res = await deleteUserApi(id);
      toast.success(res.data.message);
      setUsers((prev) => prev.filter((user) => user._id !== id));
      setSelectedUserId(null);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "שגיאה במחיקת המשתמש");
    } finally {
      setLoadingDelete(false);
    }
  };

  const openPopout = (id: string) => {
    setSelectedUserId(id);
    setPopout(true);
  };

  const closePopout = () => {
    setPopout(false);
    setSelectedUserId(null);
  };

  const handleToggleRole = async (id: string, currentRole: string) => {
    try {
      setLoadingChangePermissions(true);
      const newRole = currentRole === "user" ? "admin" : "user";
      const res = await switchPermissionsApi(id, newRole);
      const usersRes = await getUsersApi();
      setUsers(usersRes.data);
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "שגיאה בעדכון הרשאה");
    } finally {
      setLoadingChangePermissions(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>ניהול משתמשים</h2>

      {loading ? (
        <div className={styles.loadingContainer}>
          <span className={styles.loadingSpinner}></span>
          <span>טוען משתמשים...</span>
        </div>
      ) : users.length === 0 ? (
        <p className={styles.noUsers}>אין משתמשים להצגה</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>שם משתמש</th>
              <th>איימל</th>
              <th>מנהל</th>
              <th>שינוי הרשאה</th>
              <th>עוד מידע</th>
              <th>מחק משתמש</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" || user.role === "superAdmin" ? (
                    <span className={styles.check}>✔</span>
                  ) : (
                    <span className={styles.cross}>✘</span>
                  )}
                </td>
                <td>
                  <label
                    className={`${styles.switch} ${
                      myUser?.role !== "superAdmin" ? styles.disabledSwitch : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={
                        user.role === "admin" || user.role === "superAdmin"
                      }
                      onChange={() => handleToggleRole(user._id, user.role)}
                      disabled={
                        myUser?.role !== "superAdmin" ||
                        loadingChangePermissions
                      }
                    />
                    <span className={styles.slider}></span>
                  </label>
                </td>

                <td>
                  <Link to={`/user/${user._id}`} className={styles.detailsBtn}>
                    פרטים
                  </Link>
                </td>
                <td>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => openPopout(user._id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {popout && selectedUserId && (
        <div className={styles.popoutOverlay}>
          <div className={styles.popout}>
            <p>האם אתה בטוח שברצונך למחוק משתמש זה?</p>
            <div className={styles.popoutActions}>
              <button
                className={styles.confirmBtn}
                onClick={() => handleDeleteUser(selectedUserId)}
                disabled={loadingDelete}
              >
                {loadingDelete ? "מוחק..." : "כן"}
              </button>
              <button className={styles.cancelBtn} onClick={closePopout}>
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
