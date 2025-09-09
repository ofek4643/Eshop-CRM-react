import { useEffect, useState } from "react";
import styles from "./ProductManagement.module.css";
import type { Product } from "../../types/Product";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteProductApi, getProductsApi } from "../../api/product";

// קומפוננטה לניהול מוצרים
const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [popout, setPopout] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const navigate = useNavigate();

  // פונקציה לפתיחת את ה popout ושמירת ID של המשתמש
  const openPopout = (id: string) => {
    setSelectedProductId(id);
    setPopout(true);
  };

  //הסרת מוצר
  const deleteProduct = async (id: string) => {
    setLoading(true);
    try {
      const res = await deleteProductApi(id);
      toast.success(res.data.message);
      setProducts((prev) => prev.filter((product) => product._id !== id));
      setPopout(false);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "שגיאה במחיקת מוצר");
    } finally {
      setLoading(false);
    }
  };

  //משיכת מוצרים
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProductsApi();
        setProducts(res.data);
      } catch (error: any) {
        toast.error(error.response?.data?.error || "שגיאה במשיכת מוצרים");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>ניהול מוצרים</h2>
      <Link to="/products/add-product">
        <button className={styles.addProductBtn}>הוסף מוצר</button>
      </Link>

      {loading ? (
        <div className={styles.loadingContainer}>
          <span className={styles.loadingSpinner}></span>
          <span>טוען מוצרים...</span>
        </div>
      ) : products.length === 0 ? (
        <p className={styles.noProducts}>אין מוצרים להצגה</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>שם</th>
              <th>מחיר</th>
              <th>מלאי</th>
              <th>ערוך מוצר</th>
              <th>מחק מוצר</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>₪{product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>
                  <button
                    className={styles.editBtn}
                    onClick={() => navigate(`/edit-product/${product._id}`)}
                  >
                    עריכה
                  </button>
                </td>
                <td>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => openPopout(product._id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {popout && selectedProductId && (
        <div className={styles.popoutOverlay}>
          <div className={styles.popout}>
            <p>האם אתה בטוח שברצונך למחוק את המוצר הזה?</p>
            <div className={styles.popoutActions}>
              <button
                className={styles.confirmBtn}
                onClick={() => deleteProduct(selectedProductId)}
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

export default ProductManagement;
