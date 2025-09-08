import { api } from "./api";

export const getOrdersApi = () => api.get("/order/admin");

export const fetchOrdersApi = () => api.get("/order/admin");

export const deleteOrderApi = (id: string) => api.delete(`/order/admin/${id}`);

export const getOrderApi = (id: string) => api.get(`/order/${id}`);

export const getUserOrdersApi = (id: string) =>
  api.get(`/order/admin/userOrders/${id}`);
