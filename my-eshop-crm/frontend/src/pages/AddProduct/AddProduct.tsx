// AddProduct.tsx
import React, { useState } from "react";
import styles from "./AddProduct.module.css";
import { toast } from "react-toastify";
import { addProductApi } from "../../api/product";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await addProductApi({
        name,
        price,
        stock,
        description,
        imageUrl,
      });
      toast.success(res.data.message);
      setName("");
      setPrice(0);
      setStock(0);
      setDescription("");
      setImageUrl("");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "שגיאה בהוספת מוצר");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>הוספת מוצר חדש</h2>
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
          className={loading ? styles.buttonCreate : styles.button}
          disabled={loading}
        >
          {loading ? (
            <>
              <span>מוסיף...</span>
              <span className={styles.loadingSpinner}></span>
            </>
          ) : (
            "הוסף מוצר"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
