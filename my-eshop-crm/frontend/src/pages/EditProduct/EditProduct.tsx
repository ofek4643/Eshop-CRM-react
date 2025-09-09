import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./EditProduct.module.css";
import { toast } from "react-toastify";
import { editProductApi, getProductApi } from "../../api/product";

// קומפוננטה לעריכת מוצר
const EditProduct = () => {
  const { id } = useParams<{ id: string }>();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  // ייבוא מוצר
  useEffect(() => {
    async function fetchProduct() {
      try {
        if (!id) {
          return;
        }

        const { data } = await getProductApi(id);
        setName(data.name);
        setPrice(data.price);
        setStock(data.stock);
        setDescription(data.description);
        setImageUrl(data.imageUrl);
      } catch (error: any) {
        toast.error(error.response?.data?.error || "שגיאה במשיכת מוצר");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  // פונקציה לעריכת מוצר
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!id) {
        return;
      }
      setLoadingUpdate(true);
      const res = await editProductApi(
        { name, price, stock, description, imageUrl },
        id
      );
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "שגיאה בעדכון מוצר");
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>עריכת מוצר</h2>
      {loading ? (
        <div className={styles.loadingContainer}>
          <span className={styles.loadingSpinner}></span>
          <span>טוען מוצרים...</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>שם מוצר</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            placeholder="הכנס שם מוצר"
            required
          />

          <label className={styles.label}>מחיר</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className={styles.input}
            placeholder="הכנס מחיר"
            required
            min={0}
          />

          <label className={styles.label}>מלאי</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className={styles.input}
            placeholder="הכנס כמות במלאי"
            required
            min={0}
          />

          <label className={styles.label}>תיאור</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
            placeholder="תיאור המוצר"
            required
          />

          <label className={styles.label}>כתובת תמונה</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className={styles.input}
            placeholder="URL לתמונה"
          />

          {imageUrl && (
            <div className={styles.preview}>
              <img src={imageUrl} alt="תצוגה מקדימה" />
            </div>
          )}

          <button
            type="submit"
            className={loadingUpdate ? styles.buttonUpdate : styles.button}
            disabled={loadingUpdate}
          >
            {loadingUpdate ? (
              <>
                <span>שומר...</span>
                <span className={styles.loadingSpinnerUpdate}></span>
              </>
            ) : (
              "שמור שינויים"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
