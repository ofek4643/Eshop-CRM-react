import { api } from "./api";
interface DataProduct {
  name: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
}
export const addProductApi = (data: DataProduct) => api.post("/product", data);

export const getProductApi = (id: string) => api.get(`/product/${id}`);

export const editProductApi = (data: DataProduct, id: string) =>
  api.put(`/product/${id}`, data);

export const getProductsApi = () => api.get("/product");

export const deleteProductApi = (id: string) => api.delete(`/product/${id}`);
