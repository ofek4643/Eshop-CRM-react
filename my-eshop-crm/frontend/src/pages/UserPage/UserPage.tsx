import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import type { OrderItem, Order } from "../../types/Order";
import styles from "./UserPage.module.css";
import { getUserByIdApi } from "../../api/user";
import { getUserOrdersApi } from "../../api/order";

// קומפוננטה לפרטי משתמש
const UserPage: React.FC = () => {
  const { id } = useParams();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  const totalPay = items.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  // מושך את פרטי משתמש והזמנות
  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      try {
        
        // משיכת פרטי משתמש
        const userRes = await getUserByIdApi(id);
        setUserName(userRes.data.userName);
        setEmail(userRes.data.email);
        setRole(userRes.data.role);

        // משיכת ההזמנות
        const ordersRes = await getUserOrdersApi(id);
        setOrders(ordersRes.data);
        const allItems = ordersRes.data.flatMap((order: Order) => order.items);
        setItems(allItems);
      } catch (error: any) {
        toast.error(error.response?.data?.error || "שגיאה בטעינת נתונים");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchData();
  }, [id]);

  return (
    <>
      {loading ? (
        <div className={styles.loadingContainer}>
          <span className={styles.loadingSpinner}></span>
          <span>טוען נתוני משתמש...</span>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.card}>
            <h3>פרטי משתמש</h3>
            <p>
              {id} <strong>:ID</strong>
            </p>
            <p>
              <strong>שם:</strong> {userName}
            </p>
            <p>
              <strong>אימייל:</strong> {email}
            </p>
            <p>
              <strong>מנהל:</strong> {role === "user" ? "לא" : "כן"}
            </p>
          </div>

          <div className={styles.card}>
            <h3>סיכום פעילות</h3>
            <p>
              <strong>סה"כ הזמנות:</strong> {orders.length}
            </p>
            <p>
              <strong>סכום כולל שולם:</strong> ₪{totalPay}
            </p>
          </div>

          <div className={styles.cardWide}>
            <h3>היסטוריית הזמנות</h3>
            {orders.length === 0 ? (
              <p>אין הזמנות להצגה</p>
            ) : (
              <ul className={styles.orderList}>
                {orders.map((order) => (
                  <li key={order._id} className={styles.orderItem}>
                    <p>
                      <strong>הזמנה:</strong> #{order._id}
                    </p>
                    <p>
                      <strong>תאריך:</strong>{" "}
                      {new Date(order.createdAt).toLocaleDateString("he-IL")}
                    </p>
                    <p>
                      <strong>סכום:</strong> ₪{order.totalPrice}
                    </p>
                    <p>
                      <strong>נשלח:</strong> {order.isDelivered ? "כן" : "לא"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserPage;
