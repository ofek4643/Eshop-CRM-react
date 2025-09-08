import {
  FaDollarSign,
  FaShoppingCart,
  FaBoxOpen,
  FaUsers,
} from "react-icons/fa";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { Order } from "../../types/Order";
import { getProductsApi } from "../../api/product";
import { getOrdersApi } from "../../api/order";
import { getUsersApi } from "../../api/user";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const totalIncome = orders.reduce((sum, order) => sum + order.totalPrice, 0);

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

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await getProductsApi();
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await getUsersApi();
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  return (
    <div className={styles.dashBoard}>
      <h2 className={styles.pageTitle}>לוח בקרה ראשי</h2>
      {loading ? (
        <div className={styles.loadingContainer}>
          <span className={styles.loadingSpinner}></span>
          <span>טוען הזמנות...</span>
        </div>
      ) : (
        <div className={styles.infoContainer}>
          <div className={`${styles.info} ${styles.revenue}`}>
            <div className={styles.icon}>
              <FaDollarSign />
            </div>
            <div>
              <p>סה"כ הכנסות</p>
              <span>{totalIncome} ₪</span>
            </div>
          </div>

          <div className={`${styles.info} ${styles.orders}`}>
            <div className={styles.icon}>
              <FaShoppingCart />
            </div>
            <div>
              <p>סה"כ הזמנות</p>
              <span>{orders.length}</span>
            </div>
          </div>

          <div className={`${styles.info} ${styles.products}`}>
            <div className={styles.icon}>
              <FaBoxOpen />
            </div>
            <div>
              <p>סה"כ מוצרים</p>
              <span>{products.length}</span>
            </div>
          </div>

          <div className={`${styles.info} ${styles.users}`}>
            <div className={styles.icon}>
              <FaUsers />
            </div>
            <div>
              <p>סה"כ משתמשים</p>
              <span>{users.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
