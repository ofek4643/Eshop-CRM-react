import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./OrderPage.module.css";
import type { AddressFormData } from "../../types/Address";
import type { OrderItem } from "../../types/Order";
import { getOrderApi } from "../../api/order";

// קומפוננטה לפרטי הזמנה
const MyOrder = () => {
  const { id } = useParams();
  const [items, setItems] = useState<OrderItem[]>([]);
  const [statusDelivery, setStatusDelivery] = useState(false);
  const [address, setAddress] = useState<AddressFormData | null>(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [loadingPage, setLoadingPage] = useState(true);
  const newData = new Date();
  const formattedDate = newData.toLocaleDateString("he-IL");
  const totalPrice = items.reduce(
    (sum, item) => sum + item.amount * item.price,
    0
  );

  // משיכת פרטי הזמנה
  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      try {
        const res = await getOrderApi(id);
        setItems(res.data.items);
        setStatusDelivery(res.data.isDelivered);
        setAddress(res.data.address);
        setUserName(res.data.userName);
        setEmail(res.data.email);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingPage(false);
      }
    };

    if (id) fetchOrder();
  }, [id]);

  if (loadingPage) {
    return (
      <div className={styles.cartWrapper}>
        <h2 className={styles.title}>טוען הזמנה...</h2>
      </div>
    );
  }

  return (
    <div className={styles.cartWrapper}>
      <h2 className={styles.title}>הזמנה מספר: {id}</h2>
      <div className={styles.cartContent}>
        <div className={styles.itemsSection}>
          <div className={styles.addressContainer}>
            <h2 className={styles.header}>פרטי משלוח</h2>
            <hr />
            <p>שם: {userName}</p>
            <p>איימל: {email}</p>
            <p>
              כתובת: {address?.city}, {address?.street} {address?.houseNumber},{" "}
              {address?.zip}
            </p>
          </div>

          <div
            className={styles.status}
            style={{
              backgroundColor: statusDelivery
                ? "hsla(135, 51%, 65%, 1.00)"
                : "#ffe6e6",
              color: statusDelivery ? "#195a03ff" : "#d9534f",
            }}
          >
            {statusDelivery ? `ההזמנה נמסרה ב- ${formattedDate}` : "טרם נמסר"}
          </div>

          <h2 className={styles.header}>פריטים בהזמנה</h2>
          <hr />
          {items.map((item) => (
            <div key={item.productId} className={styles.itemCard}>
              <img
                src={item.imageUrl}
                alt={item.name}
                className={styles.itemImage}
              />
              <div className={styles.itemInfo}>
                <span className={styles.itemName}>{item.name}</span>
              </div>
              <div className={styles.itemTotal}>₪{item.price}</div>
              <div className={styles.itemTotal}>{item.amount}x</div>
              <div className={styles.itemTotal}>
                ₪{item.price * item.amount}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.summarySection}>
          <h3 className={styles.headerSummarty}>סיכום הזמנה</h3>
          <div className={styles.summaryLine}>
            <span className={styles.finalPrice}>מחיר פרטים:</span>
            <span className={styles.totalPrice}>₪{totalPrice}</span>
          </div>
          <hr />
          <h3 className={styles.total}>סה"כ לתשלום : ₪{totalPrice}</h3>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
