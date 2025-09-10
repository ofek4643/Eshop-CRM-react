import { api } from "./api";

// שליפת הזמנות
export const getOrdersApi = () => api.get("/order/admin");

// מחיקת הזמנה לפי ID
export const deleteOrderApi = (id: string) => api.delete(`/order/admin/${id}`);

// שליפת הזמנה לפי ID
export const getOrderApi = (id: string) => api.get(`/order/admin/${id}`);

// שליפת הזמנות לפי USER
export const getUserOrdersApi = (id: string) =>
  api.get(`/order/admin/userOrders/${id}`);
