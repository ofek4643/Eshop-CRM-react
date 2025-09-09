import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { FaUsers, FaBoxOpen, FaShoppingCart, FaThLarge } from "react-icons/fa";

// קומפוננטה תפריט
const NavBar = () => {
  return (
    <nav className={styles.sideBar}>
      <h2 className={styles.logo}>E-Shop</h2>
      <ul>
        <Link to={"/"}>
          <li>
            <span>לוח בקרה</span>
            <FaThLarge />
          </li>
        </Link>
        <Link to={"/users"}>
          <li>
            <span>ניהול משתמשים</span>
            <FaUsers />
          </li>
        </Link>
        <Link to={"/products"}>
          <li>
            <span>ניהול מוצרים</span>
            <FaBoxOpen />
          </li>
        </Link>
        <Link to={"/orders"}>
          <li>
            <span>ניהול הזמנות</span>
            <FaShoppingCart />
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
