import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./OrderManagement.module.css";
import type { Order } from "../../types/Order";
import { toast } from "react-toastify";
import { deleteOrderApi, getOrdersApi } from "../../api/order";

// קומפוננטה לניהול הזמנות
const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [popout, setPopout] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState("");

  // ייבוא הזמנות מהשרת
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrdersApi();
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // מחיקת הזמנה
  const deleteOrder = async (id: string) => {
    setLoading(true);
    try {
      const res = await deleteOrderApi(id);
      toast.success(res.data.message);
      setOrders((prev) => prev.filter((order) => order._id !== id));
      setPopout(false);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "שגיאה במחיקת הזמנה");
    } finally {
      setLoading(false);
    }
  };

  // פונקציה לפתיחת את ה popout ושמירת ID של המשתמש
  const openPopout = (id: string) => {
    setSelectedOrderId(id);
    setPopout(true);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>ניהול הזמנות</h2>

      {loading ? (
        <div className={styles.loadingContainer}>
          <span className={styles.loadingSpinner}></span>
          <span>טוען הזמנות...</span>
        </div>
      ) : orders.length === 0 ? (
        <p className={styles.noOrders}>אין הזמנות להצגה</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID הזמנה</th>
              <th>שם משתמש</th>
              <th>תאריך</th>
              <th>סכום כולל</th>
              <th>נמסר</th>
              <th>עוד מידע</th>
              <th>מחק הזמנה</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userName}</td>
                <td>{new Date(order.createdAt).toLocaleDateString("he-IL")}</td>
                <td>₪{order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.isDelivered ? (
                    <span className={styles.check}>✔</span>
                  ) : (
                    <span className={styles.cross}>✘</span>
                  )}
                </td>
                <td>
                  <Link
                    to={`/order/${order._id}`}
                    className={styles.detailsBtn}
                  >
                    פרטים
                  </Link>
                </td>
                <td>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => openPopout(order._id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {popout && selectedOrderId && (
        <div className={styles.popoutOverlay}>
          <div className={styles.popout}>
            <p>האם אתה בטוח שברצונך למחוק את ההזמנה הזאת?</p>
            <div className={styles.popoutActions}>
              <button
                className={styles.confirmBtn}
                onClick={() => deleteOrder(selectedOrderId)}
                disabled={loading}
              >
                {loading ? "מוחק..." : "כן"}
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setPopout(false)}
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
