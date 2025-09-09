import { api } from "./api";

// הגדרת סוג למוצר
interface DataProduct {
  name: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
}

// הוספת מוצר
export const addProductApi = (data: DataProduct) => api.post("/product", data);

// שליפת מוצר לפי ID
export const getProductApi = (id: string) => api.get(`/product/${id}`);

// עריכת מוצר לפי ID
export const editProductApi = (data: DataProduct, id: string) =>
  api.put(`/product/${id}`, data);

// שליפת מוצרים
export const getProductsApi = () => api.get("/product");

// מחיקת מוצר לפי ID
export const deleteProductApi = (id: string) => api.delete(`/product/${id}`);
